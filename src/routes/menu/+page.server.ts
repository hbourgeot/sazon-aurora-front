import type { FoodProduct } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { svelxios } }) => {
    const { data } = await svelxios.get<FoodProduct[]>('/food/all');
    console.log(data);
    const foods = data.map((food) => ({
        id: food.id,
        name: food.name,
        price: food.price,
        description: food.description,
        image: food.images ? food.images[0] : ''
    }));

    return {foods};
}) satisfies PageServerLoad;
