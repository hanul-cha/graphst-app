export interface FieldValidationMetaInfo {
  field: string
  name: string
  label?: string
  value: unknown
  compareValue?: unknown
}

export interface FieldValidationRule {
  // _: 입력값, __: 비교값
  validate: (_: any, __?: any) => boolean
  errorMessage?: (_: FieldValidationMetaInfo) => string
}

// <Rules>
const custom: FieldValidationRule = {
  validate: (_value: any, roleValue: boolean) => roleValue,
}

const required: FieldValidationRule = {
  validate: (value: any) => !!value,
  errorMessage: ({ name }: FieldValidationMetaInfo) =>
    name + '은 필수값 입니다.',
}

const min: FieldValidationRule = {
  validate: (value: any, min: number) => value.length >= min,
  errorMessage: ({ name, compareValue }: FieldValidationMetaInfo) =>
    `${name}은 최소 ${compareValue}자 이상이어야 합니다.`,
}

const max: FieldValidationRule = {
  validate: (value: any, max: number) => value.length <= max,
  errorMessage: ({ name, compareValue }: FieldValidationMetaInfo) =>
    `${name} 은 최대 ${compareValue}자 이하여야 합니다.`,
}

const password: FieldValidationRule = {
  validate: (value: any) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,12}$/
    return regExp.test(value)
  },
  errorMessage: ({ name }: FieldValidationMetaInfo) =>
    `${name} 은 영문, 숫자를 포함한 6~12자리여야 합니다.`,
}
// </Rules>

const validateRoles = {
  required,
  min,
  max,
  password,
  custom,
}

type ValidateRolesKey = keyof typeof validateRoles
type SingleValidateProps = 'required' | 'password'
export type ValidateProps =
  | {
      custom?: boolean
      required?: boolean
      password?: boolean
      min?: number
      max?: number
    }
  | SingleValidateProps

export function validator(
  value: any,
  field: Omit<FieldValidationMetaInfo, 'compareValue'>,
  rules: ValidateProps
): boolean | string {
  if (typeof rules === 'string') {
    const rule = validateRoles[rules]
    if (rule.validate(value)) {
      return true
    } else {
      return rule.errorMessage
        ? rule.errorMessage({ ...field, value, compareValue: undefined })
        : `${field.name} 은 유효하지 않습니다.`
    }
  }
  for (const [key, ruleValue] of Object.entries(rules)) {
    const rule = validateRoles[key as ValidateRolesKey]

    if (rule.validate(value, ruleValue)) {
      continue
    } else {
      return rule.errorMessage
        ? rule.errorMessage({ ...field, value, compareValue: ruleValue })
        : `${field.name} 은 유효하지 않습니다.`
    }
  }
  return true
}
