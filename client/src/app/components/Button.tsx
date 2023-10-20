import { ReactNode, MouseEvent } from 'react'
import { classNames } from '@/utils/index'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: (e: MouseEvent<HTMLElement>) => void
  className?: string
  children: ReactNode
  isDisabled?: boolean
}

const Button = ({
  type = 'button',
  onClick,
  className,
  children,
  isDisabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        'p-5 min-w-[200px] rounded-md',
        'bg-gradient-to-r from-orange-300 via-green-300 to-violet-800',
        'hover:brightness-110 hover:transition-all',
        'font-bold text-lg',
        className
      )}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
