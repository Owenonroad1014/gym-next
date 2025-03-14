"use client";
import React from "react";
import styles from "./_components/_styles/ProductDetail.module.css";
import QuantitySelector from "./_components/QuantitySelector";
import RelatedProducts from "./_components/RelatedProducts";
import { FaRegHeart } from "react-icons/fa";
import Breadcrumb from "./_components/breadcrumb";


const ProductDetail = () => {
  return (
    <main className={styles.container}>
      <Breadcrumb />
      <section className={styles.productSection}>
        <img
          src="/img/products.jpg"
          alt="Boxing Gloves"
          className={styles.productImage}
        />
        <article className={styles.productInfo}>
          <h1 className={styles.productTitle}>拳擊手套</h1>
          <hr className={styles.divider} />
          <p className={styles.productPrice}>45元/天</p>
          <p className={styles.productDescription}>
            高品質拳擊手套，適合拳擊訓練或比賽。高品質拳擊手套，適合拳擊訓練或比賽。高品質拳擊手套，適合拳擊訓練或比賽。高品質拳擊手套，適合拳擊訓練或比賽。
          </p>
          <div className={styles.selectionContainer}>
            <div className={styles.quantityWrapper}>
              <div className={styles.quantityLabels}>
                <div className={styles.label}>租借天數</div>
                <div className={styles.label}>租借數量</div>
              </div>
              <div className={styles.quantityControls}>
                <QuantitySelector />
                <QuantitySelector />
              </div>
            </div>
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
