import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  build: {
    emptyOutDir: true,
    outDir: "../HR_ClientManagement_WebAPI/wwwroot/",
  },
  alias: {
      '@mui/icons-material': path.resolve(__dirname, 'node_modules/@mui/icons-material'),
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
    },
});
