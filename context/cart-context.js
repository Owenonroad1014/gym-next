'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

// 創建 Context
const CartContext = createContext()

//配合瀏覽器上的react devtools可以看到名稱，方便除錯用
CartContext.displayName = 'CartContext'

//建立一個Provider元件，自訂這個勾子所需的context用的狀態值
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    // {
    //   id: 1,
    //   name: '飛輪健身車',
    //   weight: '5kg',
    //   price: 500,
    //   quantity: 1,
    //   image: '/cart-img/飛輪車.jpg',
    //   rentalStartDate: "", // 新增租借開始日期
    //   rentalEndDate: "",   // 新增租借結束日期
    // },
    // {
    //   id: 2,
    //   name: '啞鈴組合',
    //   weight: '10kg',
    //   price: 800,
    //   quantity: 1,
    //   image: '/cart-img/啞鈴.jpg',
    //   rentalStartDate: "",
    //   rentalEndDate: "",
    // },
  ]);
  const [paymentMethod, setPaymentMethod] = useState(""); // 付款方式
  const [pickupMethod, setPickupMethod] = useState(""); // 取貨方式
  const [cartQuantity, setCartQuantity] = useState(0);
  // 記錄首次渲染是否完成的信號值
  const [didMount, setDidMount] = useState(false)
  

   // 首次渲染時，從 LocalStorage 取出購物車資料
   useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('gym_cart')) || [];
    const savedPaymentMethod = localStorage.getItem('paymentMethod') || "";
    const savedPickupMethod = localStorage.getItem('pickupMethod') || "";

    setCartItems(savedCart);
    setPaymentMethod(savedPaymentMethod);
    setPickupMethod(savedPickupMethod);
    setDidMount(true); // 標記初始化完成
  }, []);

  // 當購物車資料變更時，同步更新 LocalStorage
  useEffect(() => {
    if (didMount) {
      localStorage.setItem('gym_cart', JSON.stringify(cartItems))
      updateCartQuantity()}
  }, [cartItems, didMount])

  const updateCartQuantity = () => {
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    setCartQuantity(totalQuantity)
  }

  useEffect(() => {
    if (didMount) {
      localStorage.setItem('paymentMethod', paymentMethod);
    }
  }, [paymentMethod, didMount]);

  useEffect(() => {
    if (didMount) {
      localStorage.setItem('pickupMethod', pickupMethod);
    }
  }, [pickupMethod, didMount]);


  // 計算租借天數
  const calculateRentalDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 1; 
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1; 
  };


  // 計算購物車的總金額
  const subtotal = cartItems.reduce((acc, item) => {
    const rentalDays = calculateRentalDays(item.rentalStartDate, item.rentalEndDate);
    return acc + item.price * item.quantity * rentalDays
  }, 0);

  // 付款方式
  const updatePaymentMethod = (method) => {
    setPaymentMethod(method);
    localStorage.setItem('paymentMethod', method)
  };

  // 取貨方式
  const updatePickupMethod = (method) => {
    setPickupMethod(method);
    localStorage.setItem('pickupMethod', method)
  };

  // 更新購物車商品資訊（更新數量 & 租借日期）
  const updateCartItem = (productId, updatedData) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, ...updatedData } : item
      )
    );
  };

  //增加商品數量
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  //減少商品數量（最少 1）
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  //加入商品
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedCart;
  
      if (existingItem) {
        updatedCart = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }
  
      localStorage.setItem("gym_cart", JSON.stringify(updatedCart)); 
      return updatedCart;

    });
  
    setPaymentMethod(""); 
    setPickupMethod("");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("pickupMethod");
  };
  

  //移除商品
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== productId);
      localStorage.setItem('gym_cart', JSON.stringify(updatedCart)); // 立即更新 LocalStorage
      if (updatedCart.length === 0) {
        setPaymentMethod(""); 
        setPickupMethod("");
        localStorage.removeItem('paymentMethod');
        localStorage.removeItem('pickupMethod');
      }
      return updatedCart;
    });
  };


  return (
    <CartContext.Provider value={{ 
      cartItems,
      cartQuantity,
      subtotal,
      updateCartItem,
      increaseQuantity,
      decreaseQuantity,
      addToCart,
      removeFromCart, 
      paymentMethod,
      updatePaymentMethod,
      pickupMethod,
      updatePickupMethod}}>
      {children}
    </CartContext.Provider>
  );
}

// 自訂 Hook，讓其他組件更方便使用
export function useCart() {
  return useContext(CartContext)
}   