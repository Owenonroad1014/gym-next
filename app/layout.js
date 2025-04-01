
import '@/styles/globals.css'
// import Header from './_components/header'
import Footer from './_components/footer'
import { AuthContextProvider } from '@/context/auth-context'
import { CartProvider } from "@/context/cart-context";
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./_components/header'), {
  ssr: false // 禁用伺服器端渲染
})


// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// })
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// })

export const metadata = {
  title: 'GYM',
  description: '我在，往GYM步的路上邁進',
}

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <html lang="en">
        <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
        </body>
      </html>
    </AuthContextProvider>
  )
}
