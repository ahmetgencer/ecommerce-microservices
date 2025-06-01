import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-Commerce App',
  description: 'Built with Next.js & Microservices',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          </AuthProvider> 
      </body>
    </html>
  )
}
