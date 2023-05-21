import React, { ReactNode } from 'react'
import { Inter } from 'next/font/google'
require('dotenv').config()

export const metadata = {
  title: 'Entry Level Test',
  description: ' Discover Interesting Programs',
}

const inter = Inter({ subsets: ['latin'] })

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className={'app ' + inter.className} id="main">
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
