import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ fetch }) => {
	if (env['X_MASTER_KEY'] === undefined) return { success: false };

    
};
