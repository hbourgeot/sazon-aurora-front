<script lang="ts">
	// My components
	import Sidebar from '$lib/components/Sidebar.svelte';
	// Styles
  import '@fontsource-variable/urbanist';
  import '@fontsource/sofia';
  import '../app.pcss';
</script>

<main class="flex min-h-[200px] w-full items-center justify-center bg-rose-200">
	<slot />
</main>
<Sidebar />

<style>
  :global(body){
    font-family: 'Urbanist Variable', sans-serif;
  }

	:global(.gradient) {
		background: linear-gradient(90deg, #f33 5%, #838 80%);
		padding: 0 5px;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
    font-family: 'Sofia', cursive;
    font-style: italic;
	}

	:global(.gradient-bg){
		background: linear-gradient(90deg, #f33 5%, #838 80%);
		color: white;
	}

	:global(html, body) {
		height: 100vh;
	}

	/* disable spinner on input number for all browsers */
	:global(input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button) {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}
</style>
