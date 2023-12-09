<script lang="ts">
  import { Drawer, List, Portal } from "stwui";

  export let open: boolean = false;
  const handleClose: () => void = () => {
    open = false;
  };

  const items = [
    {
      title: "Calvin Hawkins",
    },
    {
      title: "Kristen Ramos",
    },
    {
      title: "Ted Fox",
    },
  ];
</script>

<Portal>
  {#if open}
    <Drawer {handleClose} placement="left">
      <Drawer.Header>
        <h2 class="text-3xl">Menú</h2>
      </Drawer.Header>
      <Drawer.Content>
        <List>
          {#each items as item}
            <List.Item>
              <List.Item.Content slot="content">
                <List.Item.Content.Description class="w-full" slot="title"
                  ><a href="/" class="w-full block">{item.title}</a>
                </List.Item.Content.Description>
              </List.Item.Content>
            </List.Item>
          {/each}
        </List>
      </Drawer.Content>
    </Drawer>
  {/if}
</Portal>
