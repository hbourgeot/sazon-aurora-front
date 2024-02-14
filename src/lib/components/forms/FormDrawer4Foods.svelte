<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import type { Food, ImageFile, Product } from "$lib/types";
  import { CloudArrowUp } from "@steeze-ui/heroicons";
  import { UploadCloud2 } from "@steeze-ui/remix-icons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import {
    Button,
    Drawer,
    FilePicker,
    FilePreview,
    Input,
    InputNumber,
    Portal,
    TextArea,
  } from "stwui";
  import { formatNumber } from "stwui/utils";
  import { writable } from "svelte/store";
  import FilePickerWithPreview from "../FilePickerWithPreview.svelte";
  import type { SubmitFunction } from "@sveltejs/kit";

  export let open: boolean = false;
  export let title: string;
  export let action: string;
  export let data: any | null;

  const dollar = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  let files: ImageFile[];

  $: console.log(files);
  let form: HTMLFormElement;

  let productsSelected = writable<number[]>([]);
  let products: (Product & { quantity: number })[] = $page.data.products;
  let foods = $page.data.foods;
  let productsHtml: (Product & { quantity: number })[] = [];
  let selectProducts: boolean = false;
  let formFields = [
    {
      name: "id",
      label: "ID",
      type: "hidden",
      value: (data && data["id"]) ?? null,
    },
    {
      name: "name",
      label: "Nombre",
      type: "text",
      value: (data && data["name"]) ?? "",
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
      value: (data && data["description"]) ?? "",
    },
    {
      name: "price",
      label: "Precio",
      type: "number",
      value: (data && data["price"]) ?? "",
    },
    {
      name: "files",
      label: "Imágenes",
      type: "file",
      value: (data && data["files"]) ?? null,
    },
  ];

  $: if(data?.id){
    console.log(data);
    data.images = $page.data.foodsWithImages.find((f: Food) => f.id === data.id)?.images;
    console.log(data);
  }
  $: products = $page.data.products;
  $: foods = $page.data.foods;
  $: formFields = [
    {
      name: "id",
      label: "ID",
      type: "hidden",
      value: (data && data["id"]) ?? null,
    },
    {
      name: "name",
      label: "Nombre",
      type: "text",
      value: (data && data["name"]) ?? "",
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
      value: (data && data["description"]) ?? "",
    },
    {
      name: "price",
      label: "Precio",
      type: "number",
      value: (data && data["price"]) ?? "",
    },
    {
      name: "files",
      label: "Imágenes",
      type: "file",
      value: (data && data["images"]) ? createBlob() : null,
    },
  ];

  async function createBlob() {
    const blobsPromises = data.images.map(async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Respuesta de red no fue ok');

      const imageBlob = await response.blob(); // Obtiene el blob de la imagen
      const fileName = `${data.name}.webp`; // O considera extraer el nombre/extension original de la URL
      const imageFile = new File([imageBlob], fileName, { type: "image/webp" }); // Asumiendo que quieres forzar .webp, ajusta según necesidad

      return imageFile;
    } catch (error) {
      console.error('Error descargando imagen:', error);
      return null; // Maneja el error según tu caso de uso
    }
  });

  const blobs = await Promise.all(blobsPromises);
  files = blobs.filter(blob => blob !== null).map((file, indx) => ({
    file: file,
    src: URL.createObjectURL(file),
    progress: undefined,
  }));

  console.log(files);
  return files; 
}

  $: if (data?.products) {
    const dataProducts = data.products.split(",");
    for (let product of dataProducts) {
      product = product.trim();
      const productId = products.find((p) => p.name === product)?.id;
      if (productId) {
        toggleProduct(productId, true);
      }
    }
  }

  const handleClose: () => void = () => {
    open = false;
    productsSelected.set([]);
  };

  const handleCloseInner: () => void = () => {
    selectProducts = false;
  };

  const handleOpenInner: () => void = () => {
    selectProducts = true;
  };

  const handleButtonClick: (e: Event) => void = (e) => {
    e.stopPropagation();
    form.requestSubmit();
  };

  const handleSubmit: SubmitFunction = ({ formData }) => {
    for (const product of productsHtml) {
      if (product !== undefined) {
        formData.append(
          "products",
          JSON.stringify({
            id: product.id,
            quantity: product.quantity,
          }),
        );
      }
    }

    console.log(files, "files");
    for (const file of files) {
      console.log(file);
      formData.append("files", file.file);
    }
    return async ({ update }) => {
      await update();
      open = false;
      files = [];
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
              data: { amount: fp },
            } = await $page.data.supa
              .from("food_products")
              .select("amount")
              .eq("food_id", data.id)
              .eq("product_id", product.id)
              .single();
            return await { ...product, quantity: fp };
          }
        }),
      );

      console.log(productsHtml);
    }
  }
