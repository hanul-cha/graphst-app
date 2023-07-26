import { createApp, h, provide } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { ApolloClients } from '@vue/apollo-composable'
import apollo, { apolloClient } from './plugins/apollo'
import router from './plugins/router'
import dialog from './plugins/dialog'
import auth from './plugins/auth'
import format from './plugins/format'

const pinia = createPinia()

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    })
  },
  render: () => h(App),
})

app
  .use(apollo)
  .use(dialog)
  .use(pinia)
  .use(router)
  .use(auth)
  .use(format)
  .mount('#app')

app.config.errorHandler = async (error: any) => {
  // TODO: 개발 환경일 땐 에러를 콘솔에 출력한다.
  // console.error(error)
  if (error.message === '로그인이 필요한 서비스 입니다.') {
    const confirm = await app.config.globalProperties.$dialog.open({
      title: '로그인이 필요합니다',
      message: '로그인하러 가시겠습니까?',
      confirmText: '로그인',
    })
    if (confirm) {
      app.config.globalProperties.$router.push('/signin')
    }
  } else {
    await app.config.globalProperties.$dialog.open({
      title: error.message,
    })
  }
}
