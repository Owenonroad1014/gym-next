import React from "react";
import styles from "./_styles/ProductDetail.module.css";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const RelatedProducts = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerMode: true,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 680, settings: { slidesToShow: 1, slidesToScroll: 1 } ,centerMode: false},
    ],
  };

  console.log("接收到的 relatedProducts:", products);

  if (!products || products.length === 0) {
    return <p className={styles.noRelatedProducts}>目前沒有相關商品</p>;
  }

  return (
    <section className={styles.relatedProducts}>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className={styles.slideItem}>
            <ProductCard {...product} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default RelatedProducts;
