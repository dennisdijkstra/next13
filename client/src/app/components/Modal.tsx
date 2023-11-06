'use client'

import { ReactNode, useState, useEffect, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  onClose: () => void
  title: string,
  children: ReactNode
}

export default function Modal({ onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  const close = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    onClose()
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