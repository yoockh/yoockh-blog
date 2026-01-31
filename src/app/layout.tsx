import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Yoockh | Backend Engineer',
  description: 'Personal portfolio of Yoockh - Backend Software Engineer specializing in Golang, Python, Django, Docker, and GCP',
  keywords: ['Backend Engineer', 'Golang', 'Python', 'Django', 'Docker', 'GCP', 'Software Engineer'],
  authors: [{ name: 'Yoockh' }],
  openGraph: {
    title: 'Yoockh | Backend Engineer',
    description: 'Personal portfolio of Yoockh - Backend Software Engineer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-void overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 grid-bg pointer-events-none" />
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl" />
        </div>
        
        {/* Sidebar - Fixed */}
        <Sidebar />
        
        {/* Main Content - with proper offset for sidebar */}
        <main className="relative min-h-screen pl-0 md:pl-20 lg:pl-24 pb-24 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  )
}
