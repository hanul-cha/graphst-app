import { createApp, h, provide } from 'vue'
// import './style.css'
import App from './App.vue'
import { ApolloClients } from '@vue/apollo-composable'
import apollo, { apolloClient } from './plugins/apollo'
import router from './plugins/router'

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    })
  },
  render: () => h(App),
})

app.use(router).use(apollo).mount('#app')
