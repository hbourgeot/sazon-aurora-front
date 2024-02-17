
import type { PageServerLoad } from './$types';
import { baseUrl } from '$env/static/private';
export const load = (async ({ params }) => {
    return {href: `${baseUrl}/invoice/${params.factura}`};
}) satisfies PageServerLoad;
