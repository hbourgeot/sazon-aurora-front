import type { Product, Provider } from "$lib/types";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals: { svelxios } }) => {
  const { data: products }: { data: Product[] } = await svelxios.get(
    "/product/all"
  );

  const { data: providers }: { data: Provider[] } = await svelxios.get(
    "/provider/all"
  );

  const providerOptions = providers.map(({ name }) => name);

  let mappedProducts = products.map((product) => {
    const provider = providers.find(({ id }) => id === product.provider_id);
    return {
      ...product,
      provider_id: provider?.name,
    };
  });

  return { products: mappedProducts, providerOptions };
}) satisfies PageServerLoad;

export const actions: Actions = {
  submit: async ({ locals: { svelxios }, request }) => {
    let payload = Object.fromEntries(await request.formData()) as Record<
      string,
      any
      >;
    
    const providerId = await getProviderId(payload.provider_id, svelxios);

    payload = {
      ...payload,
      id: null,
      provider_id: providerId,
      stock: parseInt(payload.stock),
    };

    try {
      const { data: product } = await svelxios.post<Product>(
        "/product/new",
        payload
      );
      console.log(product);
    } catch (error: any) {
      console.log(error.response);
    }
  },

  edit: async ({ locals: { svelxios }, request }) => {
    let payload = Object.fromEntries(await request.formData()) as Record<
      string,
      any
    >;

    const providerId = await getProviderId(payload.provider_id, svelxios);
    payload = {
      ...payload,
      id: parseInt(payload.id),
      provider_id: providerId,
      stock: parseInt(payload.stock),
    };

    const { data } = await svelxios.put(`/product/${payload.id}`, payload);
  },
};

const getProviderId = async (providerName: string, svelxios: any) => {
  const { data: providers }: { data: Provider[] } = await svelxios.get('/provider/all');

  console.log(providers.find(({ name }) => name === providerName)?.id)

  return providers.find(({ name }) => name === providerName)?.id as number;
};
