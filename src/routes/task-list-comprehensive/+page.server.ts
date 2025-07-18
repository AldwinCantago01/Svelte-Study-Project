import type { PageServerLoad } from './create/$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ fetch }) => {
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

	return { tasks };
};
