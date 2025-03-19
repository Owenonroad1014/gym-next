import React from 'react'
import ProductCard from './ProductCard'
import styles from './_styles/ProductGrid.module.css'
import Pagination from "./Pagination";
import { useState, useEffect} from "react";
import Sort from "./sort";
import { PRODUCTS_LIST } from "@/config/api-path";
import { useRouter, useSearchParams } from "next/navigation";


const ProductGrid = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
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
    fetch(`${PRODUCTS_LIST}${location.search}`)
    .then((r) => r.json())
      .then((obj) => {
        console.log(`${PRODUCTS_LIST}${location.search}`);
        if (obj.success) {
          setProducts(obj);
        }
      });
  }, [searchParams]);

  

  return (
    <section className={styles.productGrid}>
          <Sort router={router}/>
          <div className={styles.productArea}>
        
          <div className={styles.productItem}>
              {Products.rows.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
              </div>
              <div>
                    <Pagination {...Products} searchParams={searchParams}
                    />
              </div>

          </div>
    </section>
  )
}

export default ProductGrid
