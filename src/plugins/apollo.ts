/* eslint-disable no-console */
import { Plugin } from 'vue'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

export interface VueResolveGraphQLErrors {
  (error: any, codeMessageMap?: Record<string, string>): string | null
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apollo: typeof apolloClient
    $xhrApollo: typeof xhrApolloClient
    $resolveGraphQLErrors: VueResolveGraphQLErrors
  }
}

const httpLink = createHttpLink({
  uri: `${process.env.API_URL ?? ''}/graphql`,
})

const authLink = setContext((_, { headers }) => {
//   const token = auth.token()
  return {
    headers: {
      ...headers,
    //   Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.groupCollapsed('[GraphQL Error]')
      console.error(`Message: ${message}`)
      console.error(`Location: ${JSON.stringify(locations)}`)
      console.error(`Path: ${path}`)
      console.groupEnd()
    })
  }
  if (networkError) {
    console.groupCollapsed('[Network error]')
    console.error(`Error: ${networkError}`)
    console.groupEnd()
  }
})

export const apolloClient = new ApolloClient({
  defaultOptions: {
    query: { fetchPolicy: 'no-cache' },
    watchQuery: { fetchPolicy: 'no-cache' },
    mutate: { fetchPolicy: 'no-cache' },
  },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          campaign: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming)
            },
          },
        },
      },
    },
  }),
  link: ApolloLink.from([authLink, errorLink, httpLink]),
})

export const xhrApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, errorLink]),
})

export default {
  install(app) {
    const $sentry = app.config.globalProperties.$sentry

    const showErrors = (messages: string[]) => {
      messages.forEach((message, messageIndex) => {
        setTimeout(
          () => app.config.globalProperties.$toast.error(message),
          messageIndex * 50
        )
      })
    }

    const $resolveGraphQLErrors: VueResolveGraphQLErrors = (
      error,
      codeMessageMap = {}
    ) => {
      if (!error) {
        return null
      }

      const messages = []
      for (const {
        code,
        message,
        messages: errorMessages,
      } of error.graphQLErrors ?? []) {
        if (code && codeMessageMap[code]) {
          showErrors([codeMessageMap[code]])
          return code
        }
        if (code) {
          showErrors(errorMessages ?? [message])
          return code
        }
        messages.push(...(errorMessages ?? [message]))
      }

      if (error.networkError?.result?.errors?.length) {
        for (const err of error?.networkError?.result?.errors ?? []) {
          if (err?.message) {
            messages.push(err.message)
          }
        }
      }
      if (messages.length === 0) {
        messages.push(error.message)
      }
      showErrors(messages)
      return null
    }

    app.config.errorHandler = (error) => {
      $resolveGraphQLErrors(error)
      $sentry.captureException(error)
    }

    app.config.globalProperties.$apollo = apolloClient
    app.provide('apollo', apolloClient)

    app.config.globalProperties.$xhrApollo = xhrApolloClient
    app.provide('xhrApollo', xhrApolloClient)

    app.config.globalProperties.$resolveGraphQLErrors = $resolveGraphQLErrors
    app.provide('resolveGraphQLErrors', $resolveGraphQLErrors)
  },
} as Plugin
