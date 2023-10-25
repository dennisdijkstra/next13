import { ReactNode } from 'react'

type MainProps = {
  children: ReactNode
}

const Main = ({ children }: MainProps) => {
  return (
    <div className="flex flex-1 p-12">
      {children}
    </div>
  )
}

export default Main
