import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  staged: {
    "*": "vp check --fix",
  },
  plugins: [react()],
});
