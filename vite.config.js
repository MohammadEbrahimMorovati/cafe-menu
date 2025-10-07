// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   tailwind: {
//     theme: {
//       extend: {
//         fontFamily: {
//           body: "var(--font-body)",
//           title: "var(--font-title)",
//         },
//       },
//     },
//   },
//   server: {
//     host: true,   // معادل 0.0.0.0
//     port: 5173,   // چون 5173 پر بود
//     proxy: {
//       "/api": {
//         target: "http://127.0.0.1:8000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ⚙️ تنظیمات نهایی برای build در Vercel
export default defineConfig({
  plugins: [react(), tailwindcss()],
  tailwind: {
    theme: {
      extend: {
        fontFamily: {
          body: "var(--font-body)",
          title: "var(--font-title)",
        },
      },
    },
  },
  build: {
    outDir: "dist", // 📦 خروجی بیلد برای Vercel
  },
});
