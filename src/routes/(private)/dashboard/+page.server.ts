import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { svelxios } }) => {
    const { data: ventas } = await svelxios.get('/graphs/ventas', {responseType: 'arraybuffer'});
    const { data: productos } = await svelxios.get('/graphs/productos', { responseType: 'arraybuffer' });
    
    const base64Ventas = btoa(new Uint8Array(ventas).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    const base64Productos = btoa(new Uint8Array(productos).reduce((data, byte) => data + String.fromCharCode(byte), ''));

    const ventasImg = `data:image/png;base64,${base64Ventas}`;
    const productosImg = `data:image/png;base64,${base64Productos}`;

    return { ventasImg, productosImg };
}) satisfies PageServerLoad;