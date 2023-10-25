import { ChangeEvent } from 'react'
import { classNames } from '@/utils/index'

type InputProps = {
  type?: string
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  isDisabled?: boolean
  className?: string
}

const Input = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  placeholder,
  isDisabled = false,
  className,
}: InputProps) => {
  return (
    <>
      <label htmlFor={name} className='mb-2'>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames(
          'p-3 mb-4 border-2 border-solid border-black rounded',
          className,
          isDisabled ? 'bg-purple-200 text-gray-500' : 'bg-purple-50',
        )}
        disabled={isDisabled}
      />
    </>
  )
}

export default Input
