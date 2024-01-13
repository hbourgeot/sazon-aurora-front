import type { PageServerLoad } from './$types';

export const load = (async ({locals:{supa}}) => {
    return {supa};
}) satisfies PageServerLoad;