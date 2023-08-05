import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import imports from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'

const API_URL =
  process.env.API_URL ??
  'http://ec2-52-78-4-90.ap-northeast-2.compute.amazonaws.com/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    imports({
      imports: [
        'vue',
        '@vueuse/core',
        'vue-router',
        { '@vueuse/router': ['useRouteQuery', 'useRouteParams'] },
        { 'vee-validate': ['useForm', 'useField'] },
        {
          '@vue/apollo-composable': ['useQuery', 'useLazyQuery', 'useMutation'],
        },
        { '~/src/plugins/dialog': ['useDialog'] },
        { '~/src/plugins/format': ['useFormat'] },
      ],
      dts: 'types/auto-imports.d.ts',
    }),
    components({
      dirs: ['src/components'],
      dts: 'types/auto-components.d.ts',
    }),
  ],

  define: {
    API_URL: JSON.stringify(API_URL),
  },

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
      'apollo-client': path.resolve(__dirname, './node_modules/@apollo/client'),
    },
  },
})
