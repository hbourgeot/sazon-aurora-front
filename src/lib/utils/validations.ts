export const inputRequired = (input: string | number | null | undefined, clicked: boolean = false) => {
  if (input === null || input === undefined || input === "" && clicked) {
    return "Campo obligatorio";
  }
  return "";
}

export const alphabet = (input: string) => {
  if (!input.match(/^[a-zA-Z\s]*$/)) {
    return "Solo se permiten letras";
  }
  return "";
}

export const alphanumeric = (input: string) => {
  if (!input.match(/^[a-zA-Z0-9\s]*$/)) {
    return "Solo se permiten letras y números";
  }
  return "";
}

export const inputWithoutSpaces = (input: string) => {
  if (!input.match(/^[a-zA-Z]*$/)) {
    return "No se permiten espacios";
  }
  return "";
}

export const email = (email: string) => {
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && email !== "") {
    return "Correo inválido";
  }
  return "";
}

export const password = (password: string) => {
  if (password.length < 8 && password !== "") {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  return "";
}

export const confirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }
  return "";
}

export const number = (number: string | number) => {
  if (!number.toString().match(/^\d+$/)) {
    return "Solo se permiten números";
  }
  return "";
}
