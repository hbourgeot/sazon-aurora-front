import type { Product, Provider } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { svelxios } }) => {
    const { data: products }: { data: Product[] } = await svelxios.get('/product/all');
    
    const { data: {providers} }: { data: {providers: Provider[]} } = await svelxios.get('/provider/all');

    const providerOptions = providers.map(({ name }) => ( name ));

    return {products, providerOptions};
}) satisfies PageServerLoad;

export const actions: Actions = {
    submit: async ({ locals: { svelxios }, request }) => {
        let payload = Object.fromEntries(await request.formData()) as Record<string, any>;
        const { data: { providers } }: { data: { providers: Provider[] } } = await svelxios.get('/provider/all');
        
        payload = {
            ...payload,
            id: null,
            provider_id: providers.find(({ name }) => (name === payload.provider_id))?.id,
            stock: parseInt(payload.stock),
        }
        console.log(payload);
        const { data: product } = await svelxios.post<Product>('/product/new', payload);
        console.log(product);
    }
};