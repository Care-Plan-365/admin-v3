// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build:{
//     outDir: 'dist',
//   },
//   base: '/admin-v3/',
// })

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//     plugins: [react()],
//     base: "/", // ✅ IMPORTANT
//     build: {
//         outDir: "dist",
//     },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    // Support both Vite-style (VITE_*) and CRA-style (REACT_APP_*) env vars.
    // This lets us consume the existing `.env` without modifying it.
    envPrefix: ["VITE_", "REACT_APP_"],
    server: {
        port: 3000,
    },
});
