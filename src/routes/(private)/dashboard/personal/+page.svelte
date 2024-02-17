<script lang="ts">
  import {
    alphabet,
    confirmPassword,
    email,
    inputRequired,
    inputWithoutSpaces,
    password,
  } from "$lib/utils/validations";
  import { Button, Input, InputNumber, Select } from "stwui";
  import type { SelectOption } from "stwui/types";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { updated } from "$app/stores";

  export let data: PageData;

  async function signUp() {
    const { data: res, error } = await data.supa?.auth.signUp({
      email: inputEmail,
      password: inputPassword,
    });

    console.log(res, error);
  }

  const tipos: SelectOption[] = [
    { value: "V", label: "V" },
    { value: "E", label: "E" },
    { value: "P", label: "P" },
    { value: "J", label: "J" },
  ];

  let inputName = "";
  let inputLastname = "";
  let inputEmail = "";
  let inputPassword = "";
  let inputConfirmPassword = "";
  let inputDocumentType: SelectOption = { value: "", label: "" };
  let inputDocument: number;
  let loading = false;

  let inputNameClicked = false;
  let inputLastnameClicked = false;
  let inputEmailClicked = false;
  let inputPasswordClicked = false;
  let inputConfirmPasswordClicked = false;
  let inputDocumentTypeClicked = false;
  let inputDocumentClicked = false;

  let nameValidationError = "";
  let lastnameValidationError = "";
  let emailValidationError = "";
  let passwordValidationError = "";
  let confirmPasswordValidationError = "";
  let documentValidationError = "";

  $: nameValidationError = inputRequired(inputName, inputNameClicked);
  $: lastnameValidationError = inputRequired(
    inputLastname,
    inputLastnameClicked,
  );
  $: emailValidationError = inputRequired(inputEmail, inputEmailClicked);
  $: passwordValidationError = inputRequired(
    inputPassword,
    inputPasswordClicked,
  );
  $: confirmPasswordValidationError = inputRequired(
    inputConfirmPassword,
    inputConfirmPasswordClicked,
  );
  $: documentValidationError = inputRequired(
    inputDocumentType.value,
    inputDocumentTypeClicked,
  );
  $: documentValidationError = inputRequired(
    inputDocument,
    inputDocumentClicked,
  );

  $: nameValidationError = alphabet(inputName);
  $: lastnameValidationError = alphabet(inputLastname);

  $: nameValidationError = inputWithoutSpaces(inputName);
  $: lastnameValidationError = inputWithoutSpaces(inputLastname);

  $: emailValidationError = email(inputEmail);

  $: passwordValidationError = password(inputPassword);
  $: confirmPasswordValidationError = confirmPassword(
    inputPassword,
    inputConfirmPassword,
  );

  const handleSubmit: SubmitFunction = ({cancel}) => {
    if (
      nameValidationError ||
      lastnameValidationError ||
      emailValidationError ||
      passwordValidationError ||
      confirmPasswordValidationError ||
      documentValidationError
    ) {
      cancel();
    }

    loading = true;

    return async ({result, update}) => {
        await update({reset: true});
        if(result.type === "success") {
          await signUp();
        }
        loading = false;
    }
  }
</script>

<div class="flex items-center justify-center p-2 h-full">
  <video
    src="/register.webm"
    autoplay
    loop
    muted
    class="fixed top-0 left-0 w-full max-w-none" />
  <div
    class="py-3 px-6 flex flex-col justify-center items-center !bg-white rounded-2xl shadow-2xl z-1 w-2/4">
    <h1 class="text-4xl p-5 pb-2 text-center my-2 w-full">Regístrate</h1>
    <form class="w-full" use:enhance={handleSubmit} method="post">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Input
            name="name"
            placeholder="Juan"
            error={nameValidationError}
            bind:value={inputName}
            on:click={() => (inputNameClicked = true)}>
            <Input.Label slot="label">Nombre</Input.Label>
          </Input>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <Input
            name="lastname"
            placeholder="Perez"
            on:click={() => (inputLastnameClicked = true)}
            error={lastnameValidationError}
            bind:value={inputLastname}>
            <Input.Label slot="label">Apellido</Input.Label>
          </Input>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Input
            name="email"
            placeholder=""
            type="email"
            bind:value={inputEmail}
            error={emailValidationError}
            on:click={() => (inputEmailClicked = true)}>
            <Input.Label slot="label">Correo Electrónico</Input.Label>
          </Input>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-6 md:mb-2 flex items-end justify-start relative">
          <Select
            name="documentType"
            bind:value={inputDocumentType}
            on:change={() => (inputDocumentTypeClicked = true)}
            placeholder="Selec."
            class="w-[10ch]">
            <Select.Label slot="label">Documento</Select.Label>
            <Select.Options slot="options">
              {#each tipos as tipo}
                <Select.Options.Option option={tipo} />
              {/each}
            </Select.Options>
          </Select>
          <InputNumber
            name="document"
            placeholder="Ingrese su documento"
            error={documentValidationError}
            bind:value={inputDocument}
            on:click={() => (inputDocumentTypeClicked = true)}>
            <InputNumber.Label slot="label"></InputNumber.Label>
          </InputNumber>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Input
            name="password"
            placeholder="******************"
            on:click={() => (inputPasswordClicked = true)}
            type="password"
            showPasswordToggle
            bind:value={inputPassword}
            error={passwordValidationError}>
            <Input.Label slot="label">Contraseña</Input.Label>
          </Input>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <Input
            name="confirmPassword"
            on:click={() => (inputConfirmPasswordClicked = true)}
            placeholder="******************"
            type="password"
            showPasswordToggle
            bind:value={inputConfirmPassword}
            error={confirmPasswordValidationError}>
            <Input.Label slot="label">Confirmar contraseña</Input.Label>
          </Input>
        </div>
      </div>
      <Button
        type="primary"
        {loading}
        htmlType="submit"
        class="w-full hover:bg-primary-hover">
        Registrarse
      </Button>
    </form>
  </div>
</div>

<style>

  video {
    z-index: 0;
  }

  video + div {
    z-index: 1;
  }

  :global(.stwui-input-number-error) {
    position: absolute;
    bottom: -1.5rem;
    left: 1rem;
  }
</style>
