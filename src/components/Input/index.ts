// Export base components
export * from './Input'

// Export all input types
export { InputText } from './InputText'
export type { InputTextProps } from './InputText'

export { InputPassword } from './InputPassword'
export type { InputPasswordProps } from './InputPassword'

export { InputHidden } from './InputHidden'
export type { InputHiddenProps } from './InputHidden'

export { InputSearch } from './InputSearch'
export type { InputSearchProps } from './InputSearch'

export { InputEmail } from './InputEmail'
export type { InputEmailProps } from './InputEmail'

export { InputUrl } from './InputUrl'
export type { InputUrlProps } from './InputUrl'

export { InputNumber } from './InputNumber'
export type { InputNumberProps } from './InputNumber'

export { InputDecimal } from './InputDecimal'
export type { InputDecimalProps } from './InputDecimal'

export { InputTel } from './InputTel'
export type { InputTelProps } from './InputTel'

export { InputTextArea } from './InputTextArea'
export type { InputTextAreaProps } from './InputTextArea'

export { InputDate } from './InputDate'
export type { InputDateProps } from './InputDate'

export { InputRange } from './InputRange'
export type { InputRangeProps } from './InputRange'

export { InputFile } from './InputFile'
export type { InputFileProps } from './InputFile'

export { InputColorPicker } from './InputColorPicker'
export type { InputColorPickerProps, ColorFormat, ColorValue } from './InputColorPicker'

// Main Input component with all sub-components
import { InputText } from './InputText'
import { InputPassword } from './InputPassword'
import { InputHidden } from './InputHidden'
import { InputSearch } from './InputSearch'
import { InputEmail } from './InputEmail'
import { InputUrl } from './InputUrl'
import { InputNumber } from './InputNumber'
import { InputDecimal } from './InputDecimal'
import { InputTel } from './InputTel'
import { InputTextArea } from './InputTextArea'
import { InputDate } from './InputDate'
import { InputRange } from './InputRange'
import { InputFile } from './InputFile'
import { InputColorPicker } from './InputColorPicker'

export const Input = Object.assign(InputText, {
  Text: InputText,
  Password: InputPassword,
  Hidden: InputHidden,
  Search: InputSearch,
  Email: InputEmail,
  Url: InputUrl,
  Number: InputNumber,
  Decimal: InputDecimal,
  Tel: InputTel,
  TextArea: InputTextArea,
  Date: InputDate,
  Range: InputRange,
  File: InputFile,
  ColorPicker: InputColorPicker,
})

// For tree shaking and direct imports
Input.Text = InputText
Input.Password = InputPassword
Input.Hidden = InputHidden
Input.Search = InputSearch
Input.Email = InputEmail
Input.Url = InputUrl
Input.Number = InputNumber
Input.Decimal = InputDecimal
Input.Tel = InputTel
Input.TextArea = InputTextArea
Input.Date = InputDate
Input.Range = InputRange
Input.File = InputFile
Input.ColorPicker = InputColorPicker
