<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import {
    Autocomplete,
    Button,
    Drawer,
    Input,
    InputNumber,
    Portal,
    TextArea,
  } from "stwui";

  export let open: boolean = false;
  export let title: string;
  export let action: string;
  export let data: any | null;

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
      name: "stock",
      label: "Disponibles",
      type: "number",
      value: (data && data["stock"]) ?? "",
    },
    {
      name: "provider_id",
      label: "Proveedor",
      type: "autocomplete",
      value: (data && data["provider_id"]) ?? "",
    },
  ];

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
      name: "stock",
      label: "Disponibles",
      type: "number",
      value: (data && data["stock"]) ?? "",
    },
    {
      name: "provider_id",
      label: "Proveedor",
      type: "autocomplete",
      value: (data && data["provider_id"]) ?? "",
    },
  ];

  const handleClose: () => void = () => {
    open = false;
  };

  let options: string[] = $page.data.providerOptions;
  $: options = options;
  let filtered = options;

  function filter(e: Event) {
    const target = e.target as HTMLInputElement;
    filtered = options.filter((opt) =>
      opt.toLowerCase().includes(target.value.toLowerCase()),
    );
  }

  function filterOptions(newValue: string) {
    if (newValue) {
      filtered = options.filter((opt) =>
        opt.toLowerCase().includes(newValue.toLowerCase()),
      );
    } else {
      filtered = options;
    }
  }

  $: filterOptions(
    formFields.find((field) => field.name === "provider_id")?.value,
  );
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
          use:enhance={({}) => {
            return async ({ update }) => {
              await update();
              open = false;
            };
          }}
          method="POST"
        >
          {#each formFields as field}
            {#if field.type === "textarea"}
              <TextArea
                class="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={field.name}
                name={field.name}
                rows="5"
                value={field.value}
              >
                <TextArea.Label slot="label">{field.label}</TextArea.Label>
              </TextArea>
            {:else if field.type === "number"}
              <InputNumber
                class="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={field.name}
                name={field.name}
                type={field.type}
                value={field.value}
              >
                <InputNumber.Label slot="label">{field.label}</InputNumber.Label
                >
              </InputNumber>
            {:else if field.type === "autocomplete"}
              <Autocomplete
                class="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={field.name}
                value={field.value}
                on:input={filter}
              >
                <Autocomplete.Label slot="label"
                  >{field.label}</Autocomplete.Label
                >
                <Autocomplete.Options slot="options">
                  {#if filtered.length > 0}
                    {#each filtered as option}
                      <Autocomplete.Options.Option {option} />
                    {/each}
                  {:else}
                    <Autocomplete.Options.EmptyOption />
                  {/if}
                </Autocomplete.Options>
              </Autocomplete>
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
                value={field.value}
              >
                <Input.Label slot="label">{field.label}</Input.Label>
              </Input>
            {/if}
          {/each}
          <Button
            type="primary"
            htmlType="submit"
            class="mx-3 my-2"
            formaction={action}
          >
            Guardar datos
          </Button>
        </form>
      </Drawer.Content>
    </Drawer>
  {/if}
</Portal>
