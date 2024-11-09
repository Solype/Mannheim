import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import os from 'os';

// Fonction pour obtenir l'IP locale
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const addresses = interfaces[interfaceName];
        if (!addresses) {
            continue;
        }
        for (const address of addresses) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
}

const localIP = getLocalIP();

export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 8081,
        open: true,
    },
    define: {
        __MY_LOCAL_IP__: JSON.stringify(localIP),
        __DOCKER_HOST_IP__: JSON.stringify(process.env.VITE_BACKEND_URL),
    },
    plugins: [
        react()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
