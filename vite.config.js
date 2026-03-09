import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const certificateDirectory = path.resolve(__dirname, ".cert");
const certificatePath =
  process.env.VITE_DEV_SSL_CERT ??
  path.join(certificateDirectory, "dev-cert.pem");
const keyPath =
  process.env.VITE_DEV_SSL_KEY ??
  path.join(certificateDirectory, "dev-key.pem");

const hasCustomCertificate =
  fs.existsSync(certificatePath) && fs.existsSync(keyPath);

const httpsConfig = hasCustomCertificate
  ? {
      cert: fs.readFileSync(certificatePath),
      key: fs.readFileSync(keyPath),
    }
  : true;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    ...(hasCustomCertificate ? [] : [basicSsl()]),
  ],
  server: {
    host: true,
    https: httpsConfig,
  },
  preview: {
    host: true,
    https: httpsConfig,
  },
});
