<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Dropdown from '$lib/components/ui/dropdown-menu';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from './ui/button/button.svelte';
	import { Bars3, EllipsisVertical } from '@steeze-ui/heroicons';
	import Separator from './ui/separator/separator.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';

	let trigger: any;

	const logout = async () => {
		const { error } = await $page.data.supa.auth.signOut({ scope: 'global' });
		if (error) {
			console.log(error);
			return;
		}

		trigger.click();
		$page.data.session = null;
		window.location.reload();
	};

	let menuItems = [
		{
			title: 'Sobre nosotros',
			href: '/'
		},
		{
			title: 'Nuestro menú',
			href: '/menu'
		},
		{
			title: 'Ver tu carrito',
			href: '/menu'
		}
	];

	let visible = false;

	function closeDropdown2() {
		visible = false;
	}

	function toggleDropdown2() {
		visible = !visible;
	}

	$: if (!$page.data?.session?.user) {
		menuItems = menuItems.filter((item) => item.title !== 'Inicio administrador');
	}

	onMount(() => {
		if ($page.data?.session?.user && $page.data?.session?.user?.database?.role === 1) {
			menuItems.push({
				title: 'Inicio administrador',
				href: '/dashboard'
			});
		}
	});
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button
			type="button"
			variant="default"
			size="icon"
			class="absolute left-6 top-4 z-10 h-fit w-fit p-1"
			builders={[builder]}
			bind:this={trigger}
		>
			<Icon src={Bars3} class="!h-8 !w-8"></Icon>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="h-full flex flex-col justify-between">
		<Sheet.Header>
			<Sheet.Title class="text-2xl lg:text-4xl">
				El sazón de <span class="gradient text-2xl font-extrabold lg:text-4xl">Aurora</span>
			</Sheet.Title>
			<Sheet.Description>
				<span class="text-lg lg:text-xl">Menú de navegación</span>
			</Sheet.Description>
		</Sheet.Header>
		<Separator class="my-1" />
		<div class="flex h-full w-full flex-col items-start justify-start">
      {#each menuItems as item}
      <a href={item.href} class="block w-full text-base lg:text-xl my-1">{item.title}</a>
			{/each}
		</div>
    <Separator class="my-1" />
		<Sheet.Footer>
			{#if $page.data?.session}
      <div class="flex justify-evenly items-center w-full">
        <Avatar.Root>
          <Avatar.Image src={$page.data.session?.user?.user_metadata.avatar_url} />
          <Avatar.Fallback>
            {$page.data.session?.user?.user_metadata.name?.split(' ')[0][0] ?? $page.data.session?.user?.database?.name?.split(' ')[0][0]}
          </Avatar.Fallback>
        </Avatar.Root>
        <div class="flex flex-col items-start justify-start w-full px-4">
          <span class="text-lg font-bold">
            {$page.data.session?.user?.user_metadata.name ?? $page.data.session?.user?.database?.name}
          </span>
          <span class="text-sm">
            {$page.data.session?.user.email}
          </span>
        </div>
				<Dropdown.Root>
          <Dropdown.Trigger asChild let:builder>
            <Button builders={[builder]} type="button" variant="ghost" on:click={toggleDropdown2}>
							<Icon src={EllipsisVertical} class="h-5 w-5" />
						</Button>
					</Dropdown.Trigger>
					<Dropdown.Content>
						<Dropdown.Group>
              <Dropdown.Label>Acciones de cuenta</Dropdown.Label>
							<Dropdown.Separator />
							<Dropdown.Item>
								<Button
                type="button"
                variant="destructive"
                class="w-full justify-between"
                on:click={logout}
								>
                Cerrar sesión
              </Button>
            </Dropdown.Item>
          </Dropdown.Group>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
			{:else}
				<div class="tw-flex gap-x-4">
					<Button variant="default" href="/login" >
						Iniciar sesión
					</Button>
					<Button variant="default" href="/registro">
						Registrarse
					</Button>
				</div>
			{/if}
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
