<script lang="ts">
  import "../app.pcss";
  import { Button, Drawer, Layout, Portal } from "stwui";
  import { Icon, Bars3 } from "svelte-hero-icons";
  let drawerOpen = false;
  function openDrawer() {
    drawerOpen = true;
  }

  function closeDrawer() {
    drawerOpen = false;
  }
</script>

<Layout class="h-full">
  <Layout.Header class="static z-0">
    <Button type="primary" on:click="{openDrawer}">
      <Icon src="{Bars3}" class="h-5 w-5" />
    </Button>
    <Layout.Header.Extra slot="extra">Extra</Layout.Header.Extra>
  </Layout.Header>
  <Layout.Content>
    <Layout.Content.Body class="flex items-center justify-center min-h-[200px]">
      <Portal>
        {#if drawerOpen}
          <Drawer handleClose={closeDrawer} placement="left" />
        {/if}
      </Portal>
      <slot />
    </Layout.Content.Body>
  </Layout.Content>
</Layout>
