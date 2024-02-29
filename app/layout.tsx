import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Session } from 'next-auth'
import { ThemeProvider } from 'next-themes'

export const metadata = {
    title: "Promptopia",
    description: "Discover AI-generated prompts"
}

const RootLayout = ({ children, session } : { children: React.ReactNode, session: Session}) => {

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