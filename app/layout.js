import '@/Styles/globals.css'
import Header from './_components/header'
import Footer from './_components/footer'

export const metadata = {
  title: 'GYM',
  description: '我在，往GYM步的路上邁進',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
