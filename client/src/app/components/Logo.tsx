import Link from 'next/link'

const Logo = () => {
  return (
    <div className="h-16 flex items-center justify-center">
      <Link href="/">
        <div className="h-11 w-11 bg-gradient-radial from-orange-300 to-violet-800 rounded-full" />
      </Link>
    </div>
  )
}

export default Logo
