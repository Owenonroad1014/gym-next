'use client'
import React, { useState } from 'react'
import styles from '../_styles/OrderHistoryPage.module.css'
//import { ORDERS_CANCEL } from '@/config/api-path'

const getStatusClass = (status) => {
  switch (status) {
    case '已完成':
      return styles['status-complete']
    case '處理中':
      return styles['status-processing']
    case '已取消':
      return styles['status-cancelled']
    default:
      return ''
  }
}
const handleCancelOrder = async (orderId) => {
  const confirmed = window.confirm('確定要取消這筆訂單嗎？')
  if (!confirmed) return

  try {
    const res = await fetch(`/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error('取消失敗')
    }

    alert('訂單已取消')
    // 可以選擇重新整理訂單列表或用 setState 更新該筆訂單的狀態
    // 這邊範例假設你用 props.orders 傳進來，要配合 props 更新才會刷新
    window.location.reload()
  } catch (err) {
    console.error(err)
    alert('取消訂單時發生錯誤')
  }
}

const OrderList = ({ orders }) => {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>日期</th>
          <th>總金額</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <React.Fragment key={order.id}>
            <tr
              onClick={() => toggleExpand(order.id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>${order.total}</td>
              <td className={getStatusClass(order.status)}>{order.status}</td>
            </tr>
            {expandedId === order.id && (
              <tr>
                <td colSpan="4">
                  <div className={styles.detailBox}>
                    <h4>訂單明細</h4>
                    <p>
                      <strong>取貨方式：</strong>
                      {order.pickup_method}
                    </p>
                    <ul className={styles.itemList}>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          <div>
                            {item.name} × {item.quantity}（商品單價 $
                            {item.price}）
                          </div>
                          <div>
                            租借期間：
                            {new Date(
                              item.rental_start_date
                            ).toLocaleDateString()}{' '}
                            ～{' '}
                            {new Date(
                              item.rental_end_date
                            ).toLocaleDateString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                    {/* ✅ 加入取消訂單按鈕，狀態為處理中才能取消 */}
                    {order.status === '處理中' && (
                      <button
                        className={styles.cancelButton}
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        取消訂單
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default OrderList
