'use client'
import React from 'react'
import styles from './_styles/button.module.css'
import Link from 'next/link'
import { ORDERS_LIST } from '@/config/api-path'
//import { ECPAY_PAYMENT } from '@/config/api-path'
import { useAuth } from '@/context/auth-context'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Button({ isFormValid, setIsSubmitted, customerInfo }) {
  const { auth } = useAuth()
  const MySwal = withReactContent(Swal)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true) // **按下送出時，觸發 isSubmitted 變成 true**
    // alert("QQ")
    if (!isFormValid) {
      MySwal.fire({
        icon: 'error',
        title: '表單錯誤',
        text: '請確認表單填寫正確！',
      })
    } else {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: '你的訂單已成功提交!',
        showConfirmButton: false,
        timer: 3000,
      })
    }

    const cartItems = JSON.parse(localStorage.getItem('gym_cart')) || []
    const pickupMethod = localStorage.getItem('pickupMethod') || '未選擇'
    const paymentMethod = localStorage.getItem('paymentMethod') || '未選擇'

    if (cartItems.length === 0) {
      MySwal.fire({
        icon: 'warning',
        title: '購物車為空',
        text: '購物車是空的，無法送出訂單！',
      })
      return
    }

    // 整合訂單資料
    const orderData = {
      items: cartItems,
      paymentMethod,
      pickupMethod,
      customerInfo: {
        ...customerInfo,
        memberId: auth.id, // 使用實際登入用戶的 ID
      },
      orderDate: new Date().toISOString(),
    }
    console.log(auth)
    try {
      const response = await fetch(ORDERS_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()
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
      const orderAmount = result.orderAmount || 0
      // const pickupMethod = customerInfo.pickupMethod || '未選擇' 這個註解後，訂單金額跟自取門市就跑出來了

      localStorage.setItem('lastOrderId', result.orderId)
      localStorage.setItem('orderDate', orderDate) //後3行新增
      localStorage.setItem('orderAmount', orderAmount)
      // localStorage.setItem('pickupMethod', pickupMethod) 同66行
      localStorage.removeItem('gym_cart')

      // 重定向到訂單完成頁面
      window.location.href = 'http://localhost:3005/ecpay?amount=1000'

      // 根據付款方式跳轉頁面或串接綠界
      // if (paymentMethod === '信用卡') {
      //   try {
      //     const ecpayResponse = await fetch(ECPAY_PAYMENT, {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //         amount: orderAmount,
      //         orderId: result.orderId,
      //         description: '健身用品訂單',
      //         email: customerInfo.email
      //       }),
      //     });
      
      //     const ecpayResult = await ecpayResponse.json();
      
      //     if (ecpayResult.redirectUrl) {
      //       window.location.href = ecpayResult.redirectUrl;
      //     } else if (ecpayResult.formHtml) {
      //       const div = document.createElement('div');
      //       div.innerHTML = ecpayResult.formHtml;
      //       document.body.appendChild(div);
      //       document.getElementById('ecpay-form').submit();
      //     } else {
      //       throw new Error('綠界付款回應異常');
      //     }
      
      //   } catch (err) {
      //     console.error('串接綠界付款失敗:', err);
      //     MySwal.fire({
      //       icon: 'error',
      //       title: '付款導向失敗',
      //       text: '無法轉導至綠界，請稍後再試',
      //     });
      //   }
      // } else {
      //   // 非信用卡的付款方式導向其他完成頁
      //   window.location.href = '/complete';
      // }

    } catch (error) {
      console.error('提交訂單時發生錯誤：', error)
      MySwal.fire({
        icon: 'error',
        title: '提交失敗',
        text: '訂單提交失敗，請稍後再試！',
        confirmButtonColor: '#f87808',
      })
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/carts">
        <button className={`${styles.pseudo} ${styles.button}`}>
          <span>回上一頁</span>
        </button>
      </Link>

      <button
        className={`${styles.pseudo2} ${styles.button}`}
        onClick={handleSubmit}
        disabled={!isFormValid}
      >
        <span>送出訂單</span>
      </button>
    </div>
  )
}
