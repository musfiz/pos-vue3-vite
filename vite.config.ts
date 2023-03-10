import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginFonts({
      custom:{
        families: [{
          name: 'Roboto',
          local: 'Roboto',
          src: './src/assets/fonts/Roboto/*.ttf',
        }],
        display: 'auto',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      }
    })
  ],
})
