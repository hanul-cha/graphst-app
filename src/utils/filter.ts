import { Ref, computed } from 'vue'
import { useRouteQuery } from '@vueuse/router'

type FilterHistoryValue =
  | string
  | number
  | boolean
  | (string | number | boolean)[]
  | null

interface FilterItem {
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
    : string | null
  : T extends NumberConstructor
  ? M extends true
    ? number[]
    : number | null
  : T extends BooleanConstructor
  ? M extends true
    ? boolean[]
    : boolean
  : null

export function useFilter<
  T extends keyof U,
  U extends { [_: string]: FilterItem }
>(
  item: U
): {
  [key in T]: Ref<FilterItemTypeToValue<U[key]['type'], U[key]['isMultiple']>>
} {
  const result = {} as {
    [key in T]: Ref<FilterItemTypeToValue<U[key]['type'], U[key]['isMultiple']>>
  }

  const items = Object.entries(item) as [T, FilterItem][]
  items.forEach(([key, { default: _defaultValue, type, isMultiple }]) => {
    const query = useRouteQuery(key as string)
    result[key] = computed<
      FilterItemTypeToValue<U[T]['type'], U[T]['isMultiple']>
    >({
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
