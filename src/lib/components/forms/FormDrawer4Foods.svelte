<script lang="ts">
  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import type { Product } from "$lib/types";
  import {
    Autocomplete,
    Button,
    CheckboxGroup,
    Drawer,
    Input,
    InputNumber,
    Portal,
    TextArea,
  } from "stwui";
  import { writable } from "svelte/store";

  export let open: boolean = false;
  export let title: string;
  export let action: string;
  export let data: any | null;

  let productsSelected = writable<number[]>([]);
  let products: (Product & { quantity: number })[] = $page.data.products;
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
  ];

  $: products = $page.data.products;
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
  ];

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

  function toggleProduct(productId: number) {
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

    productsHtml = products.map((product) => {
      if ($productsSelected.includes(product.id)) {
        return { ...product, quantity: 1 };
      }
    });
  }
</script>

<Portal>
  {#if open}
    <Drawer {handleClose} align="right">
      <Drawer.Header slot="header">
        {title}
      </Drawer.Header>
      <Drawer.Content slot="content">
        <form
          {action}
          use:enhance={({formData}) => {
            for (const product of productsHtml) {
              formData.append("products", JSON.stringify({ id: product.id, quantity: product.quantity }))
            }
            return async ({ update }) => {
              await update();
              open = false;
            };
          }}
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
                value={field.value}>
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
                type={field.type}
                placeholder={field.label}
                value={field.value}>
                <Input.Label slot="label">{field.label}</Input.Label>
              </Input>
            {/if}
          {/each}
          <div class="my-2 flex flex-col">
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
                            if (productHtml.quantity >= productHtml?.stock) {
                              productHtml.quantity = productHtml?.stock ?? 0;
                            } else if(productHtml.quantity <= 1){
                              productHtml.quantity = 1;
                            }
                          }}
                          max={productHtml?.stock.toString() ?? 1000} />
                        <Button
                          size="xs"
                          type="default"
                          class="text-white font-bold"
                          disabled={productHtml.quantity >= productHtml?.stock}
                          on:click={() => {
                            if (productHtml.quantity >= productHtml?.stock) {
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
          <Button
            type="primary"
            htmlType="submit"
            class="mx-3 my-2"
            formaction={action}>
            Guardar datos
          </Button>
        </form>
      </Drawer.Content>
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
                    on:change={() => toggleProduct(product.id)} />
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
