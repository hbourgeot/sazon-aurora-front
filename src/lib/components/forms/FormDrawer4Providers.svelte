<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Drawer, Input, Portal, TextArea } from "stwui";
  import { createEventDispatcher } from "svelte";

  export let open: boolean = false;
  export let title: string;
  export let action: string;
  export let data: any | null;

  let formFields = [
    {
      label: "ID",
      name: "id",
      type: "hidden",
      value: (data && data['id']) ?? null,
    },
    {
      label: "Nombre",
      name: "name",
      type: "text",
      value: (data && data['name']) ?? "",
    },
    {
      label: "Contacto",
      name: "contact",
      type: "text",
      value: (data && data['contact']) ?? "",
    },
    {
      label: "Tipo de contacto",
      name: "contact_type",
      type: "text",
      value: (data && data['contact_type']) ?? "",
    },
    {
      label: "Dirección",
      name: "address",
      type: "textarea",
      value: (data && data['address']) ?? "",
    },
  ];

  $: formFields = [
    {
      label: "ID",
      name: "id",
      type: "hidden",
      value: (data && data['id']) ?? null,
    },
    {
      label: "Nombre",
      name: "name",
      type: "text",
      value: (data && data['name']) ?? "",
    },
    {
      label: "Contacto",
      name: "contact",
      type: "text",
      value: (data && data['contact']) ?? "",
    },
    {
      label: "Tipo de contacto",
      name: "contact_type",
      type: "text",
      value: (data && data['contact_type']) ?? "",
    },
    {
      label: "Dirección",
      name: "address",
      type: "textarea",
      value: (data && data['address']) ?? "",
    },
  ];

  const dispatch = createEventDispatcher();

  const handleClose: () => void = () => {
    open = false;
  };

</script>

<Portal>
  {#if open}
    <Drawer {handleClose} align="right">
      <Drawer.Header slot="header">
        {title}
      </Drawer.Header>
      <Drawer.Content slot="content">
        <form {action} use:enhance={({})=>{
          return async ({update}) => {
            await update();
            open = false;
          }
        }} method="POST">
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
            {:else}
              <Input
                class="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline {field.type==='hidden' ? 'invisible absolute top-0 -z-9999' : ''}}"
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
          <Button type="primary" htmlType="submit" class="mx-3 my-2" formaction={action}>
            Guardar datos
          </Button>
        </form>
      </Drawer.Content>
    </Drawer>
  {/if}
</Portal>
