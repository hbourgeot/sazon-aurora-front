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
			label: 'ID',
			name: 'id',
			type: 'hidden',
			value: (data && data['id']) ?? null
		},
		{
			label: 'Nombre',
			name: 'name',
			type: 'text',
			value: (data && data['name']) ?? ''
		},
		{
			label: 'Contacto',
			name: 'contact',
			type: 'text',
			value: (data && data['contact']) ?? ''
		},
		{
			label: 'Tipo de contacto',
			name: 'contact_type',
			type: 'text',
			value: (data && data['contact_type']) ?? ''
		},
		{
			label: 'Dirección',
			name: 'address',
			type: 'textarea',
			value: (data && data['address']) ?? ''
		}
	];

	$: formFields = [
		{
			label: 'ID',
			name: 'id',
			type: 'hidden',
			value: (data && data['id']) ?? null
		},
		{
			label: 'Nombre',
			name: 'name',
			type: 'text',
			value: (data && data['name']) ?? ''
		},
		{
			label: 'Contacto',
			name: 'contact',
			type: 'text',
			value: (data && data['contact']) ?? ''
		},
		{
			label: 'Tipo de contacto',
			name: 'contact_type',
			type: 'text',
			value: (data && data['contact_type']) ?? ''
		},
		{
			label: 'Dirección',
			name: 'address',
			type: 'textarea',
			value: (data && data['address']) ?? ''
		}
	];

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
				Agregar proveedor
			{/if}
		</Button>
	</Sheet.Trigger>
	<Sheet.Content class="flex flex-col items-start justify-between">
		<Sheet.Header>
			<Sheet.Title class="gradient text-2xl font-semibold lg:text-4xl">{title}</Sheet.Title>
		</Sheet.Header>
		<Separator class="my-1" />
		<form
		bind:this={form}
			{action}
			use:enhance={({}) => {
				return async ({ update }) => {
					await update();
				};
			}}
			method="POST"
			class="w-full h-full"
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
				{:else}
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
						type={field.type}
						placeholder={field.label}
						value={field.value}
					></Input>
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
					Guardar proveedor
				</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
