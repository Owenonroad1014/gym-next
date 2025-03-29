'use client' 

import '@/styles/globals.css'
import Headers from './_components/header'
import Footers from './_components/footer'
import { AuthContextProvider } from '@/context/auth-context'
import { CartProvider } from "@/context/cart-context"
import { usePathname } from 'next/navigation'


export default function ProductLayout({ children }) {
  const pathname = usePathname()
  
  // 判斷是否為會員頁面，避免重複渲染 Header / Footer
  const isProductsPage = pathname.startsWith('/products')

  return (
    <AuthContextProvider>
          <CartProvider>
            {!isProductsPage && <Headers />}
            {children}
            {!isProductsPage && <Footers />}
          </CartProvider>
    </AuthContextProvider>
  )
}
