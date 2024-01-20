<script lang="ts">
  // Third Components
  import {Button, Layout} from "stwui";
  import {Bars3} from "@steeze-ui/heroicons"
  import {Icon} from "@steeze-ui/svelte-icon";

  // My components
  import Sidebar from "$lib/components/Sidebar.svelte";

  // Styles
  import "@fontsource-variable/raleway";
  import "@fontsource/kaushan-script"
  import "../app.pcss";
  import {page} from "$app/stores";

  // Code
  let drawer: {open: boolean} = {open: false};
  function openDrawer() {
    drawer.open = true;
  }

  let y: number;
</script>
<svelte:window bind:scrollY="{y}"/>
<svelte:head>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<Layout>
  <Layout.Header class="top-0 z-[1] px-3 transition-colors {$page.route.id === '/' && y < 100 ? '!bg-transparent shadow-none fixed' : 'shadow-md sticky top-0'}">
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
    background: linear-gradient(90deg, #f33 5%, #838 80%);
    padding: 0 5px;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Kaushan Script', sans-serif;
  }

:global(html, body){
  height: calc(100% - 64px);
}
</style>