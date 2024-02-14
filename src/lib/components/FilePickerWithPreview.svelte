
<script lang="ts">
	import { FilePicker, List, Button, Progress, FilePreview } from 'stwui';
	import { formatFileSize } from 'stwui/utils';
	import type { DropResult } from 'stwui/types';
	import { fade, slide } from 'svelte/transition';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { File } from '@steeze-ui/remix-icons';
  import type { ImageFile } from '$lib/types';
	
  const cloud = `<?xml version="1.0" encoding="utf-8"?>

<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="icomoon-ignore">
</g>
<path d="M12.025 16.156l-0.756-0.756 4.775-4.775 4.775 4.775-0.756 0.756-3.488-3.488v13.956h-1.069v-13.956l-3.481 3.488zM26.194 9.569c0-0.088 0.012-0.169 0.012-0.25 0-4.569-3.7-8.269-8.269-8.269-3.287 0-6.119 1.925-7.45 4.706-0.575-0.287-1.225-0.456-1.912-0.456-2.112 0-3.862 1.537-4.2 3.55-2.513 0.863-4.325 3.244-4.325 6.050 0 3.531 2.862 6.394 6.394 6.394h6.938v-1.069h-6.938c-2.938 0-5.325-2.394-5.325-5.331 0-2.275 1.45-4.3 3.606-5.044l0.6-0.206 0.106-0.625c0.263-1.544 1.587-2.662 3.15-2.662 0.5 0 0.981 0.119 1.431 0.344l0.975 0.487 0.469-0.981c1.188-2.481 3.731-4.088 6.481-4.088 3.969 0 7.2 3.231 7.2 7.2 0 0.019 0 0.044-0.006 0.069-0.006 0.050-0.006 0.106-0.006 0.162l-0.025 1.088 1.087 0.006c2.637 0.006 4.787 2.162 4.787 4.8 0 2.631-2.144 4.781-4.775 4.794h-7.488v1.069h7.494c3.225-0.019 5.837-2.637 5.837-5.863-0.006-3.244-2.619-5.869-5.85-5.875z" fill="#000000">

</path>
</svg>`;

	export let myFiles: ImageFile[] = [];
	let errors: string[] = [];

	/* Push the files to the array with a preview URL */
	function onDrop(files: DropResult) {
		let newFiles = files.accepted.map((file) => ({
			file,
			src: URL.createObjectURL(file),
			progress: undefined
		}));

		myFiles = [...myFiles, ...newFiles];
		errors = files.rejected.map((file) => file.name);
	}

	/* Remove the file from the array if it exists */
	function removeFile(file: ImageFile) {
		URL.revokeObjectURL(file.src);
		myFiles = [
			...myFiles.slice(0, myFiles.indexOf(file)),
			...myFiles.slice(myFiles.indexOf(file) + 1)
		];
	}

</script>

<FilePicker
	name=""
	files={myFiles}
	{onDrop}
	multiple
	accept="image/*"
	allowedExtensions={['png', 'jpg', 'jpeg', 'gif', 'webp']}
>
	<FilePicker.Icon slot="icon" data={cloud} />
	<FilePicker.Title slot="title">Sube múltiple imágenes</FilePicker.Title>
	<FilePicker.Description slot="description">
		Arrastrálas o haz click aquí
	</FilePicker.Description>
</FilePicker>

<br />

{#if myFiles.length > 0}
	<div transition:fade class="w-full max-w-xl">
		<FilePreview bordered class="rounded-md">
			{#each myFiles as currentFile (currentFile.src)}
				{@const { file, src, progress } = currentFile}
				<div transition:slide|local>
					<FilePreview.Item
						class="flex flex-row cursor-pointer"
						on:click={() => removeFile(currentFile)}
					>
						<FilePreview.Item.Leading slot="leading" class="h-8 w-8 min-w-[2rem] min-h-[2rem]">
							{#if file.type.startsWith('image/')}
								<FilePreview.Item.Leading.Avatar
									slot="avatar"
									size="sm"
									{src}
									alt={file.name}
								/>
							{:else}
								<Icon slot="icon" src={File} class="h-8 w-8" />
							{/if}
						</FilePreview.Item.Leading>

						<FilePreview.Item.FileContent slot="file-content">
							<FilePreview.Item.FileContent.Title slot="title">
								{file.name}
							</FilePreview.Item.FileContent.Title>
							<FilePreview.Item.FileContent.Description slot="description">
								{formatFileSize(file.size)}
							</FilePreview.Item.FileContent.Description>
						</FilePreview.Item.FileContent>

						<FilePreview.Item.UploadContent slot="upload-content">
							<FilePreview.Item.UploadContent.Action slot="action">
                Haz click para borrar
							</FilePreview.Item.UploadContent.Action>
						</FilePreview.Item.UploadContent>

						<FilePreview.Item.Extra
							slot="extra"
							placement="center"
							class="justify-center items-center flex"
						>
								<FilePreview.Item.Extra.Pending />
						</FilePreview.Item.Extra>
					</FilePreview.Item>
				</div>
			{/each}
		</FilePreview>
	</div>
{/if}