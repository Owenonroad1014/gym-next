import React from 'react'
import ProductCard from './ProductCard'
import styles from './_styles/ProductGrid.module.css'
import Pagination from "./Pagination";
import { useState, useEffect} from "react";
import Sort from "./sort";
import { PRODUCTS_LIST , IMG_PATH} from "@/config/api-path";
import { useRouter, useSearchParams } from "next/navigation";




// const products = [
//   {
//     id: 1,
//     name: '拳擊手套',
//     price: '45元/天',
//     description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽',
//     image:
//       "/img/products.jpg",
//     icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
//     variant: 'dark',
//   },


const ProductGrid = () => {

  const searchParams = useSearchParams();

  const [Products, setProducts] = useState({
    success: false,
    perPage: 0,
    totalRows: 0,
    totalPages: 0,
    page: 0,
    rows: [],
    keyword: "",
  });
  
  useEffect(() => {
    fetch(`${PRODUCTS_LIST}${location.search}`)
    .then((r) => r.json())
      .then((obj) => {
        console.log(obj);
        if (obj.success) {
          setProducts(obj);
        }
      });
  }, [searchParams]);

  return (
    <section className={styles.productGrid}>
          <Sort />
          <div className={styles.productArea}>
          <div className={styles.productItem}>
              {Products.rows.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
              </div>
              <div>
                    <Pagination {...Products}
                    />
              </div>

          </div>
    </section>
  )
}

export default ProductGrid
