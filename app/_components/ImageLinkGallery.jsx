'use client'

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import "./_styles/ImageLinkGallery.css";

const ImageLinkGallery = ({ autoplay = true, pauseOnHover = false }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const images = [
    { url: "/img/Barbell.jpg", title: "槓鈴", link: "/products/2" },
    { url: "/img/yoga-wheel.jpg", title: "瑜珈輪", link: "/products/13" },
    { url: "/img/Boxing-gloves.jpg", title: "拳擊手套", link: "/products/16" },
    { url: "/img/HandGripStrengthener.jpg", title: "握力器", link: "/products/6" },
    { url: "/img/training-rope.jpg", title: "訓練繩", link: "/products/4" },
    { url: "/img/Kettlebell.jpg", title: "壺鈴", link: "/products/3" },
    { url: "/img/Boxing-Helmet.jpg", title: "拳擊頭盔", link: "/products/11" },
    { url: "/img/wheel.jpg", title: "健腹輪", link: "/products/10" },
    { url: "/img/Boxing-hand-straps.jpg", title: "手綁帶", link: "/products/19" },
    { url: "/img/dumbbel.jpg", title: "啞鈴", link: "/products/1" },
    { url: "/img/yoga-strap.jpg", title: "瑜珈繩", link: "/products/14" },
    { url: "/img/fitness-weight.jpg", title: "槓片", link: "/products/9" },
    { url: "/img/flat-bench.jpg", title: "平板健身椅", link: "/products/8" },
    { url: "/img/yoga-ball.jpg", title: "瑜珈球", link: "/products/15" },
  ];

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);
  const isMountedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!autoplay || !isMounted || isHovered) return;

    let animationFrame;
    let lastTime = performance.now();

    const animate = (time) => {
      if (!isMounted || isHovered) return;
      const delta = time - lastTime;
      lastTime = time;
      const step = 0.006;

      rotation.set(rotation.get() - delta * step);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [autoplay, isMounted, isHovered]);

  useEffect(() => {
    setIsScreenSizeSm(window.innerWidth <= 640);
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 2000 : 3400;
  const faceCount = images?.length || 0;
  const faceWidth = 250;
  const radius = cylinderWidth / (2 * Math.PI);
  const dragFactor = 0.05;

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`);

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1 },
    });
  };

  const handleClick = (link) => {
    if (link) router.push(link);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <motion.h2 
        className="title"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        精選商品
      </motion.h2>
      <div className="gallery-container">
        <div className="gallery-gradient gallery-gradient-left" />
        <div className="gallery-gradient gallery-gradient-right" />
        <div className="gallery-content">
          <motion.div
            drag="x"
            className="gallery-track"
            style={{
              transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            animate={controls}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {images.map(({ url, title, link }, i) => (
              <div
                key={i}
                className="gallery-item"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                  cursor: link ? "pointer" : "default",
                }}
                role={link ? "button" : undefined}
                tabIndex={link ? 0 : undefined}
                onClick={() => handleClick(link)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onKeyDown={(e) => {
                  if (link && (e.key === "Enter" || e.key === " ")) {
                    handleClick(link);
                  }
                }}
                aria-label={link ? `View ${title}` : undefined}
              >
                <div className="item">
                  <img src={url} alt={title || "gallery"} className="gallery-img" />
                  {title && <div className="gallery-title">{title}</div>}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

ImageLinkGallery.propTypes = {
  autoplay: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
};

export default ImageLinkGallery;
