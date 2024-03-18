import type { FoodProduct } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({locals:{svelxios}, params}) => {
    const { data } = await svelxios.get<FoodProduct>(`/food/${params.platillo}`);

    return {food: data};
}) satisfies PageServerLoad;