/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    verbose: true,
    reporters: ["dot", "verbose"],
    css: {
      modules: {
        // Simplifies unit tests by
        // having classes in the form of:
        // Button Active
        // instead of
        // _Button_2a1efe _Active_2a1efe
        classNameStrategy: "non-scoped",
      },
    },
  },
})
