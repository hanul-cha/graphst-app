export interface FilterHistoryItem {
  label: string
  value: any
  type?: StringConstructor | NumberConstructor | BooleanConstructor
  isMultiple?: boolean
  ignore?: boolean
}

export interface FilterHistoryProps {
  modelValue: {
    [key: string]: FilterHistoryItem
  }
}

export interface FilterHistoryEmits {
  (
    _e: 'update:modelValue',
    _value: {
      [key: string]: FilterHistoryItem
    }
  ): void
  (_e: 'open'): void
  (_e: 'close'): void
}
