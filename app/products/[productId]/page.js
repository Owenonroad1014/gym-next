"use client";
import {useEffect, useState} from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./_components/_styles/ProductDetail.module.css";
import QuantitySelector from "./_components/QuantitySelector";
import RelatedProducts from "./_components/RelatedProducts";
import { FaRegHeart } from "react-icons/fa";
import Breadcrumb from "./_components/breadcrumb";
import { PRODUCTS_LIST, IMG_PATH } from "@/config/api-path";
import RentalDate from "./_components/rental-date";


const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({}); // 存商品資料
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    console.log(params);
    const productId = params.productId;
    if (!productId) {
      router.push("/products"); // 沒給 productId, 跳到列表頁
      return;
    }
    fetch(`${PRODUCTS_LIST}/${productId}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          // 排除不要的欄位資料
          const { id, product_name, description, price, image_url, average_rating, variants,category_name } = result.data;
          setProduct({ id, product_name, description, price, image_url, average_rating, variants, category_name});

          const newBreadcrumbs = [
            { label: "首頁", link: "/" },
            { label: "商品列表", link: "/products" },
            { label: category_name, link: `/products/?category_name=${category_name}`},
            { label: product_name, link: null },
          ];
          setBreadcrumbs(newBreadcrumbs);

        } else {
          router.push("/products"); // API 回傳錯誤，導回列表
        }
      });
  }, []);


  return (
    <main className={styles.container}>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <section className={styles.productSection}>
        <img
          src={`${IMG_PATH}/${product.image_url}`}
          alt="Boxing Gloves"
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
            <RentalDate price={product.price} {...product}/>
              <div className={styles.quantityLabels}>
              </div>
            </div>
          
          <div className={styles.quantityWrapper}>
          <div className={styles.label}>租借數量 :</div>
          <QuantitySelector />
          </div>
          <div className={styles.cartActions}>
          <button className={styles.addToCartButton}>加入購物車</button>
          <FaRegHeart className={styles.heart}/>
          </div>

          
        </article>
      </section>

      <div className={styles.relatedTitle}>相關商品
      <hr className={styles.divider} />
      </div>
      <RelatedProducts />
    </main>
  );
};

export default ProductDetail;
