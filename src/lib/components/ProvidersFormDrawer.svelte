<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Textarea } from '$lib/components/ui/textarea';
	import Combobox from './Combobox.svelte';
	import { Separator } from './ui/separator';

	export let title: string;
	export let action: string;
	export let data: any | null;

	let form: HTMLFormElement;

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
			name: 'stock',
			label: 'Disponibles',
			type: 'number',
			value: (data && data['stock']) ?? ''
		},
		{
			name: 'provider_id',
			label: 'Proveedor',
			type: 'autocomplete',
			value: (data && data['provider_id']) ?? ''
		}
	];

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
			name: 'stock',
			label: 'Disponibles',
			type: 'number',
			value: (data && data['stock']) ?? ''
		},
		{
			name: 'provider_id',
			label: 'Proveedor',
			type: 'autocomplete',
			value: (data && data['provider_id']) ?? ''
		}
	];

	let options: string[] = $page.data.providerOptions;
	$: options = options;
	let filtered = options.map((opt) => ({ label: opt, value: opt }));

	const handleButtonClick: (e: Event) => void = (e) => {
		e.stopPropagation();
		form.requestSubmit();
	};
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
				Agregar producto
			{/if}
		</Button>
	</Sheet.Trigger>
	<Sheet.Content class="flex flex-col items-start justify-between">
		<Sheet.Header>
			<Sheet.Title class="gradient text-2xl font-semibold lg:text-4xl">{title}</Sheet.Title>
		</Sheet.Header>
		<Separator class="my-1" />
		<form
			{action}
			bind:this={form}
			use:enhance={({}) => {
				return async ({ update }) => {
					await update();
				};
			}}
			method="POST"
			class="h-full w-full"
		>
			{#each formFields as field}
				{#if field.type === 'textarea'}
					<Label for={field.name}>{field.label}</Label>
					<Textarea
						class="focus:shadow-outline w-full px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						id={field.name}
						name={field.name}
						rows={5}
						value={field.value}
					/>
				{:else if field.type === 'number'}
					<Label for={field.name}>{field.label}</Label>
					<Input
						type="number"
						class="focus:shadow-outline w-full px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						id={field.name}
						name={field.name}
						value={field.value}
					/>
				{:else if field.type === 'autocomplete'}
					<div class="flex flex-col items-start justify-start gap-y-2 py-1">
						<Label for={field.name}>{field.label}</Label>
						<Combobox items={filtered} bind:value={field.value} class="w-full" />
						<Input type="hidden" id={field.name} name={field.name} value={field.value} />
					</div>
				{:else if ['text', 'email', 'password', 'hidden'].includes(field.type)}
				{#if field.type !== 'hidden'}
					<Label for={field.label}>{field.label}</Label>
					{/if}
					<Input
						class="focus:shadow-outline w-full px-3 py-2 leading-tight text-gray-700 focus:outline-none {field.type ===
						'hidden'
							? '-z-9999 invisible absolute top-0'
							: ''}}"
						id={field.name}
						name={field.name}
						type={field.type}
						placeholder={field.label}
						value={field.value}
					/>
				{/if}
			{/each}
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
					Guardar producto
				</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
