import { defineStore } from 'pinia'
import { ref } from 'vue'
import decodeJwt from 'jwt-decode'
import {
  GetUserDocument,
  SignInDocument,
  UserFullFragment,
} from '@/api/graphql'
import { apolloClient } from '@/plugins/apollo'
import Cookies from 'universal-cookie'

interface InternalJwtToken {
  id: string
  role: string
  aud: string
  exp: number
}

const cookies = new Cookies()

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserFullFragment | null>(null)

  const login = async (id: string, password: string) => {
    const { data } = await apolloClient.mutate({
      mutation: SignInDocument,
      variables: {
        id,
        password,
      },
    })

    const token = data?.signIn

    if (token) {
      const accessTokenInfo = decodeJwt<InternalJwtToken>(token)
      cookies.set('graphst_actok', token, {
        expires: new Date(accessTokenInfo.exp * 1000),
      })
      await setUser()
    }
  }

  const getUser = async () => {
    if (!user.value) {
      const token = cookies.get('graphst_actok')
      if (token) {
        await setUser()
        return user.value
      }
      return null
    }
    return user.value
  }

  const setUser = async () => {
    const { data, error } = await apolloClient.query({
      query: GetUserDocument,
    })

    if (error) {
      throw new Error(error.message)
    }

    if (data) {
      user.value = data.user ?? null
    }
  }

  const logout = () => {
    user.value = null
    cookies.remove('graphst_actok')
  }
  return {
    user,
    getUser,
    login,
    logout,
  }
})
