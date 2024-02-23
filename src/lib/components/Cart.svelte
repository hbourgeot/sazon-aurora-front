<script lang="ts">
	import { empty, emptyCart } from '$lib/assets';
	import { cart, decreaseAmount, increaseAmount } from '$lib/store/cart.store';
	import { Minus, Plus, ShoppingCart } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createEventDispatcher } from 'svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Button from './ui/button/button.svelte';
	import Input from './ui/input/input.svelte';
	import Separator from './ui/separator/separator.svelte';

	const dispatch = createEventDispatcher();

	function minusOrRemove(indx: number) {
		return () => {
			if ($cart.products[indx].amount > 1) {
				decreaseAmount(indx);
			} else {
				decreaseAmount(indx);
				$cart.products.splice(indx, 1); // Elimina el producto
			}
			$cart.products = $cart.products.slice(); // Clave para reactividad
		};
	}

	function add(indx: number) {
		increaseAmount(indx);
		$cart.products = $cart.products.slice(); // Clave para reactividad
	}

	function generarInvoice() {
		dispatch('pagar');
	}
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button
			class="fixed right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full p-2 {$cart
				.products.length > 0
				? 'bg-primary text-white'
				: 'text-primary'}"
			builders={[builder]}
		>
			<Icon src={ShoppingCart} class="!h-10 !w-10 text-white" />
			{#if $cart.products.length > 0}
				<span
					class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive font-sans text-white"
				>
					{$cart.products.length}
				</span>
			{/if}
		</Button>
	</Sheet.Trigger>
	<Sheet.Content class="flex h-full flex-col justify-between p-4">
		<Sheet.Header>
			<h2 class="text-2xl">
				Tu <span class="gradient text-3xl">Carrito</span>
			</h2>
		</Sheet.Header>
		<Separator class="my-1" />
		<div class="h-full">
			{#if $cart.products.length === 0}
				<img src={emptyCart} alt="empty cart" class="mx-auto w-1/2" />
				<p class="text-center">No tienes productos en tu carrito</p>
			{:else}
				{#each $cart.products as product, indx}
					<section class="flex w-full justify-between p-4">
						<img
							src={product?.image ?? empty}
							alt={product.name}
							class="h-20 w-20 rounded-lg object-top"
						/>
						<div class="flex w-1/3 flex-col justify-center">
							<h3 class="truncate text-lg font-semibold">{product.name}</h3>
							<p class="truncate text-sm">{product.description}</p>
						</div>
						<div class="flex w-1/3 flex-col justify-center">
							<p class="text-center font-sans text-lg font-semibold">
								{(product.price * product.amount)
									.toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD'
									})
									.replaceAll(',', '+')
									.replace('.', ',')
									.replaceAll('+', '.')}
							</p>
							<div class="flex items-center justify-between">
								<Button variant="ghost" size="sm" on:click={minusOrRemove(indx)}>
									<Icon src={Minus} class="h-4 w-4" />
								</Button>
								<Input type="number" bind:value={product.amount} class="w-10 p-0 text-center" />
								<Button variant="ghost" size="sm" on:click={() => add(indx)}>
									<Icon src={Plus} class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</section>
					{#if indx !== $cart.products.length - 1}
						<Separator class="my-1" />
					{/if}
				{/each}
			{/if}
		</div>
		<Separator class="my-1" />
		<Sheet.Footer>
			{#if $cart.products.length > 0}
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button
							class="flex items-center justify-center p-2 px-4 {$cart
								.products.length > 0
								? 'bg-primary text-white'
								: 'text-primary'}"
							builders={[builder]}
						>
							Pagar
						</Button>
					</Sheet.Trigger>
					<Sheet.Content class="!p-4">
						<Sheet.Header>
							<h2 class="text-2xl">Pagar</h2>
						</Sheet.Header>
						<p>
							Total a pagar: <span class="font-sans"
								>{$cart.totalAmount.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD'
								})}</span
							>
						</p>
						<Sheet.Footer>
							<Button variant="default" on:click={() => generarInvoice()}>Pagar</Button>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
				<Button variant="ghost" on:click={() => ($cart.products = [])}>Vaciar carrito</Button>
			{/if}
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
