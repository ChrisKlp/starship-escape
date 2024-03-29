import { useState, useEffect } from 'react'

export default function DelayedComponent({
  children,
}: {
  children: React.ReactElement
}) {
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setRendered(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return <>{rendered && children}</>
}
