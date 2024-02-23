# Etapa de construcción
FROM node:18-alpine as builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias del proyecto
COPY package.json yarn.lock ./

# Copiar el resto de los archivos del proyecto
COPY . .

# Etapa de despliegue

# Exponer el puerto (Ejemplo: 3000, pero debes configurarlo según tu configuración de SvelteKit)
EXPOSE 3000

# Ejecutar el servidor de SvelteKit
CMD ["node", "build"]
