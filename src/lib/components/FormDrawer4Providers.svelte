<script lang="ts">
  import type { Inserts, Updates } from "$lib/database.types";
  import { Drawer, Portal, Input, TextArea } from "stwui";

  export let open: boolean = false;
  export let title: string;
  export let action: string;

  let formFields = [
    {
      label: "Nombre",
      name: "name",
      type: "text",
      value: '',
    },
    {
      label: "Contacto",
      name: "contact",
      type: "text",
      value: '',
    },
    {
      label: "Tipo de contacto",
      name: "contactType",
      type: "text",
      value: '',
    },
    {
      label: "Dirección",
      name: "address",
      type: "textarea",
      value: '',
    },
  ];

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
        <form {action}>
          {#each formFields as field}
              {#if field.type === "textarea"}
                <TextArea
                  class="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={field.name}
                  name={field.name}
                  rows="5"
                  bind:value={field.value}
                >
                <TextArea.Label slot="label">{field.label}</TextArea.Label>
              </TextArea>
              {:else}
                <Input
                  class="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.label}
                  bind:value={field.value}
                >
                <Input.Label slot="label">{field.label}</Input.Label>
              </Input>
              {/if}
          {/each}
        </form>
      </Drawer.Content>
    </Drawer>
  {/if}
</Portal>
