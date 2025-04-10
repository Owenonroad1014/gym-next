'use client'
import React, { useState } from 'react'
import styles from '../_styles/OrderHistoryPage.module.css'
import { ORDERS_CANCEL } from '@/config/api-path'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
  const result = await MySwal.fire({
    title: '確定要取消這筆訂單嗎？',
    text: '取消後將無法恢復',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f87808',
    cancelButtonColor: '#eee',
    confirmButtonText: '確定取消',
    cancelButtonText: '我再想想',
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(`${ORDERS_CANCEL}/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('取消失敗');
    }

    await MySwal.fire({
      title: '已取消訂單',
      icon: 'success',
      confirmButtonColor: '#f87808',
      confirmButtonText: '確定',
    });

    window.location.reload();
  } catch (err) {
    console.error(err);
    await MySwal.fire({
      title: '錯誤',
      text: '取消訂單時發生錯誤',
      icon: 'error',
      confirmButtonText: '了解',
    });
  }
};


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
