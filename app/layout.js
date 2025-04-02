
import '@/styles/globals.css'
import Header from './_components/header'
import Footer from './_components/footer'
import { AuthContextProvider } from '@/context/auth-context'
import { CartProvider } from "@/context/cart-context";

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
    <CartProvider>
      <AuthContextProvider>
        <html lang="en">
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </AuthContextProvider>
    </CartProvider>
  )
}
