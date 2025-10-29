"use client";

import { useState } from "react";
import styles from "./Cartoes.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cartoes() {
    const router = useRouter();
    const [showBox, setShowBox] = useState(false);
    
  const [cards] = useState([
    { id: 1, number: "**** **** **** 1234", brand: "mastercard" },
    { id: 2, number: "**** **** **** 5432", brand: "mastercard" },
    { id: 3, number: "**** **** **** 8869", brand: "visa" },
  ]);

  const handleBack = () => router.back();


  return (
    <div className={styles.pageContainer}>
    <div className={styles.headerContainer}>
      <header className={styles.headerMobile}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
          </button>
          <span className={styles.headerTitle}>Cartões</span>
        </div>
      </header>

      {/* Header Desktop */}
      <div className={styles.headerDesktop}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
        </button>
        <h1 className={styles.headerTitle}>Cartões</h1>
      </div>
    </div>
    

    <div className={styles.container}>
      {/* Conteúdo principal */}
      <section className={styles.content}>
        <h2 className={styles.subtitle}>CARTÕES CADASTRADOS</h2>

        <div className={styles.cardList}>
          {cards.map((card) => (
            <div key={card.id} className={styles.card}>
              <span className={styles.cardNumber}>{card.number}</span>
              <Image
                src={
                  card.brand === "visa"
                    ? "/symbols/visa-logo.png"
                    : "/symbols/mastercard-logo.png"
                }
                alt={card.brand}
                width={45}
                height={30}
                className={styles.cardIcon}
              />
            </div>
          ))}
        </div>

        <p className={styles.editText}>EDITAR CARTÕES CADASTRADOS</p>

        <button className={styles.addButton}>
          ADICIONAR CARTÃO
        </button>
      </section>

      {/* Footer (mobile only) */}
      <footer className={styles.footer}>
        <h2>COMPRE E VENDA COM MAIOR COMODIDADE</h2>
        <div className={styles.stores}>
          <Link href="#">
            <Image
              src="/placeholders/googleplay.png"
              alt="Google Play"
              width={130}
              height={40}
            />
          </Link>
          <Link href="#">
            <Image
              src="/placeholders/appstore.png"
              alt="Apple Store"
              width={130}
              height={40}
            />
          </Link>
        </div>
        <div className={styles.mockups}>
          <Image
            src="/placeholders/mockup1.png"
            alt="App Mockup 1"
            width={260}
            height={160}
            priority
          />
        </div>
      </footer>
    </div>
  </div>
  );
}
