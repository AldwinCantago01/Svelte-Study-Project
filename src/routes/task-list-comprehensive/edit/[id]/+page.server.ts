import type { RequestEvent, Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Task, Subtask } from '$lib/types/Task';

import { error } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ fetch, params }) => {
	if (env['X_MASTER_KEY'] === undefined) return { success: false };

	const getResponse = await fetch(`${env.JSONBIN_BASE_URL}/b/${env.BIN_ID}/latest`, {
		method: 'GET',
		headers: {
			'X-Master-Key': env.X_MASTER_KEY,
			'X-Bin-Meta': 'false'
		}
	});
	if (!getResponse.ok) return { success: false };
	const { tasks }: { tasks: Task[] } = await getResponse.json();
	const task = tasks.find((task) => task.id === Number(params.id));
	if (!task) error(404, 'Task not found');

	return { task };
};

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

		if (!getResponse.ok) error(500, 'Server Error');

		const { tasks }: { tasks: Task[] } = await getResponse.json();
		const taskIndex = tasks.findIndex((task) => task.id === Number(form.get('id') as string));

		if (taskIndex < 0) error(404, 'Task not found');

		tasks[taskIndex] = {
			id: Number(form.get('id') as string),
			name: form.get('name') as string,
			subtasks: subtasks
		};

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
