"use client";
import React from "react";
import styles from "./_styles/button.module.css";
import Link from "next/link";
import { ORDERS_LIST } from "@/config/api-path";

export default function Button({ isFormValid, setIsSubmitted, customerInfo }) 
{
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // **按下送出時，觸發 isSubmitted 變成 true**
    // alert("QQ")
    // if (!isFormValid) {
    //   alert("請確認表單填寫正確！");
    // } else {
    //   alert("表單提交成功！");
    // }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const pickupStore = localStorage.getItem("pickupStore") || "未選擇";
    const paymentMethod = localStorage.getItem("paymentMethod") || "未選擇";

    if (cartItems.length === 0) {
      alert("購物車是空的，無法送出訂單！");
      return;
    }

    // 整合訂單資料
    const orderData = {
      items: cartItems,
      paymentMethod,
      pickupStore,
      customerInfo, // 來自表單
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch(ORDERS_LIST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      // const contentType = response.headers.get("content-type");
      if (!response.ok) {
        throw new Error("訂單提交失敗：" + response.status);
      }
      const result =await response.json()
      console.log(result);
      
    //   **確保回傳的是 JSON**
    //   if (contentType && contentType.includes("application/json")) {
    //     const result = await response.json();
    //     localStorage.setItem("lastOrderId", result.orderId);
    //     localStorage.removeItem("cart"); 
    //     window.location.href = "/complete";
    //   } else {
    //     throw new Error("後端沒有回傳 JSON，請檢查 API");
    //   }
    // } catch (error) {
    //   console.error("提交訂單時發生錯誤：", error);
    //   alert("訂單提交失敗，請稍後再試！");
    // }
    localStorage.setItem("lastOrderId", result.orderId);
    localStorage.removeItem("cart");
    window.location.href = "/complete";
  } catch (error) {
    console.error("提交訂單時發生錯誤：", error);
    alert("訂單提交失敗，請稍後再試！");
  }
};

  return (
    <div className={styles.container}>
      <Link href="/carts">
        <button className={styles.pseudo}>
          <span>回上一頁</span>
        </button>
      </Link>

      <button className={styles.pseudo2} onClick={handleSubmit} disabled1={!isFormValid}>
        <span>送出訂單</span>
      </button>
    </div>
  );
}
