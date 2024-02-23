<script lang="ts">
	import { goto } from '$app/navigation';
	import { empty } from '$lib/assets';
	import { addToCart } from '$lib/store/cart.store';
	import type { FoodProduct } from '$lib/types';
	import { Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Button from './ui/button/button.svelte';

	export let title = 'Product Title';
	export let description = 'Product Description';
	export let price = 0.0;
	export let image = empty;
	export let food: FoodProduct = {} as FoodProduct;
</script>

<Card.Root class="w-full">
	<Card.Header class="flex items-center justify-center text-center font-extrabold">
		<Card.Title class="gradient text-3xl">{title}</Card.Title>
		<Card.Description class="truncate">{description}</Card.Description>
	</Card.Header>
	<Card.Content class="truncate p-1">
		<img
			src={image}
			alt="cover"
			class="aspect-1 h-[180px] w-full max-w-[600px] object-cover object-top p-3"
		/>
	</Card.Content>
	<Card.Footer class="flex items-center justify-between">
		<span class="p-2 text-2xl font-light">
			{price.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD'
			})}
		</span>
		<Button
			variant="default"
			class="h-11 w-11 rounded-full !font-bold"
			size="icon"
			on:click={() => addToCart(food)}
		>
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder class="w-full">
					<Button variant="link" builders={[builder]} size="icon" class="w-full text-white">
						<Icon
							src={Plus}
							theme="mini"
							class="!h-9 !w-9 rounded-full border-[4px] border-white"
						/>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p class="text-center">Añadir al carrito</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Button>
	</Card.Footer>
</Card.Root>

<style>
	:global(.stwui-card > *) {
		border: none !important;
	}

	:global(.stwui-card-actions-action) {
		border-color: transparent !important;
	}

	:global(.stwui-card-content, .stwui-card-footer, .stwui-card-header) {
		padding: 0.5rem 1rem;
	}
</style>
