import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import type { Task } from '$lib/types/Task';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const query = url.searchParams;
	const searchQuery = query.get('search');

	if (!searchQuery) error(400, 'Missing search query');
	if (env['X_MASTER_KEY'] === undefined) error(500, 'Missing variables');

	const getResponse = await fetch(`${env.JSONBIN_BASE_URL}/b/${env.BIN_ID}/latest`, {
		method: 'GET',
		headers: {
			'X-Master-Key': env.X_MASTER_KEY,
			'X-Bin-Meta': 'false'
		}
	});
	if (!getResponse.ok) error(500, 'Server Error');

	const { tasks }: { tasks: Task[] } = await getResponse.json();
	const search = new RegExp(searchQuery, 'i');
	const newTasks = tasks.filter((task) => search.test(task.name));

	return json({ tasks: newTasks });
};
