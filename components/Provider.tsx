'use client'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

const Provider = ({ children, session }: {children: React.ReactNode, session: Session}) => {
  return (
    <SessionProvider session={session} refetchInterval={5 * 50} refetchOnWindowFocus={true}>
        {children}
    </SessionProvider>
  )
}

export default Provider