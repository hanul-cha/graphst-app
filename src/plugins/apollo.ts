import { Plugin } from 'vue'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'universal-cookie'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apollo: typeof apolloClient
  }
}

const httpLink = createHttpLink({
  // eslint-disable-next-line no-undef
  uri: API_URL,
})

const cookies = new Cookies()

const authLink = setContext((_, { headers }) => {
  const token = cookies.get('graphst_actok')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const apolloClient = new ApolloClient({
  defaultOptions: {
    query: { fetchPolicy: 'no-cache' },
    watchQuery: { fetchPolicy: 'no-cache' },
    mutate: { fetchPolicy: 'no-cache' },
  },
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, httpLink]),
})

export default {
  install(app) {
    app.config.globalProperties.$apollo = apolloClient
    app.provide('apollo', apolloClient)
  },
} as Plugin
