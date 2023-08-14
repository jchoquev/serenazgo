import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './Providers'


export const metadata = {
  title: 'SSCP-Puno',
  description: 'Es una APP de serenazgo Puno',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SSCP-Puno</title>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
