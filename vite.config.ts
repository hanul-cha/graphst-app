import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import imports from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'

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
        {
          '@vue/apollo-composable': ['useQuery', 'useLazyQuery', 'useMutation'],
        },
        { '~/src/plugins/dialog': ['useDialog'] },
      ],
      dts: 'types/auto-imports.d.ts',
    }),
    components({
      dirs: ['src/components'],
      dts: 'types/auto-components.d.ts',
    }),
  ],

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
      'apollo-client': path.resolve(__dirname, './node_modules/@apollo/client'),
      'vue-property-decorator': path.resolve(
        __dirname,
        './node_modules/vue-facing-decorator'
      ),
    },
  },
})
