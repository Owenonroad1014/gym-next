'use client'
import React, { useState } from 'react'
import styles from '../_styles/OrderHistoryPage.module.css'

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
                    <p><strong>取貨方式：</strong>{order.pickup_method}</p>
                    <ul className={styles.itemList}>
                      {order.items.map((item, index) => (
                        <li key={index}>
                        <div>
                {item.name} × {item.quantity}（商品單價 ${item.price}）
              </div>
              <div>
                租借期間：{new Date(item.rental_start_date).toLocaleDateString()} ～ {new Date(item.rental_end_date).toLocaleDateString()}
              </div>
                        </li>
                      ))}
                    </ul>
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
