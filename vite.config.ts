import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.LOCAL_IP": JSON.stringify(env.LOCAL_IP),
    },
    server: {
      host: "0.0.0.0",
    },
    preview: {
      port: 5001,
    },
    plugins: [react()],
  };
});
