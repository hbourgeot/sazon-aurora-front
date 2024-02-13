<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { EllipsisVertical } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Button, Drawer, Dropdown, List, Portal } from "stwui";
  import { onMount } from "svelte";

  export let open: boolean = true;
  const handleClose: () => void = () => {
    open = false;
  };

  const logout = async() => {
    const { error } = await $page.data.supa.auth.signOut({ scope: "global" });
    if (error) {
      console.log(error);
      return;
    }

    open = false;
    $page.data.session = null;
    window.location.reload();
  };

  let menuItems = [
    {
      title: "Nuestro menú",
      href: '/menu'
    },
    {
      title: "Ver tu carrito",
      href: ''
    },
    {
      title: "Sobre nosotros",
      href: ''
    },
  ];

  let visible = false;

  function closeDropdown2() {
    visible = false;
  }

  function toggleDropdown2() {
    visible = !visible;
  }

  $: if(!($page.data?.session?.user)) {
    menuItems = menuItems.filter(item => item.title !== "Inicio administrador");
  }

  $: console.log($page.data?.session);

  onMount(() => {
    if($page.data?.session?.user && $page.data?.session?.user?.database?.role === 1) {
      menuItems.push({
        title: "Inicio administrador",
        href: '/dashboard'
      })
    }
  });
</script>

<Portal>
  {#if open}
    <Drawer {handleClose} placement="left" on:click={handleClose}>
      <Drawer.Header>
        <h1 class="text-3xl font-semibold">El sazón de <span class="gradient font-extrabold">Aurora</span></h1>
      </Drawer.Header>
      <Drawer.Content>
        <List on:click={handleClose}>
          {#each menuItems as item}
            <List.Item>
              <List.Item.Content slot="content">
                <List.Item.Content.Description class="w-full" slot="title"
                  ><a href="{item.href}" class="w-full block">{item.title}</a>
                </List.Item.Content.Description>
              </List.Item.Content>
            </List.Item>
          {/each}
        </List>
      </Drawer.Content>
      <Drawer.Footer>
        {#if $page.data?.session}
          <List>
            <List.Item>
              <List.Item.Leading slot="leading">
                <List.Item.Leading.Avatar slot="avatar" src="{$page.data.session?.user?.user_metadata.picture}" />
              </List.Item.Leading>
              <List.Item.Content slot="content" class="relative">
                <List.Item.Content.Title slot="title">
                  {$page.data.session?.user?.user_metadata.name ?? $page.data.session?.user?.database?.name}
                  </List.Item.Content.Title
                >
                <List.Item.Content.Description slot="description">
                  {$page.data.session?.user.email}
                </List.Item.Content.Description>
              </List.Item.Content>
                <Dropdown bind:visible>
                    <Button slot="trigger" type="ghost" shape="circle" on:click={toggleDropdown2}>
                        <Icon src="{EllipsisVertical}" class="h-5 w-5"/>
                    </Button>
                    <Dropdown.Items slot="items" alignment="center" class="max-w-[130px]">
                        <Button type="danger" class="w-full justify-between" on:click={logout}>
                            <Button.Leading slot="leading" />
                            Logout
                            <Button.Trailing slot="trailing" />
                        </Button>
                    </Dropdown.Items>
                </Dropdown>
            </List.Item>
          </List>
        {:else}
          <div class="tw-flex gap-x-4">
            <Button shape="rounded" type="default" href="/login"  on:click={handleClose}>
              Iniciar sesión
            </Button>
            <Button shape="rounded" type="primary" href="/registro" on:click={handleClose}>
              Registrarse
            </Button>
          </div>
        {/if}
      </Drawer.Footer>
    </Drawer>
  {/if}
</Portal>
