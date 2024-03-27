<script lang="ts">
	import Table from '$lib/components/PlatillosTable.svelte';
	// import FormDrawer4Foods from "$lib/components/forms/FormDrawer4Foods.svelte";

	import type { PageData } from './$types';
	import type { Crumb } from '$lib/types';
	import { setBreadcrumbs } from '$lib/store/breadcrumbs.store';

	export let data: PageData;

	let rows = data.foods;
	$: rows = data.foods;

	const routes: Crumb[] = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Platillos', href: '/dashboard/platillos' }
	];

	setBreadcrumbs(routes);
</script>

<main class="flex h-[calc(100vh-40px)] w-full flex-col items-center justify-start px-6 py-3 mt-5 lg:mt-10">
	<h1 class="w-full p-2 lg:p-5 pb-2 text-center lg:!text-left text-3xl lg:text-4xl">Platillos</h1>
	<Table data={rows} />
</main>
