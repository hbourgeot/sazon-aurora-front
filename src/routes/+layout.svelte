<script lang="ts">
  import Sidebar from "$lib/components/Sidebar.svelte";
  import "../app.pcss";
  import { Button, Drawer, Layout, Portal } from "stwui";
  import { Icon, Bars3 } from "svelte-hero-icons";
  let drawerOpen = false;
  function openDrawer() {
    drawerOpen = true;
  }
</script>

<Layout class="h-full">
  <Layout.Header class="static z-0 px-3">
    <Button type="primary" on:click="{openDrawer}">
      <Icon src="{Bars3}" class="h-5 w-5" />
    </Button>
    <Layout.Header.Extra slot="extra">
      <h1 class="text-3xl">La sazón de Aurora</h1>
    </Layout.Header.Extra>
  </Layout.Header>
  <Layout.Content>
    <Layout.Content.Body class="flex items-center justify-center min-h-[200px]">
      <Sidebar open={drawerOpen}/>
      <slot />
    </Layout.Content.Body>
  </Layout.Content>
</Layout>
