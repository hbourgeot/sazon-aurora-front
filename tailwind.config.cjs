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
    themes: ["light", "dark", {
			mytheme: {
				// Required
				primary: '#2563eb',
				default: '#E4E6EB',
				danger: '#dc2626',
				surface: '#ffffff',
				background: '#F0F2F5',
				border: '#E8E9EC',
				hover: '#000000',

				// Optional
				content: '#050505',
				info: '#3b82f6',
				success: '#22c55e',
				error: '#ef4444',
				warn: '#eab308',
				'primary-hover': '#1d4ed8',
				'primary-content': '#ffffff',
				'default-hover': '#f3f4f6',
				'default-content': '#1f2937',
				'danger-hover': '#b91c1c',
				'danger-content': '#ffffff',
				'secondary-content': '#545455',
				'info-content': '#1d4ed8',
				'info-secondary-content': '#2563eb',
				'info-icon': '#60a5fa',
				'success-content': '#166534',
				'success-secondary-content': '#15803d',
				'success-icon': '#4ade80',
				'error-content': '#991b1b',
				'error-secondary-content': '#b91c1c',
				'error-icon': '#f87171',
				'warn-content': '#854d0e',
				'warn-secondary-content': '#a16207',
				'warn-icon': '#facc15'
			},
		 }],
  },
};

module.exports = config;
