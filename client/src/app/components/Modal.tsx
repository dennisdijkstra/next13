'use client'

import { ReactNode, useState, useEffect, MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@phosphor-icons/react'

type ModalProps = {
  title: string
  onConfirm?: () => void
  onCancel: () => void
  children: ReactNode
}

export default function Modal({
  title,
  onConfirm,
  onCancel,
  children,
}: ModalProps) {
  const [mounted, setMounted] = useState(false)

  const close = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    onCancel()
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted ? (
      createPortal(
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <div className="relative w-[600px] h-[400px]">
            <div className="w-full h-full p-10 rounded-md bg-white">
              <button className="absolute top-5 right-5" onClick={close}>
                <X size={24} weight="bold" />
              </button>
              {title && <h1 className="text-3xl text-center font-bold">{title}</h1>}
              <div className="mt-10">{children}</div>
            </div>
          </div>
        </div>, document.getElementById('modal-root')!)
    ) : null
  )
}