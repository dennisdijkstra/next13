import { ChangeEvent } from "react"
import { classNames } from "@/utils/index"

type InputProps = {
  type?: string
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

const Input = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  placeholder,
  className,
}: InputProps) => {
  return (
    <>
      <label className='mb-2'>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames(
          "p-3 mb-4 border-2 border-solid border-black rounded",
          className
        )}
      />
    </>
  )
}

export default Input
