<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { EllipsisHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Food, Product, Provider, User } from '$lib/types';
	import PlatillosFormDrawer from './PlatillosFormDrawer.svelte';
	import ProductsFormDrawer from './ProvidersFormDrawer.svelte';
	import ProvidersFormDrawer from './ProvidersFormDrawer.svelte';

	type FoodWithProducts = Food & { products: string };

	const roles = (roleId: number) => {
		switch (roleId) {
			case 1:
				return 'Admin';
			case 2:
				return 'User';
			case 3:
				return 'Customer';
			default:
				return 'Desconocido';
		}
	};

	export let data: FoodWithProducts | Product | Provider | User;
	export let tipo: 'food' | 'product' | 'provider' | 'employee' | 'customer' | 'hide' = 'hide';

	const tableActions = {
		food: [
			{
				label: 'Copiar Nombre',
				action: () => {
					navigator.clipboard.writeText((data as FoodWithProducts).name);
				}
			},
			{
				label: 'Copiar Descripción',
				action: () => {
					navigator.clipboard.writeText(
						(data as FoodWithProducts)?.description ?? 'No tiene descripción'
					);
				}
			},
			{
				label: 'Copiar Precio',
				action: () => {
					navigator.clipboard.writeText(
						(data as FoodWithProducts)?.price.toString() ?? 'No tiene precio'
					);
				}
			},
			{
				label: 'Copiar Productos',
				action: () => {
					navigator.clipboard.writeText(
						(data as FoodWithProducts)?.products ?? 'No tiene productos'
					);
				}
			}
		],
		product: [
			{
				label: 'Copiar Nombre',
				action: () => {
					navigator.clipboard.writeText((data as Product)?.name ?? 'No tiene nombre');
				}
			},
			{
				label: 'Copiar Descripción',
				action: () => {
					navigator.clipboard.writeText((data as Product)?.description ?? 'No tiene descripción');
				}
			},
			{
				label: 'Copiar Stock',
				action: () => {
					navigator.clipboard.writeText((data as Product)?.stock?.toString() ?? 'No tiene stock');
				}
			},
			{
				label: 'Copiar ID de Proveedor',
				action: () => {
					navigator.clipboard.writeText(
						(data as Product)?.provider_id?.toString() ?? 'No tiene proveedor'
					);
				}
			}
		],
		provider: [
			{
				label: 'Copiar Nombre',
				action: () => {
					navigator.clipboard.writeText((data as Provider)?.name ?? 'No tiene nombre');
				}
			},
			{
				label: 'Copiar Dirección',
				action: () => {
					navigator.clipboard.writeText((data as Provider)?.address ?? 'No tiene dirección');
				}
			},
			{
				label: 'Copiar medio de contacto',
				action: () => {
					navigator.clipboard.writeText((data as Provider)?.contact ?? 'No tiene teléfono');
				}
			}
		],
		employee: [
			{
				label: 'Copiar Nombre',
				action: () => {
					navigator.clipboard.writeText((data as User)?.name ?? 'No tiene nombre');
				}
			},
			{
				label: 'Copiar Email',
				action: () => {
					navigator.clipboard.writeText((data as User)?.email ?? 'No tiene email');
				}
			},
			{
				label: 'Copiar Rol',
				action: () => {
					navigator.clipboard.writeText(roles((data as User)?.role) ?? 'No tiene rol');
				}
			}
		],
		customer: [
			{
				label: 'Copiar Nombre',
				action: () => {
					navigator.clipboard.writeText((data as User)?.name ?? 'No tiene nombre');
				}
			},
			{
				label: 'Copiar Email',
				action: () => {
					navigator.clipboard.writeText((data as User)?.email ?? 'No tiene email');
				}
			},
			{
				label: 'Copiar Documento de Identidad',
				action: () => {
					navigator.clipboard.writeText(roles((data as User)?.document.toString()) ?? 'No tiene un documento de identidad');
				}
			}
		]
	};
</script>

<div class="flex items-center justify-center space-x-2">
	{#if tipo === 'food'}
		<PlatillosFormDrawer title="Editar Platillo" {data} action="?/edit" />
	{:else if tipo === 'product'}
		<ProductsFormDrawer title="Editar Producto" {data} action="?/edit" />
	{:else if tipo === 'provider'}
	<ProvidersFormDrawer title="Editar proveedor" {data} action="?/edit" />
	{/if}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
				<span class="sr-only">Open menu</span>
				<Icon src={EllipsisHorizontal} class="h-4 w-4" />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Label>Acciones</DropdownMenu.Label>
			<DropdownMenu.Separator />
			{#each tableActions[tipo] as action}
				<DropdownMenu.Item on:click={action.action}>{action.label}</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
