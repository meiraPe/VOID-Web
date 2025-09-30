"use client";

import styles from './Sacola.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sacola() {
  const router = useRouter();

  return (
    <div className={styles.container}>

      {/* Header Mobile */}
      <header className={styles.headerMobile}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
          </button>
          <span className={styles.headerTitle}>Sua Sacola</span>
        </div>
        <Image className={styles.logo} src="/logos/pngPRETO.png" alt="Void Logo" width={110} height={40} />
      </header>

      {/* Header Desktop */}
      <div className={styles.headerDesktop}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
        </button>
        <h1 className={styles.headerTitle}>Sua Sacola</h1>
      </div>

      {/* Sacola */}
      <section className={styles.sacolaContainer}>

        {/* Compras Pendentes */}
        <div className={styles.sectionPending}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionDivider}></div>
            <h1>COMPRAS PENDENTES</h1>
            <div className={styles.sectionDivider}></div>
          </div>

          <div className={styles.productsList}>
            <div className={styles.productCard}>
              <Image 
                src="/produtos/CamisaBranca.png" 
                alt="Camisa Branca" 
                width={130} 
                height={130} 
              />   

              <div className={styles.productDetails}>
                <h2>Camiseta Cold Blanks<br />Heavy Oversized Off</h2>
                <p>Bege</p>
                <div className={styles.productSize}>
                  <span>P</span>
                </div>
              </div>

              <div className={styles.productPayment}>
                <div className={`${styles.paymentStatus} ${styles.pending}`}>
                  <h3>INICIADO</h3>
                </div>

                <div className={styles.productPrice}>
                  <p>R$</p>
                  <h2>89,00</h2>
                </div> 

                <p className={styles.orderId}>PEDIDO #00001</p>

                <div className={styles.productActions}>
                  <Link href="/checkout">
                    <button className={styles.actionBtn}>CONTINUAR COMPRA
                    <Image className={styles.arrow} src="/symbols/arrow-right-white.svg" alt="Continuar" width={20} height={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compras Pagas */}
        <div className={styles.sectionPaid}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionDivider}></div>
            <h1>COMPRAS PAGAS</h1>
            <div className={styles.sectionDivider}></div>
          </div>

          <div className={styles.productsList}>
            <div className={styles.productCard}>
              <Image 
                src="/produtos/CamisaPreta.png" 
                alt="Camisa Preta" 
                width={130} 
                height={130} 
              />   

              <div className={styles.productDetails}>
                <h2>Camiseta Cold Blanks<br />Heavy Oversized Off</h2>
                <p>Preto</p>
                <div className={styles.productSize}>
                  <span>GG</span>
                </div>
              </div>

              <div className={styles.productPayment}>
                <div className={`${styles.paymentStatus} ${styles.paid}`}>
                  <h3>PAGO</h3>
                </div>

                <div className={styles.productPrice}>
                  <p>R$</p>
                  <h2>89,00</h2>
                </div>

                <p className={styles.orderId}>PEDIDO #00002</p>

                <div className={styles.productActions}>

                 <Link href="/checkout">
                 <button className={styles.actionBtn}>MONITORAR COMPRA
                  <Image className={styles.arrow} src="/symbols/arrow-right-white.svg" alt="Continuar" width={20} height={20} />
                 </button>
                 </Link>

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Rodapé Mobile */}
      <footer className={styles.footer}>
        <h2>COMPRE E VENDA COM MAIOR COMODIDADE</h2>
        <div className={styles.storeLinks}>
          <Link href="#"><Image src="/placeholders/googleplay.png" alt="Google Play" width={140} height={42} /></Link>
          <Link href="#"><Image src="/placeholders/appstore.png" alt="Apple Store" width={140} height={42} /></Link>
        </div>
        <div className={styles.appMockups}>
          <Image src="/placeholders/mockup1.png" alt="App Mockup 1" width={300} height={190} priority />
        </div>
      </footer>

    </div>
  );
}
