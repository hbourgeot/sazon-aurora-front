<script lang="ts">
  // Importaciones de componentes stwui si es necesario
  import { login } from "$lib/assets";
  import { Button, Divider, Input } from "stwui";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Google, Facebook } from "@steeze-ui/remix-icons";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let data: PageData;
  let email = "";
  let password = "";

  const signInGoogle = async () => {
    //@ts-ignore
    const { error } = await data.supa.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.host + "/auth/callback",
        queryParams: {
          access_type: "online",
          prompt: "consent",
        },
      },
    });
    if (error) {
      alert(error.message);
    }
  };

  const signInPassword = async () => {
    //@ts-ignore
    const { error } = await data.supa.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    }

    goto("/", {replaceState: true, invalidateAll: true});
  };

  onMount(() => {
    if (data?.session?.user) goto("/dashboard");
  });
</script>

<div
  class="w-full grid grid-cols-1 lg:grid-cols-2 place-content-center bg-background screenheight justify-center items-center">
  <div class="w-full">
    <div class="w-full flex items-center justify-center">
      <div
        class="w-2/3 bg-surface p-8 border border-border rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-content mb-6">Iniciar Sesión</h2>
        <div class="space-y-4">
          <Input
            bind:value={email}
            placeholder="Correo electrónico"
            type="email"
            class="w-full" />
          <Input
            bind:value={password}
            placeholder="Contraseña"
            type="password"
            showPasswordToggle
            class="w-full" />
          <Button
            class="w-full bg-secondary-content hover:bg-primary-hover text-primary-content" on:click={signInPassword}>
            Entrar
          </Button>
          <Divider>
            <Divider.Label slot="label">O</Divider.Label>
          </Divider>
          <div class="flex justify-between gap-x-3 my-2">
            <Button
              on:click={signInGoogle}
              class="w-full bg-danger hover:bg-danger-hover text-danger-content">
              <Icon src={Google} class="h-5 w-5 font-bold mr-2" theme="solid" />
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-end px-5">
    <img src={login} alt="" class="rounded-2xl object-cover w-[86%]" />
  </div>
</div>

<style>
  .screenheight {
    min-height: calc(100vh - 65px);
  }
</style>
