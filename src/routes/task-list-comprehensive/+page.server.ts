import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import type { PageServerLoad } from './$types';
import type { Task } from '$lib/types/Task';

export const load: PageServerLoad = async ({ fetch }) => {
	if (env['X_MASTER_KEY'] === undefined) error(500, 'Missing variables');

	const getResponse = await fetch(`${env.JSONBIN_BASE_URL}/b/${env.BIN_ID}/latest`, {
		method: 'GET',
		headers: {
			'X-Master-Key': env.X_MASTER_KEY,
			'X-Bin-Meta': 'false'
		}
	});
	if (!getResponse.ok) error(500, 'Server did not respond');
	const { tasks }: { tasks: Task[] } = await getResponse.json();

	return { tasks };
};
