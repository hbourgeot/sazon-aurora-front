<script lang="ts">
  // Third Components
  import { Bars3 } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Button, Layout } from "stwui";
// My components
  import Sidebar from "$lib/components/Sidebar.svelte";
  // Styles
  import "@fontsource-variable/raleway";
  import "@fontsource/kaushan-script";
  import "../app.pcss";

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
    <Button type="primary" on:click="{openDrawer}" shape="circle" class="absolute top-4 left-6 w-fit h-fit z-10">
        <Icon src="{Bars3}" class="!h-8 !w-8"/>
    </Button>
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
    background-color: #FFF7F7;
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
  height: 100vh;
}
</style>