import React from "react";
import styles from "./_styles/ProductDetail.module.css";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const RelatedProducts = () => {
  // function SampleNextArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={classname}
  //       style={{ ...style, display: "block", background: "#f87808",borderRadius: "50%" }}
  //       onClick={onClick}
  //     />
  //   );
  // }
  
  // function SamplePrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "#f87808" ,borderRadius: "50%"}}
  //       onClick={onClick}
  //     />
  //   );
  // }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const products = [
    {
      id: 1,
      name: '拳擊手套',
      price: '45元/天',
      description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽。',
      image:
        "/img/products.jpg",
      variant: 'dark',
    },
    {
      id: 2,
      name: '拳擊手套',
      price: '45元/天',
      description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽。',
      image:
        "/img/products.jpg",
      variant: 'dark',
    },
    {
      id: 3,
      name: '拳擊手套',
      price: '45元/天',
      description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽。',
      image:
        "/img/products.jpg",
      variant: 'dark',
    },
    {
      id: 4,
      name: '拳擊手套',
      price: '45元/天',
      description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽。',
      image:
        "/img/products.jpg",
      variant: 'dark',
    }]

  return (
    <section className={styles.relatedProducts}>
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id} className={styles.slideItem}>
                <ProductCard key={product.id} {...product} />
        </div>
              ))}
      </Slider>      
    </section>
  );
};

export default RelatedProducts;
