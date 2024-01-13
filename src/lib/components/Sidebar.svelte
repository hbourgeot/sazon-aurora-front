<script lang="ts">
  import { Badge, Button, Drawer, Dropdown, List, Portal } from "stwui";
  import { page } from "$app/stores";
  import {Icon} from "@steeze-ui/svelte-icon"
  import {EllipsisHorizontal, EllipsisVertical} from "@steeze-ui/heroicons"


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

  let visible = false;

  function closeDropdown2() {
    visible = false;
  }

  function toggleDropdown2() {
    visible = !visible;
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
        {#if $page.data.session}
          <List>
            <List.Item>
              <List.Item.Leading slot="leading">
                <List.Item.Leading.Avatar slot="avatar" src="{$page.data.session?.user?.user_metadata.picture}" />
              </List.Item.Leading>
              <List.Item.Content slot="content" class="relative">
                <List.Item.Content.Title slot="title"
                  >{$page.data.session?.user?.user_metadata.name}</List.Item.Content.Title
                >
                <List.Item.Content.Description slot="description">
                  {$page.data.session?.user.email}
                </List.Item.Content.Description>
              </List.Item.Content>
                <Dropdown bind:visible>
                    <Button slot="trigger" type="ghost" shape="circle" on:click={toggleDropdown2}>
                        <Icon src="{EllipsisVertical}" class="h-5 w-5"/>
                    </Button>
                    <Dropdown.Items slot="items" alignment="center">
                        <Dropdown.Items.Item on:click={closeDropdown2} label="Item 1">
                            <Dropdown.Items.Item.Icon slot="icon" />
                        </Dropdown.Items.Item>
                        <Dropdown.Items.Item on:click={closeDropdown2} label="Item 2">
                            <Dropdown.Items.Item.Icon slot="extra" />
                        </Dropdown.Items.Item>
                        <Dropdown.Items.Item on:click={closeDropdown2} label="Notifications">
                            <Badge type="info" slot="extra">+99</Badge>
                        </Dropdown.Items.Item>
                        <Dropdown.Items.Divider />
                        <Button type="danger" class="w-full justify-between">
                            <Button.Leading slot="leading" />
                            Home
                            <Button.Trailing slot="trailing" />
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
