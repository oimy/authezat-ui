import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import {resolve} from "path";

export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        port: 3411,
        allowedHosts: [
            "authezat-local.soia.asia"
        ]
    },
    resolve: {
        alias: {
            "@css": resolve(__dirname, 'src/css'),
            "@assets": resolve(__dirname, 'src/assets'),
        },
    },
    css: {
        modules: {
            localsConvention: "camelCase",
        },
    },
});
