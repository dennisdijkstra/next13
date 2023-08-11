import { ReactNode, MouseEvent } from 'react'
import { classNames } from '@/utils/index'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick: (e: MouseEvent<HTMLElement>) => void
  className?: string
  children: ReactNode
}

const Button = ({
  type = 'button',
  onClick,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        'p-5 bg-black hover:bg-gray-900 rounded',
        'text-white text-lg',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
