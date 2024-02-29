import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Session } from 'next-auth'
import { ThemeProvider } from 'next-themes'
import { Children, ReactNode } from 'react'

export const metadata = {
    title: "Promptopia",
    description: "Discover AI-generated prompts"
}

interface Props {
    children: ReactNode
    session: Session
}

const RootLayout = ({ children, session } : Props) => {

  return (
    <html>
        <body>
            <Provider session={session}>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className='app'>
                    <Nav />
                    { children }
                </main>
            </Provider>   
        </body>
    </html>
  )
}

export default RootLayout