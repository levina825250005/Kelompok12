import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use a dedicated port so this dashboard project is not confused with
// an older Kos Ibu Tri dev server that may still be running on 5173.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
  },
});
