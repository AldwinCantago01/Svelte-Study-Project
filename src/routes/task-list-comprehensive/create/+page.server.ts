import type { RequestEvent } from '@sveltejs/kit';
import type { Actions } from './$types';

import type { Subtask } from '$lib/types/Task';
import { env } from '$env/dynamic/private';

export const actions = {
	default: async ({ request, fetch }: RequestEvent) => {
		const form = await request.formData();

		const subtasks: Subtask[] = [];
		let i = 0;
		while (true) {
			const subtaskName = form.get(`subtask[${i}][name]`);
			const subtaskFinished = form.get(`subtask[${i}][finished]`);

			if (subtaskName === null || subtaskFinished === null || subtaskName === '') break;

			subtasks.push({
				name: (subtaskName as string) ?? '',
				finished: subtaskFinished === 'true'
			});

			i++;
		}

		if (env['X_MASTER_KEY'] === undefined) return { success: false };

		const getResponse = await fetch(`${env.JSONBIN_BASE_URL}/b/${env.BIN_ID}/latest`, {
			method: 'GET',
			headers: {
				'X-Master-Key': env.X_MASTER_KEY,
				'X-Bin-Meta': 'false'
			}
		});

		if (!getResponse.ok) return { success: false };

		const { tasks } = await getResponse.json();
		tasks.push({
			id: tasks.length,
			name: form.get('name'),
			subtasks: subtasks
		});

		const putResponse = await fetch(`${env.JSONBIN_BASE_URL}/b/${env.BIN_ID}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-Master-Key': env.X_MASTER_KEY
			},
			body: JSON.stringify({ tasks: tasks })
		});

		if (putResponse.ok) {
			return { success: true };
		} else {
			return { success: false };
		}
	}
} satisfies Actions;
