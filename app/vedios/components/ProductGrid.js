import React from 'react'
import ProductCard from './ProductCard';
import styles from './_styles/ProductGrid.module.css'
import Pagination from "./Pagination";
import { useState } from 'react';
import Sort from "./sort";




const products = [
  {
    id: 1,
    name: '拳擊手套',
    price: '45元/天',
    description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 2,
    name: '拳擊手套',
    price: '45元/天',
    description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 3,
    name: '拳擊手套',
    price: '45元/天',
    description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 4,
    name: '拳擊手套',
    price: '45元/天',
    description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 5,
    name: '拳擊手套',
    price: '45元/天',
    description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 6,
    name: '拳擊手套',
    price: '45元/天',
    description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 7,
    name: '拳擊手套',
    price: '45元/天',
    description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 8,
    name: '拳擊手套',
    price: '45元/天',
    description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  }
]


const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  return (
    <>
    <section className={styles.productGrid}>
          <Sort />
          <div className={styles.productArea}>
          <div className={styles.productItem}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
              </div>
              <div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
              </div>

          </div>
    </section>
    </>
  )
}

export default ProductGrid
