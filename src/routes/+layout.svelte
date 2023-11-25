<script lang="ts">
  // Third Components
  import { Button, Layout, Swap } from "stwui";
  import { Icon, Bars3, XCircle } from "svelte-hero-icons";

  // My components
  import Sidebar from "$lib/components/Sidebar.svelte";

  // Styles
  import "@fontsource-variable/raleway";
  import "@fontsource/kaushan-script"
  import "../app.pcss";
  import { page } from "$app/stores";

  // Code
  let drawer: {open: boolean} = {open: false};
  function openDrawer() {
    drawer.open = true;
  }

  let y: number;

  $: console.log(y);
</script>
<svelte:window bind:scrollY="{y}"/>
<Layout class="h-full">
  <Layout.Header class="fixed top-0 z-0 px-3 transition-colors {$page.route.id === '/' && y < 100 ? '!bg-transparent shadow-none' : 'shadow-md'}">
    <Button type="primary" on:click="{openDrawer}" shape="circle">
        <Icon src="{Bars3}" class="h-5 w-5"/>
    </Button>
    <Layout.Header.Extra slot="extra">
      <h1 class="text-3xl font-semibold">La sazón de <span class="gradient font-extrabold">Aurora</span></h1>
    </Layout.Header.Extra>
  </Layout.Header>
  <Layout.Content>
    <Layout.Content.Body class="flex items-center justify-center min-h-[200px] w-full">
      <slot />
    </Layout.Content.Body>
  </Layout.Content>
</Layout>
<Sidebar open={drawer.open}/>

<style>
  :global(body){
    font-family: 'Raleway Variable', sans-serif;
  }
  
  :global(h1, h2, h3, h4, h5, h6){
    font-family: 'Raleway Variable', sans-serif;
  }
  
  :global(.gradient){
    background: linear-gradient(90deg, #33f 5%, #3f3 80%);
    padding: 0 5px;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Kaushan Script', sans-serif;
  }

</style>