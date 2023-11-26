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
          primary: "#1E40AF", // Un azul intenso para el color primario
          default: "#E0F2FE", // Un azul muy claro para el color por defecto
          danger: "#EF4444", // Rojo para los botones o elementos de alerta
          surface: "#FFFFFF", // Blanco para la superficie
          background: "#EFF6FF", // Un azul pálido para el fondo
          border: "#BFDBFE", // Un azul claro para los bordes
          hover: "#60A5FA", // Un azul más claro para el estado hover

          // Optional
          content: "#1E293B", // Un azul muy oscuro para el texto
          info: "#3B82F6", // Un azul medio para información
          success: "#22C55E", // Verde brillante para los éxitos
          error: "#DC2626", // Rojo para los errores
          warn: "#F59E0B", // Naranja para las advertencias
          "primary-hover": "#2563EB", // Un azul ligeramente más claro para hover en los botones primarios
          "primary-content": "#FFFFFF", // Blanco para el contenido sobre el color primario
          "default-hover": "#BAE6FD", // Un azul cielo para el hover por defecto
          "default-content": "#1E3A8A", // Un azul oscuro para el contenido por defecto
          "danger-hover": "#B91C1C", // Un rojo más oscuro para hover en botones de peligro
          "danger-content": "#FFFFFF", // Blanco para el contenido sobre el color de peligro
          "secondary-content": "#64748B", // Un azul grisáceo para contenido secundario
          "info-content": "#BFDBFE", // Un azul claro para el contenido informativo
          "info-secondary-content": "#93C5FD", // Un azul más claro para contenido secundario informativo
          "info-icon": "#BFDBFE", // Un azul claro para íconos informativos
          "success-content": "#14532D", // Un verde oscuro para contenido de éxito
          "success-secondary-content": "#166534", // Un verde medio para contenido secundario de éxito
          "success-icon": "#10B981", // Un verde claro para íconos de éxito
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