</script>

<Portal>
  {#if open}
    <Drawer {handleClose} align="right">
      <Drawer.Header slot="header">
        {title}
      </Drawer.Header>
      <Drawer.Content slot="content" class="overflow-y-auto overflow-x-hidden">
        <form
          {action}
          bind:this={form}
          use:enhance={handleSubmit}
          method="POST">
          {#each formFields as field}
            {#if field.type === "textarea"}
              <TextArea
                class="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={field.name}
                name={field.name}
                rows="5"
                value={field.value}>
                <TextArea.Label slot="label">{field.label}</TextArea.Label>
              </TextArea>
            {:else if field.type === "number"}
              <InputNumber
                class="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={field.name}
                name={field.name}
                type={field.type}
                value={field.value}
                step={0.01}>
                <InputNumber.Leading slot="leading" data={dollar} fill="#fff" />
                <InputNumber.Label slot="label">
                  {field.label}
                </InputNumber.Label>
              </InputNumber>
            {:else if ["text", "email", "password", "hidden"].includes(field.type)}
              <Input
                class="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline {field.type ===
                'hidden'
                  ? 'invisible absolute top-0 -z-9999'
                  : ''}}"
                id={field.name}
                name={field.name}
                type={field?.type ?? undefined}
                placeholder={field.label}
                value={field.value}>
                <Input.Label slot="label">{field.label}</Input.Label>
              </Input>
            {:else if field.type === "file"}
              <div class="px-3 py-2 w-full">
                <FilePickerWithPreview bind:myFiles={files} />
              </div>
            {/if}
          {/each}
          <div class="px-3 py-2 my-2 flex flex-col">
            {#if $productsSelected.length}
              <p class="text-lg italic font-light my-2">
                Productos seleccionados
              </p>
              <ul class="list-disc list-inside">
                {#each productsHtml as productHtml}
                  {#if productHtml}
                    <li class="flex items-center justify-between">
                      <span>{productHtml.name}</span>
                      <div class="flex items-center my-1">
                        <Button
                          size="xs"
                          type="default"
                          class="text-white font-bold"
                          disabled={productHtml.quantity <= 1}
                          on:click={() => {
                            if (productHtml.quantity < 1) {
                              productHtml.quantity = 1;
                            } else {
                              productHtml.quantity--;
                            }
                          }}>
                          -
                        </Button>
                        <InputNumber
                          class="w-[6ch] text-center"
                          bind:value={productHtml.quantity}
                          min="1"
                          on:input={() => {
                            if (
                              productHtml.quantity >= (productHtml?.stock ?? 0)
                            ) {
                              productHtml.quantity = productHtml?.stock ?? 0;
                            } else if (productHtml.quantity <= 1) {
                              productHtml.quantity = 1;
                            }
                          }}
                          max={String(productHtml?.stock ?? 1000)} />
                        <Button
                          size="xs"
                          type="default"
                          class="text-white font-bold"
                          disabled={productHtml.quantity >=
                            (productHtml?.stock ?? 0)}
                          on:click={() => {
                            if (
                              productHtml.quantity >= (productHtml?.stock ?? 0)
                            ) {
                              productHtml.quantity = productHtml?.stock ?? 0;
                            } else {
                              productHtml.quantity++;
                            }
                          }}>
                          +
                        </Button>
                      </div>
                    </li>
                  {/if}
                {/each}
              </ul>
            {/if}
            <Button
              type="ghost"
              htmlType="button"
              variant="secondary"
              on:click={handleOpenInner}>
              Seleccionar productos
            </Button>
          </div>
        </form>
      </Drawer.Content>
      <Drawer.Footer slot="footer">
        <Button
          type="primary"
          htmlType="submit"
          variant="primary"
          class="w-fit px-5"
          on:click={handleButtonClick}>
          Guardar platillo
        </Button>
      </Drawer.Footer>
      <Portal>
        {#if selectProducts}
          <Drawer handleClose={handleCloseInner}>
            <Drawer.Header slot="header">Seleccionar productos</Drawer.Header>
            <Drawer.Content slot="content">
              <p class="text-base italic font-light my-2">
                Seleccione los productos que llevará el platillo (cierra la
                ventana para guardar cambios)
              </p>
              {#each products as product}
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id={`product-${product.id}`}
                    checked={$productsSelected.includes(product.id)}
                    class="text-red-500 rounded border-gray-300 focus:ring-red-500"
                    on:change={async () => await toggleProduct(product.id)} />
                  <label
                    for={`product-${product.id}`}
                    class="ml-2 block text-sm my-2 text-gray-900">
                    {product.name}
                  </label>
                </div>
              {/each}
            </Drawer.Content>
          </Drawer>
        {/if}
      </Portal>
    </Drawer>
  {/if}
</Portal>
