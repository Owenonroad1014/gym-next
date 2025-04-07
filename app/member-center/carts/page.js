'use client'
import React, { useEffect, useState } from 'react'
import OrderList from './_component/OrderList'
import { HISTORY_ORDERS_LIST } from '@/config/api-path'
import styles from './_styles/OrderHistoryPage.module.css'
import { useAuth } from '@/context/auth-context'

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { auth } = useAuth()
  const [filterStatus, setFilterStatus] = useState('全部')
  const statusOptions = ['全部', '已完成', '處理中', '已取消']
  const filteredOrders =
    filterStatus === '全部'
      ? orders
      : orders.filter((order) => order.status === filterStatus)

  //   const memberId = 4 // ✅ 假設是已登入的使用者 ID，正式環境記得從 token 拿

  useEffect(() => {
    console.log('auth:', auth)
    const fetchOrders = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem('auth'))
        const memberId = auth?.id // 從 auth context 取得會員 ID
        console.log('memberId:', memberId)
        const res = await fetch(
          HISTORY_ORDERS_LIST.replace(':memberId', memberId)
        )
        if (!res.ok) throw new Error(`HTTP 錯誤狀態：${res.status}`)
        const rawData = await res.json()

        // 🔁 轉換格式成你要的樣子
        const formatted = rawData.map((order) => ({
          id: order.order_id,
          date: new Date(order.added_at).toISOString().split('T')[0],
          total: order.items.reduce((sum, i) => sum + Number(i.total_price), 0),
          status: mapOrderStatus(order.status, order.payment_status),
          pickup_method: order.pickup_method,
          items: order.items.map((i) => ({
            name: i.product_name || '商品名稱',
            quantity: i.quantity,
            price: i.price,
            rental_start_date: i.rental_start_date,
            rental_end_date: i.rental_end_date,
          })),
        }))

        setOrders(formatted)
      } catch (err) {
        console.error('拉訂單失敗：', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [auth])

  const mapOrderStatus = (status, paymentStatus) => {
    if (status === '已歸還') return '已完成'
    if (paymentStatus === '已退款') return '已取消'
    if (status === '已下單' || status === '租賃中') return '處理中'
    if (paymentStatus === '退款中' || paymentStatus === '已退款')
      return '已取消'
    return '處理中'
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>我的訂單紀錄</h1>

      <div className={styles.filterButtons}>
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`${styles.filterButton} ${
              filterStatus === status ? styles.active : ''
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      {loading ? <p>載入中...</p> : <OrderList orders={filteredOrders} />}
    </div>
  )
}

export default OrderHistoryPage
