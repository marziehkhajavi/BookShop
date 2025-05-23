import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { paths } from './src/constants/paths'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      ...paths.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: `/${cur === "src" ? cur : "src/" +cur}`,
        }), "")
    }
  }
})
