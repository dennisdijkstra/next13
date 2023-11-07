'use client'

import { ReactNode, useState, useEffect, useRef, MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@phosphor-icons/react'
import Button from '@/components/Button'
import gsap from 'gsap'

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
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const animate = (isOpen: boolean) => {
    if (overlayRef.current) {
      const opacity = isOpen ? 0.5 : 0
      gsap.to(overlayRef.current, { opacity, duration: 0.3 })
    }
  }

  const onClose = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const isButton = e.currentTarget.tagName === 'BUTTON'
    if (modalRef.current && modalRef.current.contains(e.target as Node) && !isButton) {
      return
    }

    animate(false)
    setTimeout(() => onCancel(), 100)
  }

  useEffect(() => {
    setIsMounted(true)
    setTimeout(() => animate(true), 0)
  }, [])

  return (
    isMounted ? (
      createPortal(
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 z-10" ref={overlayRef} onClick={onClose} />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="relative w-[600px] h-[400px] z-20" ref={modalRef}>
              <div className="w-full h-full px-10 pt-10 pb-[108px] rounded-md bg-white">
                <button className="absolute top-5 right-5" onClick={onClose}>
                  <X size={24} weight="bold" />
                </button>
                {title && <h1 className="text-3xl text-center font-bold">{title}</h1>}
                <div className="mt-10">{children}</div>
                <div className="absolute left-0 bottom-0 w-full flex">
                  <Button type='submit' className='w-full rounded-none' onClick={onConfirm}>Ok</Button>
                  <Button type='submit' className='w-full rounded-none' onClick={onClose}>Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        </>, document.getElementById('modal-root')!)
    ) : null
  )
}