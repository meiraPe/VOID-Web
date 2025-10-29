"use client";

import { useEffect, useState } from "react";
import styles from "./Cartoes.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cartoes() {
  const router = useRouter();
  const [cards, setCards] = useState([
    { id: 1, number: "**** **** **** 1234", brand: "mastercard" },
    { id: 2, number: "**** **** **** 5432", brand: "mastercard" },
    { id: 3, number: "**** **** **** 8869", brand: "visa" },
  ]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.leftGroup}>
          <button className={styles.backBtn}>
            <Image
              src="/symbols/nav-arrow-left.svg"
              alt="Voltar"
              width={20}
              height={20}
            />
          </button>
          <span className={styles.title}>Meus Cartões</span>
        </div>
        <Image
          className={styles.logo}
          src="/logos/pngPRETO.png"
          alt="Void Logo"
          width={110}
          height={40}
        />
      </header>

      {/* Conteúdo principal */}
      <section className={styles.content}>
        <h2 className={styles.subtitle}>Cartões Cadastrados</h2>
        <div className={styles.cardList}>
          {cards.map((card) => (
            <div key={card.id} className={styles.card}>
              <span className={styles.cardNumber}>{card.number}</span>
            </div>
          ))}
        </div>
        <button className={styles.addButton}>Adicionar Novo Cartão</button>
      </section>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <h2>COMPRE E VENDA COM MAIOR COMODIDADE</h2>
        <div className={styles.stores}>
          <Link href="#">
            <Image
              src="/placeholders/googleplay.png"
              alt="Google Play"
              width={140}
              height={42}
            />
          </Link>
          <Link href="#">
            <Image
              src="/placeholders/appstore.png"
              alt="Apple Store"
              width={140}
              height={42}
            />
          </Link>
        </div>
        <div className={styles.mockups}>
          <Image
            src="/placeholders/mockup1.png"
            alt="App Mockup 1"
            width={300}
            height={190}
            priority
          />
        </div>
      </footer>
    </div>
  );
}
