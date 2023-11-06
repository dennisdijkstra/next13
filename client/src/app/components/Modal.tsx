'use client'

import { ReactNode, useState, useEffect, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  title: string
  onConfirm: () => void
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
    onConfirm()
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted ? (
      createPortal(
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <a href="#" onClick={close}>x</a>
              </div>
              {title && <h1>{title}</h1>}
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>, document.getElementById('modal-root')!)
    ) : null
  )
}