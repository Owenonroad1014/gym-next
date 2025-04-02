'use client'
import React from 'react'
import styles from './_styles/button.module.css'
import Link from 'next/link'
import { ORDERS_LIST } from '@/config/api-path'
import { useAuth } from '@/context/auth-context';

export default function Button({ isFormValid, setIsSubmitted, customerInfo }) {
  const { auth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true) // **按下送出時，觸發 isSubmitted 變成 true**
    // alert("QQ")
    if (!isFormValid) {
      alert('請確認表單填寫正確！')
    } else {
      alert('表單提交成功！')
    }

    const cartItems = JSON.parse(localStorage.getItem('cart')) || []
    const pickupMethod = localStorage.getItem('pickupMethod') || '未選擇'
    const paymentMethod = localStorage.getItem('paymentMethod') || '未選擇'

    if (cartItems.length === 0) {
      alert('購物車是空的，無法送出訂單！')
      return
    }

    // 整合訂單資料
    const orderData = {
      items: cartItems,
      paymentMethod,
      pickupMethod,
      customerInfo: {
        ...customerInfo,
        memberId: auth.id // 使用實際登入用戶的 ID
      },
      orderDate: new Date().toISOString(),
    }

    try {
      const response = await fetch( ORDERS_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      const result = await response.json();
      console.log(result)

      if (!response.ok) {
        throw new Error(
          `訂單提交失敗：${response.status} - ${result.message || '未知錯誤'}`
        )
      }

      if (!result.orderId) {
        throw new Error('伺服器未返回 orderId')
      }

      // 存儲訂單信息到localStorage
      const orderDate = new Date().toLocaleString()
      const orderAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      const pickupMethod = customerInfo.pickupMethod || '未選擇'

      localStorage.setItem('lastOrderId', result.orderId)
      localStorage.setItem('orderDate', orderDate)  //後3行新增
      localStorage.setItem('orderAmount', orderAmount)
      localStorage.setItem('pickupMethod', pickupMethod)
      localStorage.removeItem('cart')

      // 重定向到訂單完成頁面
      window.location.href = 'http://localhost:3005/ecpay?amount=1000'

    } catch (error) {
      console.error('提交訂單時發生錯誤：', error)
      alert('訂單提交失敗，請稍後再試！')
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/carts">
        <button className={styles.pseudo}>
          <span>回上一頁</span>
        </button>
      </Link>

      <button
        className={styles.pseudo2}
        onClick={handleSubmit}
        disabled={!isFormValid}
      >
        <span>送出訂單</span>
      </button>
    </div>
  )
}
