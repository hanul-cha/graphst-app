import { AuthQuestion } from '@/api/graphql'
import formatDate from '@/utils/formatDate'
import { InjectionKey, Plugin, inject } from 'vue'

interface Format {
  date: typeof formatDate
  removeHtmlTag: (_str: string) => string
  questionOptions: {
    value: string
    label: string
  }[]
}

function create(): Format {
  return {
    date: formatDate,
    removeHtmlTag: (str) =>
      str.replace(/&nbsp;/g, '').replace(/<[^>]*>?/gm, ''),
    questionOptions: [
      {
        label: '내가 가장 좋아하는 동물은?',
        value: AuthQuestion.FavoriteAnimal,
      },
      { label: '내가 가장 좋아하는 색은?', value: AuthQuestion.FavoriteColor },
      { label: '내가 가장 좋아하는 음식은?', value: AuthQuestion.FavoriteFood },
      {
        label: '내가 가장 좋아하는 영화는?',
        value: AuthQuestion.FavoriteMovie,
      },
      {
        label: '내가 가장 좋아하는 숫자는?',
        value: AuthQuestion.FavoriteNumber,
      },
      {
        label: '내가 가장 좋아하는 운동은??',
        value: AuthQuestion.FavoriteSports,
      },
    ],
  }
}

export const DialogKey: InjectionKey<() => Format> = Symbol('format')

export function useFormat(): Format {
  return inject(DialogKey, create)()
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $format: Format
  }
}

export default {
  install(app) {
    let format: Format | null = null
    Object.defineProperty(app.config.globalProperties, '$format', {
      get: () => format ?? (format = create()),
    })
    app.provide(DialogKey, () => app.config.globalProperties.$format)
  },
} as Plugin
