<script lang="ts">
  import { Badge, Button, Drawer, Dropdown, List, Portal } from "stwui";
  import { page } from "$app/stores";
  import {Icon} from "@steeze-ui/svelte-icon"
  import {EllipsisHorizontal} from "@steeze-ui/heroicons"

  
  export let open: boolean = true;
  const handleClose: () => void = () => {
    open = false;
  };

  const menuItems = [
    {
      title: "Nuestro menú",
    },
    {
      title: "Ver tu carrito",
    },
    {
      title: "Sobre nosotros",
    },
  ];

  const user = {
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title: "Calvin Hawkins",
    description: "calvin.hawkins@example.com",
  };

  let visible2 = false;

  function closeDropdown2() {
    visible2 = false;
  }

  function toggleDropdown2() {
    visible2 = !visible2;
  }
</script>

<Portal>
  {#if open}
    <Drawer {handleClose} placement="left">
      <Drawer.Header>
        <h2 class="text-3xl">Menú</h2>
      </Drawer.Header>
      <Drawer.Content>
        <List>
          {#each menuItems as user}
            <List.Item>
              <List.Item.Content slot="content">
                <List.Item.Content.Description class="w-full" slot="title"
                  ><a href="/" class="w-full block">{user.title}</a>
                </List.Item.Content.Description>
              </List.Item.Content>
            </List.Item>
          {/each}
        </List>
      </Drawer.Content>
      <Drawer.Footer>
        {#if $page.data.logged}
          <List>
            <List.Item>
              <List.Item.Leading slot="leading">
                <List.Item.Leading.Avatar slot="avatar" src="{user.avatar}" />
              </List.Item.Leading>
              <List.Item.Content slot="content" class="relative">
                <List.Item.Content.Title slot="title"
                  >{user.title}</List.Item.Content.Title
                >
                <List.Item.Content.Description slot="description">
                  {user.description}
                </List.Item.Content.Description>
              </List.Item.Content>

              <Dropdown bind:visible="{visible2}">
                <Button
                  slot="trigger"
                  shape="circle"
                  type="ghost"
                  on:click="{toggleDropdown2}"
                  ><Icon src="{EllipsisHorizontal}" class="h-5 w-5" /></Button
                >
                <Dropdown.Items slot="users" alignment="center">
                  <Dropdown.Items.Item
                    on:click="{closeDropdown2}"
                    label="Item 1"
                  ></Dropdown.Items.Item>
                  <Dropdown.Items.Item
                    on:click="{closeDropdown2}"
                    label="Item 2"
                  ></Dropdown.Items.Item>
                  <Dropdown.Items.Item
                    on:click="{closeDropdown2}"
                    label="Notifications"
                  >
                    <Badge type="info" slot="extra">+99</Badge>
                  </Dropdown.Items.Item>
                  <Dropdown.Items.Divider />
                  <Button type="danger" class="w-full justify-between">
                    Home
                  </Button>
                </Dropdown.Items>
              </Dropdown>
            </List.Item>
          </List>
        {:else}
          <div class="tw-flex gap-x-4">
            <Button shape="rounded" type="default" href="/login" >
              Iniciar sesión
            </Button>
            <Button shape="rounded" type="primary" href="/registro">
              Registrarse
            </Button>
          </div>
        {/if}
      </Drawer.Footer>
    </Drawer>
  {/if}
</Portal>
