import React from 'react'
import ProductCard from './ProductCard'
import styles from './_styles/ProductGrid.module.css'

const products = [
  {
    id: 1,
    name: '拳擊手套',
    price: '45.00NTD/day',
    description: '高品質拳擊手套，適合訓練或比賽。',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 2,
    name: '拳擊手套',
    price: '45.00NTD/day',
    description: '高品質拳擊手套，適合訓練或比賽。',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 3,
    name: '拳擊手套',
    price: '45.00NTD/day',
    description: '高品質拳擊手套，適合訓練或比賽。',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 4,
    name: '拳擊手套',
    price: '45.00NTD/day',
    description: '高品質拳擊手套，適合訓練或比賽。',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 5,
    name: '拳擊手套',
    price: '45.00NTD/day',
    description: '高品質拳擊手套，適合訓練或比賽。',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 6,
    name: '拳擊手套',
    price: '45.00NTD/day',
    description: '高品質拳擊手套，適合訓練或比賽。',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 7,
    name: '拳擊手套',
    price: '45.00NTD/day',
    description: '高品質拳擊手套，適合訓練或比賽。',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 8,
    name: '拳擊手套',
    price: '45.00NTD/day',
    description: '高品質拳擊手套，適合訓練或比賽。',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  },
  {
    id: 9,
    name: '拳擊手套',
    price: '45.00NTD/day',
    description: '高品質拳擊手套，適合訓練或比賽。',
    image:
      "/img/products.jpg",
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f88f917d01813c0c86813110ff466a6d338f1aec9e7e6c90992cb541f1431c21?placeholderIfAbsent=true',
    variant: 'dark',
  }
]

const ProductGrid = () => {
  return (
    <section className={styles.productGrid}>
      {/* <img src="/img/contentBackground2.jpg" alt="content Background" /> */}
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  )
}

export default ProductGrid
