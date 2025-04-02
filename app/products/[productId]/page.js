"use client";
import {useEffect, useState} from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./_components/_styles/ProductDetail.module.css";
import QuantitySelector from "./_components/QuantitySelector";
import RelatedProducts from "./_components/RelatedProducts";
import Breadcrumb from "./_components/breadcrumb";
import { PRODUCTS_LIST, IMG_PATH } from "@/config/api-path";
import RentalDate from "./_components/rental-date";
import FavoriteBbutton from "./_components/favorite-button";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import ReviewList from "./_components/reviews";
import loaderStyle from '@/app/_components/_styles/loading.module.css'


const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({}); // 存商品資料
  const [relatedProducts, setRelatedProducts] = useState([]); // 新增狀態
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [likeId, setLikeId] = useState(false); // 新增狀態
  const { auth, getAuthHeader } = useAuth()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1);
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const MySwal = withReactContent(Swal);
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    console.log(params);
    const headers = auth ? { ...getAuthHeader() } : {}
    const productId = params.productId;
    if (!productId) {
      router.push("/products"); // 沒給 productId, 跳到列表頁
      return;
    }
    fetch(`${PRODUCTS_LIST}/${productId}`, {
      headers,
      })
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          // 排除不要的欄位資料
          const { id, product_name, description, price, image_url, average_rating, variants,category_name } = result.data;
          const relatedProducts = result.relatedProducts;
          setProduct({ id, product_name, description, price, image_url, average_rating, variants, category_name});
          setRelatedProducts(relatedProducts); // 設定相關商品
          setLikeId(result.like_id); // 設定收藏狀態

          const newBreadcrumbs = [
            { label: "首頁", link: "/" },
            { label: "商品列表", link: "/products" },
            { label: category_name, link: `/products/?category_name=${category_name}`},
            { label: product_name, link: null },
          ];
          setBreadcrumbs(newBreadcrumbs);
          setIsloading(false)

          if (variants !== null) {
            setSelectedWeight(variants[0].variant_id);
          }
        } else {
          router.push("/products");
          setIsloading(false)
        }
      });
  }, [auth, getAuthHeader, likeId]);

    // 儲存選擇的重量到本地端
    const handleWeightChange = (event) => {
      const variantId = event.target.value;
      setSelectedWeight(variantId);
      localStorage.setItem("selectedVariant", variantId);
    };

    // 更新數量
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  // 更新租借日期
  const handleRentalDateChange = (startDate, endDate) => {
    setRentalStartDate(startDate);
    setRentalEndDate(endDate);
  };

  // 加入購物車
  const handleAddToCart = () => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
    // 如果商品有重量變體但未選擇重量，顯示警告
    if (product.variants && product.variants.length > 0 && !selectedWeight) {
      MySwal.fire({
        title: "請選擇重量!",
        text: "請選擇商品的重量才能加入購物車。",
        icon: "warning",
        confirmButtonColor: '#f87808',
        cancelButtonColor: '#0b3760',
        didClose: () => {
          document.body.style.overflow = ''
        },
      });
      return;
    }

    if (!rentalStartDate || !rentalEndDate) {
      MySwal.fire({
        title: "請選擇租借日期!",
        text: "請選擇租借的開始與結束日期。",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#f87808',
        cancelButtonColor: '#0b3760',
      });
      return;
    }

    let weight = "N/A";
    if (product.variants) {
      const selectedVariant = product.variants.find((variant) => variant.variant_id == selectedWeight);
      if (selectedVariant) {
        weight = `${selectedVariant.weight} 公斤`;
      }
    }

    const cartItem = {
      id: product.id,
      name: product.product_name,
      image: product.image_url,
      price: product.price,
      weight,
      quantity,
      rentalStartDate,
      rentalEndDate,
    };

    addToCart(cartItem);
    toast.success(`${product.product_name} 已成功加入購物車!`);
    // MySwal.fire({
    //   title: "成功加入購物車!",
    //   text: `${product.product_name} 已加入購物車!`,
    //   icon: "success",
    //   showCancelButton: true,
    //   confirmButtonColor: '#f87808',
    //   cancelButtonColor: '#0b3760',
    // });

};

  const renderStars = (rating) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} color="#f87808" size={20} />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} color="#f87808" size={20} />);
      } else {
        stars.push(<FaRegStar key={i} color="#f87808" size={20} />);
      }
    }

    return stars;
  };


  const renderStar = (rating) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} color="#f87808" size={40} />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} color="#f87808" size={40} />);
      } else {
        stars.push(<FaRegStar key={i} color="#f87808" size={40} />);
      }
    }

    return stars;
  };

  if (isloading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={loaderStyle.loader}></div>
      </div>
    );
  }


  return (
    
<>
    <Breadcrumb breadcrumbs={breadcrumbs}/>
    <main className={styles.container}>
          <section className={styles.productSection}>
        <img
          src={`${IMG_PATH}/${product.image_url}`}
          alt={product.product_name}
          className={styles.productImage}
        />
        <article className={styles.productInfo}>
        <div className={styles.itemTitle}>
        <h1 className={styles.productTitle}>{product.product_name}</h1>
        <p className={styles.productPrice}>{product.price}元/天</p>
        </div>
          <hr className={styles.dividerOne} />
          <p className={styles.productDescription}>
          {product.description}
          </p>
          <div className={styles.rating}>
            {product.average_rating !== null ? (
              <>
                {renderStars(product.average_rating)}
                <span className ={styles.reviewCount}>({product.average_rating})</span>
              </>
            ) : ""
            }
          </div>
          
          <div className={styles.selectionContainer}>
          <RentalDate 
            price={product.price} 
            id={product.id} 
            rentalStartDate={rentalStartDate} 
            rentalEndDate={rentalEndDate} 
            onDateChange={handleRentalDateChange} />

              {/* <div className={styles.quantityLabels}>
              </div> */}
            </div>
  {product.variants && product.variants.length > 0 && (
  <div className={styles.weightSelector}>
    <label>選擇重量：</label>
    <select value={selectedWeight} onChange={handleWeightChange} className={styles.weightButton}>
      {product.variants.map(
        (variant) =>
          variant.weight !== null && (
            <option key={variant.variant_id} value={variant.variant_id} >
              {variant.weight} 公斤
            </option>
          )
      )}
    </select>
  </div>
)}
          <div className={styles.quantityWrapper}>
          <div className={styles.label}>租借數量 :</div>
          <QuantitySelector onQuantityChange={handleQuantityChange}/>
          </div>
          <div className={styles.cartActions}>
          <button className={styles.addToCartButton} onClick={handleAddToCart}>加入購物車</button>
          <FavoriteBbutton product_id={product.id} likeId={likeId}/>
          </div>

        </article>
      </section>
      {product.average_rating !== null && (
  <div className={styles.review}>
    <div className={styles.reviewTitle}>
      <p>商品評價&評論</p>
      <div className={styles.point}>{product.average_rating}</div>
      <div className={styles.ratings}>
        {renderStar(product.average_rating)}
        {product.average_rating > 0 && <span className={styles.reviewCounts}></span>}
      </div>
    </div>
    <ReviewList productId={product.id} />
  </div>
)}
      
      <div className={styles.relatedTitle}>相關商品
      </div>
      <hr className={styles.divider} />
      
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          fontSize: '14px',
          maxWidth: '90%',
          width: '300px',
          marginBottom: '20px',
        }}
        toastStyle={{
          backgroundColor: '#f87808',
          color: '#fff',
        }}
        progressStyle={{
          background: '#fff',
        }}
      />
      <RelatedProducts products={relatedProducts}/>
    </main>
    </>
  );
}


export default ProductDetail;