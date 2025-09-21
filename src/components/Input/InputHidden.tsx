import * as React from 'react'

export interface InputHiddenProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputHidden = React.forwardRef<HTMLInputElement, InputHiddenProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '')
    const currentValue = value !== undefined ? value : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      
      if (value === undefined) {
        setInternalValue(newValue)
      }
      
      onChange?.(newValue, e)
    }

    return (
      <input
        ref={ref}
        id={id}
        name={name}
        type="hidden"
        value={currentValue}
        onChange={handleChange}
        {...props}
      />
    )
  }
)

InputHidden.displayName = 'InputHidden'
