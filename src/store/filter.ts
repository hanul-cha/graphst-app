import { Ref, computed, onBeforeUnmount } from 'vue'
import { useRouteQuery } from '@vueuse/router'
import { defineStore } from 'pinia'
import { FilterHistoryItem } from '@/components/page/FilterHistory.vue'

export type FilterHistoryValue =
  | string
  | number
  | boolean
  | (string | number | boolean)[]
  | null

export interface FilterItem {
  default?: FilterHistoryValue
  type?: StringConstructor | NumberConstructor | BooleanConstructor
  isMultiple?: boolean
}

type FilterItemTypeToValue<
  T extends
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | undefined = StringConstructor,
  M extends boolean | undefined = false
> = T extends StringConstructor
  ? M extends true
    ? string[]
    : string
  : T extends NumberConstructor
  ? M extends true
    ? number[]
    : number
  : T extends BooleanConstructor
  ? M extends true
    ? boolean[]
    : boolean
  : null

export const useFilterStore = defineStore('filter', () => {
  let definedData:
    | {
        [_ in string]: Ref<FilterItemTypeToValue<any, any>>
      }
    | null = null

  let metadata:
    | {
        [_ in string]: FilterItem
      }
    | null = null

  const filter = computed<{
    [key: string]: FilterHistoryItem
  } | null>({
    get: () => {
      if (!definedData || !metadata) {
        return null
      }
      return Object.entries(definedData).reduce(
        (prev, [key, value]) => {
          prev[key] = {
            value: value.value,
            // TODO: fix type
            label: key,
            type: metadata![key].type,
            isMultiple: metadata![key].isMultiple,
          }
          return prev
        },
        {} as {
          [key: string]: FilterHistoryItem
        }
      )
    },
    set: (value) => {
      if (!value) {
        definedData = null
      }
      if (definedData) {
        Object.entries(value!).forEach(([key, value]) => {
          definedData![key].value = value.value as any
        })
      }
    },
  })

  function filterOn<U extends { [_: string]: FilterItem }>(item: U) {
    console.log('???')
    onBeforeUnmount(() => {
      definedData = null
      metadata = null
    })
    const value = useFilter(item)
    definedData = value
    metadata = item
    return value
  }

  return {
    on: filterOn,
    filter,
  }
})

function useFilter<T extends keyof U, U extends { [_: string]: FilterItem }>(
  item: U
): {
  [key in T]: Ref<FilterItemTypeToValue<
    U[key]['type'],
    U[key]['isMultiple']
  > | null>
} {
  const result = {} as {
    [key in T]: Ref<FilterItemTypeToValue<
      U[key]['type'],
      U[key]['isMultiple']
    > | null>
  }

  const items = Object.entries(item) as [T, FilterItem][]
  items.forEach(([key, { default: _defaultValue, type, isMultiple }]) => {
    const query = useRouteQuery(key as string)
    result[key] = computed<FilterItemTypeToValue<
      U[T]['type'],
      U[T]['isMultiple']
    > | null>({
      // @ts-ignore
      get() {
        const value = query.value
        if (isMultiple) {
          const values = toArray(value)

          if (type === Number) {
            return values.map((v) => parseInt(v))
          }
          if (type === Boolean) {
            return values.map((v) => v === 'true')
          }
          return values
        }
        if (value === null) {
          if (type === Boolean) {
            return false
          }
          return _defaultValue ?? null
        }
        const values = toSingle(value)
        if (type === Number) {
          return parseInt(values)
        }
        if (type === Boolean) {
          return values === 'true'
        }
        return values
      },
      set(value) {
        if (value === null || value === undefined) {
          query.value = null
          return
        }
        if (Array.isArray(value)) {
          const array = value.join(',')
          query.value = array.length > 0 ? array : null
        } else if (typeof value === 'boolean' && !value) {
          query.value = null
        } else {
          query.value = value?.toString() ?? null
        }
      },
    })
  })

  return result
}

function toArray(stringOrArray: string | string[] | null): string[] {
  if (stringOrArray === null) {
    return []
  }
  const value = toSingle(stringOrArray)
  return value.split(',')
}

function toSingle(stringOrArray: string | string[]) {
  if (!stringOrArray) {
    return stringOrArray ?? null
  }
  return Array.isArray(stringOrArray) ? stringOrArray[0] : stringOrArray
}
