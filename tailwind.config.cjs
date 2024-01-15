/** @type {import('tailwindcss').Config}*/
const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/stwui/**/*.{svelte,js,ts,html}",
  ],

  theme: {
    extend: {},
  },

  plugins: [require("@tailwindcss/forms"), require("stwui/plugin")],
  stwui: {
    themes: [
      "light",
      "dark",
      {
        mytheme: {
          // Required
          primary: "#9B2226", // Rojo vino para el color primario
          default: "#FFF8E1", // Beige suave para el color por defecto
          danger: "#E5383B", // Rojo suave para los botones o elementos de alerta
          surface: "#FFFFFF", // Blanco para la superficie
          background: "#F5F5F5", // Gris claro para el fondo
          border: "#A5A58D", // Marrón suave para los bordes
          hover: "#F4A261", // Naranja suave para el estado hover

          // Optional
          content: "#1E293B", // Mantén el azul muy oscuro para el texto
          info: "#3B82F6", // Azul medio para información (ajustar si necesario)
          success: "#6B705C", // Verde oliva para los éxitos
          error: "#DC2626", // Mantén el rojo para los errores
          warn: "#F59E0B", // Naranja para las advertencias
          "primary-hover": "#831821", // Rojo vino más oscuro para hover en botones primarios
          "primary-content": "#FFFFFF", // Blanco para el contenido sobre el color primario
          "default-hover": "#F5DEB3", // Beige más oscuro para el hover por defecto
          "default-content": "#6D4C41", // Marrón oscuro para el contenido por defecto
          "danger-hover": "#B91C1C", // Un rojo más oscuro para hover en botones de peligro
          "danger-content": "#FFFFFF", // Blanco para el contenido sobre el color de peligro
          "secondary-content": "#64748B", // Un azul grisáceo para contenido secundario
          "info-content": "#BFDBFE", // Un azul claro para el contenido informativo
          "info-secondary-content": "#93C5FD", // Un azul más claro para contenido secundario informativo
          "info-icon": "#BFDBFE", // Un azul claro para íconos informativos
          "success-content": "#3D4035", // Verde oscuro para contenido de éxito
          "success-secondary-content": "#495D4E", // Verde más oscuro para contenido secundario de éxito
          "success-icon": "#4C665D", // Un verde medio para íconos de éxito
          "error-content": "#7F1D1D", // Un rojo oscuro para contenido de error
          "error-secondary-content": "#991B1B", // Un rojo más oscuro para contenido secundario de error
          "error-icon": "#F87171", // Un rojo claro para íconos de error
          "warn-content": "#92400E", // Un marrón claro para contenido de advertencia
          "warn-secondary-content": "#F97316", // Un naranja para contenido secundario de advertencia
          "warn-icon": "#FBBF24", // Un amarillo para íconos de advertencia
        },
      },
    ],
  },
};

module.exports = config;
