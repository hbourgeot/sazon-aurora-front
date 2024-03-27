<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { Food, Product } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { writable } from 'svelte/store';
	import FilePickerWithPreview from './FilePickerWithPreview.svelte';
	import { Checkbox } from './ui/checkbox';
	import { Separator } from './ui/separator';

	export let title: string;
	export let action: string;
	export let data: any | null;

	let files: FileList | null;

	let form: HTMLFormElement;

	let productsSelected = writable<number[]>([]);
	let products: (Product & { quantity: number })[] = $page.data.products;
	let foods = $page.data.foods;
	let productsHtml: (Product & { quantity: number })[] = [];
	let selectProducts: boolean = false;
	let formFields = [
		{
			name: 'id',
			label: 'ID',
			type: 'hidden',
			value: (data && data['id']) ?? null
		},
		{
			name: 'name',
			label: 'Nombre',
			type: 'text',
			value: (data && data['name']) ?? ''
		},
		{
			name: 'description',
			label: 'Descripción',
			type: 'textarea',
			value: (data && data['description']) ?? ''
		},
		{
			name: 'price',
			label: 'Precio',
			type: 'number',
			value: (data && data['price']) ?? ''
		},
		{
			name: 'files',
			label: 'Imágenes',
			type: 'file',
			value: (data && data['files']) ?? null
		}
	];

	$: if (data?.id) {
		data.images = $page.data.foodsWithImages.find((f: Food) => f.id === data.id)?.images;
	}
	$: products = $page.data.products;
	$: foods = $page.data.foods;
	$: formFields = [
		{
			name: 'id',
			label: 'ID',
			type: 'hidden',
			value: (data && data['id']) ?? null
		},
		{
			name: 'name',
			label: 'Nombre',
			type: 'text',
			value: (data && data['name']) ?? ''
		},
		{
			name: 'description',
			label: 'Descripción',
			type: 'textarea',
			value: (data && data['description']) ?? ''
		},
		{
			name: 'price',
			label: 'Precio',
			type: 'number',
			value: (data && data['price']) ?? ''
		},
		{
			name: 'files',
			label: 'Imágenes',
			type: 'file',
			value: data && data['images'] ? createBlob() : null
		}
	];

	async function createBlob() {
		const blobsPromises = data.images.map(async (imageUrl: string, index: number) => {
			try {
				const response = await fetch(imageUrl);
				if (!response.ok) throw new Error('Respuesta de red no fue ok');

				const imageBlob = await response.blob(); // Obtiene el blob de la imagen
				const fileName = `${data.name}${data.images.length > 1 ? '-' + (index + 1) : ''}.webp`; // O considera extraer el nombre/extension original de la URL
				const imageFile = new File([imageBlob], fileName, { type: 'image/webp' }); // Asumiendo que quieres forzar .webp, ajusta según necesidad

				return imageFile;
			} catch (error) {
				console.error('Error descargando imagen:', error);
				return null; // Maneja el error según tu caso de uso
			}
		});

		const blobs = await Promise.all(blobsPromises);
		// @ts-ignore
		files = blobs.filter((blob) => blob !== null).map((file: File) => file);

		return files;
	}

	$: if (data?.products) {
		const dataProducts = data.products.split(',');
		for (let product of dataProducts) {
			product = product.trim();
			const productId = products.find((p) => p.name === product)?.id;
			if (productId) {
				toggleProduct(productId, true);
			}
		}
	}

	const handleButtonClick: (e: Event) => void = (e) => {
		e.stopPropagation();
		form.requestSubmit();
	};

	const handleSubmit: SubmitFunction = ({ formData }) => {
		for (const product of productsHtml) {
			if (product !== undefined) {
				formData.append(
					'products',
					JSON.stringify({
						id: product.id,
						quantity: product.quantity
					})
				);
			}
		}


		if (files !== null) {
			for (const file of files) {
				formData.append('files', file);
			}
		}
		return async ({ update }) => {
			await update();
			files = null;
		};
	};

	async function toggleProduct(productId: number, forEdit: boolean = false) {
		productsSelected.update((currentSelected) => {
			const index = currentSelected.indexOf(productId);
			if (index !== -1) {
				// Producto ya seleccionado, removerlo
				return currentSelected.filter((id) => id !== productId);
			} else {
				// Producto no seleccionado, agregarlo
				return [...currentSelected, productId];
			}
		});
		if (!forEdit) {
			//@ts-ignore
			productsHtml = products.map((product) => {
				if ($productsSelected.includes(product.id)) {
					return { ...product, quantity: 1 };
				}
			});
		} else {
			//@ts-ignore
			productsHtml = await Promise.all(
				products.map(async (product) => {
					if ($productsSelected.includes(product.id)) {
						const {
							data: { amount: fp }
						} = await $page.data.supa
							.from('food_products')
							.select('amount')
							.eq('food_id', data.id)
							.eq('product_id', product.id)
							.single();
						return await { ...product, quantity: fp };
					}
				})
			);
		}
	}
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button
			type="button"
			variant={typeof data?.id === 'number' ? 'ghost' : 'default'}
			size={typeof data?.id === 'number' ? 'sm' : 'default'}
			class={typeof data?.id === 'number'
				? 'gradient !px-3 !py-1 text-center text-sm font-semibold lg:text-lg'
				: 'gradient-bg'}
			builders={[builder]}
			aria-label="Agregar platillo"
		>
			{#if typeof data?.id === 'number'}
				Editar
			{:else}
				Agregar platillo
			{/if}
		</Button>
	</Sheet.Trigger>
	<Sheet.Content class="flex flex-col items-start justify-between">
		<Sheet.Header>
			<Sheet.Title class="gradient text-2xl font-semibold lg:text-4xl">{title}</Sheet.Title>
		</Sheet.Header>
		<Separator class="my-1" />
		<form {action} bind:this={form} use:enhance={handleSubmit} method="POST" class="h-full w-full">
			{#each formFields as field}
				{#if field.type === 'textarea'}
					<Label for={field.name}>{field.label}</Label>
					<Textarea
						class="focus:shadow-outline w-full px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						id={field.name}
						name={field.name}
						rows={5}
						value={field.value}
					></Textarea>
				{:else if field.type === 'number'}
					<Label for={field.name}>{field.label}</Label>
					<Input
						class="focus:shadow-outline w-full px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						id={field.name}
						name={field.name}
						type={field.type}
						value={field.value}
						step={0.01}
					></Input>
				{:else if ['text', 'email', 'password', 'hidden'].includes(field.type)}
					{#if field.type !== 'hidden'}
						<Label for={field.name}>{field.label}</Label>
					{/if}
					<Input
						class="focus:shadow-outline w-full px-3 py-2 leading-tight text-gray-700 focus:outline-none {field.type ===
						'hidden'
							? '-z-9999 invisible absolute top-0'
							: ''}}"
						id={field.name}
						name={field.name}
						type={field?.type ?? undefined}
						placeholder={field.label}
						value={field.value}
					/>
				{:else if field.type === 'file'}
					<div class="w-full py-2">
						<Label for={field.name}>{field.label}</Label>
						<FilePickerWithPreview
							bind:files
							acceptFile="image/jpeg, image/png, image/webp image/jpg"
							maxFileSize={2}
							maxFiles={5}
							maxFileSizeLabel="2MB"
							multiple
						/>
					</div>
				{/if}
			{/each}
			<div class="my-2 flex flex-col">
				{#if $productsSelected.length}
					<p class="my-2 text-lg font-light italic">Productos seleccionados</p>
					<ul class="list-inside list-disc">
						{#each productsHtml as productHtml}
							{#if productHtml}
								<li class="flex items-center justify-between">
									<span class="truncate text-sm">{productHtml.name}</span>
									<div class="my-1 flex items-center">
										<Button
											size="icon"
											variant="default"
											class="rounded-l-lg rounded-r-none font-bold text-white"
											disabled={productHtml.quantity <= 1}
											on:click={() => {
												if (productHtml.quantity < 1) {
													productHtml.quantity = 1;
												} else {
													productHtml.quantity--;
												}
											}}
										>
											-
										</Button>
										<Input
											type="number"
											class="w-[6ch] rounded-none text-center"
											bind:value={productHtml.quantity}
											min="1"
											on:input={() => {
												if (productHtml.quantity >= (productHtml?.stock ?? 0)) {
													productHtml.quantity = productHtml?.stock ?? 0;
												} else if (productHtml.quantity <= 1) {
													productHtml.quantity = 1;
												}
											}}
											max={String(productHtml?.stock ?? 1000)}
										/>
										<Button
											size="icon"
											variant="default"
											class="rounded-l-none rounded-r-lg font-bold text-white"
											disabled={productHtml.quantity >= (productHtml?.stock ?? 0)}
											on:click={() => {
												if (productHtml.quantity >= (productHtml?.stock ?? 0)) {
													productHtml.quantity = productHtml?.stock ?? 0;
												} else {
													productHtml.quantity++;
												}
											}}
										>
											+
										</Button>
									</div>
								</li>
							{/if}
						{/each}
					</ul>
				{/if}
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button
							type="button"
							variant="ghost"
							size="default"
							builders={[builder]}
							aria-label="Seleccionar productos"
						>
							Seleccionar productos
						</Button>
					</Sheet.Trigger>
					<Sheet.Content>
						<Sheet.Header>
							<Sheet.Title class="text-2xl font-semibold lg:text-4xl">
								Seleccionar productos
							</Sheet.Title>
						</Sheet.Header>
						<Separator class="my-1" />
						<p class="my-2 text-base font-light italic">
							Seleccione los productos que llevará el platillo (cierra la ventana emergente para
							guardar cambios)
						</p>
						{#each products as product}
							<div class="flex items-center">
								<Checkbox
									id={`product-${product.id}`}
									checked={$productsSelected.includes(product.id)}
									class="rounded border-gray-300 text-red-500 focus:ring-red-500"
									on:click={() => toggleProduct(product.id)}
								/>
								<Label for={`product-${product.id}`} class="my-2 ml-2 block text-sm text-gray-900">
									{product.name}
								</Label>
							</div>
						{/each}
						<Separator class="my-1" />
						<Sheet.Footer>
							<Sheet.Close asChild let:builder>
								<Button builders={[builder]} variant="default" type="button" class="w-fit px-5">
									Guardar cambios
								</Button>
							</Sheet.Close>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</form>
		<Separator class="my-1" />
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button
					builders={[builder]}
					variant="default"
					type="submit"
					class="w-fit px-5"
					on:click={handleButtonClick}
				>
					Guardar platillo
				</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
