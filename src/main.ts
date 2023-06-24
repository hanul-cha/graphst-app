import { createApp, h, provide } from 'vue'
import './style.css'
import App from './App.vue'
import { ApolloClients } from '@vue/apollo-composable'
import apollo, { apolloClient } from './plugins/apollo'

const app = createApp({
    setup() {
      provide(ApolloClients, {
        default: apolloClient,
      })
    },
    render: () => h(App),
  })

app.use(apollo)
