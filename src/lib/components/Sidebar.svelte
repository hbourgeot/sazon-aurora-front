<script lang="ts">
  import { Drawer, Portal } from "stwui";

  export let open: boolean = false;
  const handleClose: () => void = () => {
    open = false;
  };
</script>

<Portal>
  {#if open}
    <Drawer {handleClose} placement="left">
      <Drawer.Header>
        <h2 class="text-3xl">Menú</h2>
      </Drawer.Header>
    </Drawer>
  {/if}
</Portal>
