<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Input } from './ui/input';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { UploadCloud } from '@steeze-ui/remix-icons';
	import { CloudArrowUp, XMark } from '@steeze-ui/heroicons';
	import { Button } from './ui/button';

	export let multiple = false;
	export let disable = false;
	export let files: FileList | null = null;
	export let acceptFile = '';
	export let maxFileSize = 0;
	export let maxFiles = 30;
	export let maxFileSizeLabel = '';

	let input: any;
  let isAddingFile = true;

	const addFile = () => {
    if (isAddingFile) {
      input.click();
    }
	};

	const handleFileChange = (event: Event) => {
		if(files === null) {
			//@ts-ignore
			files = [];
		}
    //@ts-ignore
		const newFiles: FileList = Array.from(event.target.files);
		//@ts-ignore
		files = [...files, ...newFiles];
	};

	const removeFile = (fileToRemove: File) => {
		//@ts-ignore
		files = files?.filter(file => file !== fileToRemove);
    isAddingFile = false;
    setTimeout(() => {
      isAddingFile = true;
    }, 100);
	};

</script>

<label for="" class="grid h-auto w-full">
	<input
		type="file"
		bind:this={input}
		class="hidden"
		disabled={disable}
		{multiple}
		accept={acceptFile}
		on:change={handleFileChange}
	/>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<figure
		class="flex cursor-pointer {files?.length ? 'justify-start p-1' : 'justify-center'} items-center rounded-xl border border-solid border-gray-500 !text-sm"
		on:click={addFile}
	>
		{#if !files?.length}
			<div class="flex flex-col items-center justify-center">
				<Icon src={CloudArrowUp} class="h-16 w-16 text-gray-400" />
				<b class="block">Clic aquí para cargar sus archivos ({maxFiles} máx.)</b>
				{#if maxFileSize}
					<p class="text-grey-7">
						Peso máximo de {maxFileSizeLabel ? `${maxFileSizeLabel}` : '2MB'}
					</p>
				{/if}
			</div>
		{:else}
			<div class="flex flex-wrap !justify-start mx-0 gap-1">
				{#each files as file}
					<div class="flex items-center justify-center rounded-full bg-gray-400 pl-2">
						<p class="!text-sm">{file.name}</p>
						<Button
							type="button"
							class="ml-2 bg-transparent rounded-full"
							size="icon"
							on:click={() => removeFile(file)}
						>
							<Icon src={XMark} class="h-4 w-4" />
						</Button>
					</div>
				{/each}
			</div>
		{/if}
	</figure>
</label>

<style>
	.grid {
		display: grid;
		min-height: 160px;
	}

	.grid > * {
		grid-area: 1/1;
	}

	.grid > figure {
		text-align: center;
	}
</style>
