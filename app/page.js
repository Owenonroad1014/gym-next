
import Hyperspeed from './_components/hy';
import styles from '../styles/home.module.css'
import HeroSection from './_components/hero-section';
import Features from './_components/features-section';
import ClassSection from './_components/friends-section';
import LocationSection from './_components/location-section';
import ProductSection from './_components/product-section';


export default function Home() {
  return (
    <>
     
      {/* <div className={styles.banner}>
      <Hyperspeed />
      
      </div> */}
      
      <HeroSection/>
      <Features/>

      <ProductSection/>
      <ClassSection/>
      <LocationSection/>
      
      </>
  )
}
