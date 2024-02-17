import type { Provider, Product, User } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { svelxios } }) => {
    const { data: ventas } = await svelxios.get('/graphs/ventas', {responseType: 'arraybuffer'});
    const { data: productos } = await svelxios.get('/graphs/productos', { responseType: 'arraybuffer' });
    const { data: ventasData } = await svelxios.get('/invoice/all');
    const { data: productosData } = await svelxios.get<Product[]>('/product/all');
    const { data: proveedoresData } = await svelxios.get<Provider[]>('/provider/all');
    const { data: clientesData } = await svelxios.get<User[]>('/user/all');

    console.log(proveedoresData)

    const productosTotales = productosData.reduce((acc, product) => product.stock ? acc + product.stock : acc, 0);
    const proveedoresTotales = proveedoresData.length;
    const clientesTotales = clientesData.length;
    
    const base64Ventas = btoa(new Uint8Array(ventas).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    const base64Productos = btoa(new Uint8Array(productos).reduce((data, byte) => data + String.fromCharCode(byte), ''));

    const ventasImg = `data:image/png;base64,${base64Ventas}`;
    const productosImg = `data:image/png;base64,${base64Productos}`;

    console.log(proveedoresTotales)

    return { ventasImg, productosImg, ventas: ventasData, productosTotales, proveedoresTotales, clientesTotales};
}) satisfies PageServerLoad;
