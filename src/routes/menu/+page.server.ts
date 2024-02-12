import { Food } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { svelxios } }) => {
    const { data } = await svelxios.get<Food[]>('/food/all');
    const foods = data.map((food) => ({
        id: food.id,
        name: food.name,
        price: food.price,
        description: food.description
    }));

    return {foods};
}) satisfies PageServerLoad;