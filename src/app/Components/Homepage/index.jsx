"use client";

import styles from './Homepage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  return(
    <div className={styles.container}>
      
      {/* Header Home Mobile */}

      <header className={styles.headerGradient}></header>

      <header className={styles.headerMobile}>

        <div className={styles.right}>
          <Image
            className={styles.logo}
            src="/logos/pngBRANCO.png"
            alt="Logo"
            width={120}  
            height={60}
            priority
            quality={100} 
            style={{ objectFit: "contain" }} 
            unoptimized
          />
          </div>

          <div className={styles.left}>
            <div className={styles.searchBox}>
                <Image
                  src="/symbols/searchWhite.svg"
                  alt="Buscar"
                  width={18}
                  height={18}
                  style={{ marginRight: "0.4rem" }}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.searchInput}
                />
              </div>

        </div>
        </header>

      {/* Banner Desktop */}

      <div className={styles.bannerDesktop}>

        <div className={styles.boxBanner}>  
          <Image
              src="/placeholders/bannerHome.jpg"
              alt="Banner Home"
              width={1800}
              height={650}
              priority
              className={styles.imageBanner}
            />
          </div>

        <div className={styles.textBox}>
          <h1> NIKE TOTAL 90 <br/> REISSUE <br/> BRAZIL 2004 </h1>
          <p> Icônica, Atemporal </p>
          <button className={styles.shopNowBtn}>
            <Link href="/products">Ver Mais</Link>
            <Image src="/symbols/next.png" alt="Seta para direita" width={20} height={20} />
          </button>
        </div> 
      </div>

      {/* Banner Mobile */}
      <div className={styles.bannerMobile}>
        <div className={styles.boxBanner}>  
          <Image
            src="/placeholders/bannerHomeMobile.jpg"
            alt="Banner Home"
            width={450}
            height={450}
            priority
            quality={100}
            style={{ objectFit: "cover" }}
            unoptimized
            className={styles.imageBanner}
          />

          <div className={styles.textOverlay}>
            <h1 className={styles.bannerTitle}>
              NIKE TOTAL 90 <br /> REISSUE <br /> BRAZIL 2004
            </h1>
            <p className={styles.bannerSubtitle}>Icônica, Atemporal</p>

            <Link href="/products">
              <button className={styles.shopNowBtn}>
                Ver Mais
                <Image
                  src="/symbols/arrow-right-white.svg"
                  alt="Seta para direita"
                  width={20}
                  height={20}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Marcas */}
      <div className={styles.brands}>
        <Image
          src="/symbols/adidas.svg"
          alt="Adidas"
          width={180}
          height={80}
          className={styles.brandLogo}
        />
        <Image
          src="/symbols/nike.svg" 
          alt="Nike"
          width={180}
          height={80}
          className={styles.brandLogo}
        />
        <Image
          src="/symbols/bape.svg" 
          alt="Nike"
          width={180}
          height={80}
          className={styles.brandLogo}
        />
        <Image
          src="/symbols/newbalance.svg" 
          alt="Nike"
          width={180}
          height={80}
          className={styles.brandLogo}
        />
      </div>

      {/* Sneakers em Destaque Section */}
      <div className={styles.featuredSection}>

        {/* Title */}
        <h2 className={styles.sectionTitle}><span>Sneakers</span> em Destaque</h2>

        {/* Products Grid */}
        <div className={styles.productsGrid}>

          <div className={styles.productCard}>
            <Image
              src="/produtos/shoxIcon.jpg"
              alt="Sneaker 1"
              width={120}
              height={60}
              className={styles.productImage}
            />

            <div className={styles.productInfo}>
              <span className={styles.productBrand}>NIKE</span>
              <h3 className={styles.productName}>SHOX TL "SUNRISE"</h3>
            </div>
          </div>
          
          <div className={styles.productCard}>
            <Image
              src="/produtos/shoxIcon.jpg"
              alt="Sneaker 1"
              width={120}
              height={60}
              className={styles.productImage}
            />

            <div className={styles.productInfo}>
              <span className={styles.productBrand}>NIKE</span>
              <h3 className={styles.productName}>SHOX TL "SUNRISE"</h3>
            </div>
          </div>

          <div className={styles.productCard}>
            <Image
              src="/produtos/shoxIcon.jpg"
              alt="Sneaker 1"
              width={120}
              height={60}
              className={styles.productImage}
            />

            <div className={styles.productInfo}>
              <span className={styles.productBrand}>NIKE</span>
              <h3 className={styles.productName}>SHOX TL "SUNRISE"</h3>
            </div>
          </div>

          <div className={styles.productCard}>
            <Image
              src="/produtos/shoxIcon.jpg"
              alt="Sneaker 1"
              width={120}
              height={60}
              className={styles.productImage}
            />

            <div className={styles.productInfo}>
              <span className={styles.productBrand}>NIKE</span>
              <h3 className={styles.productName}>SHOX TL "SUNRISE"</h3>
            </div>
          </div>

          <div className={styles.productCard}>
            <Image
              src="/produtos/shoxIcon.jpg"
              alt="Sneaker 1"
              width={120}
              height={60}
              className={styles.productImage}
            />

            <div className={styles.productInfo}>
              <span className={styles.productBrand}>NIKE</span>
              <h3 className={styles.productName}>SHOX TL "SUNRISE"</h3>
            </div>
          </div>

          <div className={styles.productCard}>
            <Image
              src="/produtos/shoxIcon.jpg"
              alt="Sneaker 1"
              width={120}
              height={60}
              className={styles.productImage}
            />

            <div className={styles.productInfo}>
              <span className={styles.productBrand}>NIKE</span>
              <h3 className={styles.productName}>SHOX TL "SUNRISE"</h3>
            </div>
          </div>
          
        </div>

        </div>

    </div>
  )
}