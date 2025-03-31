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


const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({}); // 存商品資料
  const [relatedProducts, setRelatedProducts] = useState([]); // 新增狀態
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [likeId, setLikeId] = useState(false); // 新增狀態
  const { auth, getAuthHeader } = useAuth()
  const [quantity, setQuantity] = useState(1);
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const MySwal = withReactContent(Swal);
  const { addToCart } = useCart()


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

          if (variants !== null) {
            setSelectedWeight(variants[0].variant_id);
          }
        } else {
          router.push("/products");
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
  document.body.style.overflow = 'hidden'
  const handleAddToCart = () => {
    if (!selectedWeight) {
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

    const selectedVariant = product.variants.find((variant) => variant.variant_id == selectedWeight);

    const cartItem = {
      id: product.id,
      name: product.product_name,
      image: product.image_url,
      price: product.price,
      weight: selectedVariant ? `${selectedVariant.weight} 公斤` : "N/A",
      quantity,
      rentalStartDate,
      rentalEndDate,
    };

    addToCart(cartItem);

    MySwal.fire({
      title: "成功加入購物車!",
      text: `${product.product_name} 已加入購物車!`,
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: '#f87808',
      cancelButtonColor: '#0b3760',
    });

};

  return (
    <main className={styles.container}>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
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
          <hr className={styles.divider} />
          <p className={styles.productDescription}>
          {product.description}
          </p>
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
          <FavoriteBbutton product_id={product.id} likeId={likeId}/>
          <button className={styles.addToCartButton} onClick={handleAddToCart}>加入購物車</button>

          </div>

          
        </article>
      </section>

      <div className={styles.relatedTitle}>相關商品
      <hr className={styles.divider} />
      </div>
      <RelatedProducts products={relatedProducts}/>
    </main>
  );
};

export default ProductDetail;
