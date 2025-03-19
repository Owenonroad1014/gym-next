'use client'
import React, { createContext, useContext, useState } from 'react'

// 創建 Context
const CartContext = createContext()

//配合瀏覽器上的react devtools可以看到名稱，方便除錯用
CartContext.displayName = 'CartContext'

//建立一個Provider元件，自訂這個勾子所需的context用的狀態值
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '飛輪健身車',
      weight: '5kg',
      price: 500,
      quantity: 1,
      image: '/cart-img/飛輪車.jpg',
      rentalStartDate: "", // 新增租借開始日期
      rentalEndDate: "",   // 新增租借結束日期
    },
    {
      id: 2,
      name: '啞鈴組合',
      weight: '10kg',
      price: 800,
      quantity: 1,
      image: '/cart-img/啞鈴.jpg',
      rentalStartDate: "",
      rentalEndDate: "",
    },
  ])

  // 計算租借天數
  const calculateRentalDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 1; // 若未選擇日期，至少算 1 天
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1; // 確保最少為 1 天
  };


  // 計算購物車的總金額（考慮租借天數）
  const subtotal = cartItems.reduce((acc, item) => {
    const rentalDays = calculateRentalDays(item.rentalStartDate, item.rentalEndDate);
    return acc + item.price * item.quantity * rentalDays;
  }, 0);

  // 更新購物車商品資訊（更新數量 & 租借日期）
  const updateCartItem = (productId, updatedData) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, ...updatedData } : item
      )
    );
  };


  return (
    <CartContext.Provider value={{ cartItems, setCartItems, subtotal, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

// 自訂 Hook，讓其他組件更方便使用
export function useCart() {
  return useContext(CartContext)
}
