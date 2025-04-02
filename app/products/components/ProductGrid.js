import React from 'react'
import ProductCard from './ProductCard'
import styles from './_styles/ProductGrid.module.css'
import Pagination from "./Pagination";
import { useState, useEffect} from "react";
import Sort from "./sort";
import { PRODUCTS_LIST } from "@/config/api-path";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import loaderStyle from '@/app/_components/_styles/loading.module.css'

const ProductGrid = () => {
  const { auth, getAuthHeader } = useAuth()
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isloading, setIsloading] = useState(true)
  const [Products, setProducts] = useState({
    success: false,
    perPage: 0,
    totalRows: 0,
    totalPages: 0,
    page: 0,
    rows: [],
    keyword: ""
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const headers = auth ? { ...getAuthHeader() } : {}
        const res = await fetch(`${PRODUCTS_LIST}${location.search}`, {
          headers,
        });
        const obj = await res.json();
        console.log("後端回傳的商品列表:", obj);

        if (obj.success) {
          setProducts(obj || {});
          setIsloading(false)
        }
      } catch (error) {
        console.error("獲取商品列表錯誤:", error);
        setIsloading(false)
      }
    };

    fetchProducts();
  }, [auth, getAuthHeader, searchParams, isLiked]);

  if (isloading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={loaderStyle.loader}></div>
      </div>
    );
  }

  return (
    <section className={styles.productGrid}>
      <Sort router={router}/>
      <div className={styles.productArea}>
        {Products.rows.length > 0 ? (
          <>
            <div className={styles.productItem}>
              {Products.rows.map((product) => (
                <ProductCard key={product.id} {...product} setIsLiked={setIsLiked} />
              ))}
            </div>
            <div className={styles.paginationWrapper}>
              <Pagination {...Products} searchParams={searchParams} />
            </div>
          </>
        ) : (
          <div className={styles.noProducts}>
            查無該商品
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid
