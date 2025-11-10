"use client";

import { useState, useEffect } from "react";
import styles from "./Curtidas.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/app/data/products";

export default function Curtidas() {
  const router = useRouter();

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
     <div className={styles.container}>
      
       {/* Header Mobile */}
      <header className={styles.headerMobile}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
          </button>
          <span className={styles.headerTitle}>Curtidas</span>
        </div>

      </header>

      {/* Header Desktop */}
      <div className={styles.headerDesktop}>
        <button className={styles.backButton} onClick={() => router.back()}>
      
        </button>
        <h1 className={styles.headerTitle}>Curtidas</h1>
      </div>

      <div className={styles.products}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <Image
                  src={product.img}
                  alt={product.name}
                  width={200}
                  height={150}
                  className={styles.productImg}
                />
                <h3>{product.name}</h3>
                <p className={styles.price}>R$ {product.price}</p>

                <Link href={`/comprar/${product.slug}`} className={styles.buyBtn}>
                  Comprar
                </Link>
              </div>
            ))}
          </div>

    </div>
  );
}
