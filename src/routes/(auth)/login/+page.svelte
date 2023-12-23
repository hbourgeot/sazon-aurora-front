<script>
  import { login } from "$lib/assets";

  // Importaciones de componentes stwui si es necesario
  import { Button, Input } from "stwui";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Google, Facebook } from "@steeze-ui/remix-icons";
  let email = "";
  let password = "";
</script>

<div class="min-h-screen w-full flex items-center justify-evenly bg-background">
  <div class="w-1/2">
    <div class="w-full flex items-center justify-center">
      <div
        class="w-2/3 bg-surface p-8 border border-border rounded-lg shadow-md"
      >
        <h2 class="text-xl font-semibold text-content mb-6">Iniciar Sesión</h2>
        <div class="space-y-4">
          <Input
            bind:value="{email}"
            placeholder="Correo electrónico"
            type="email"
            class="w-full"
          />
          <Input
            bind:value="{password}"
            placeholder="Contraseña"
            type="password"
            class="w-full"
          />
          <Button
            class="w-full bg-secondary-content hover:bg-primary-hover text-primary-content"
          >
            Entrar
          </Button>
          <div class="flex justify-between gap-x-3 my-2">
            <Button
              class="w-1/2 bg-primary hover:bg-primary-hover text-primary-content"
            >
              <Icon src="{Facebook}" class="h-5 w-5 mr-2" theme="solid"/> Facebook
            </Button>
            <Button
              class="w-1/2 bg-danger hover:bg-danger-hover text-danger-content"
            >
              <Icon src="{Google}" class="h-5 w-5 font-bold mr-2" theme="solid"/> Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-1/2">
    <img src="{login}" alt="" />
  </div>
</div>

<style>
  /* Estilos adicionales si son necesarios */
</style>
