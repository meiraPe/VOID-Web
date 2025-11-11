"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Favoritos.module.css";
import { FaHeart } from "react-icons/fa";
import { products } from "@/app/data/products";

export default function Favoritos() {
  const router = useRouter();
  const [favorites, setFavorites] = useState(products); // futuramente você pode substituir pelos favoritos salvos

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      {/* Header Mobile */}
      <header className={styles.headerMobile}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <Image
              src="/symbols/nav-arrow-left.svg"
              alt="Voltar"
              width={20}
              height={20}
            />
          </button>
          <span className={styles.headerTitle}>Favoritos</span>
        </div>
      </header>

      {/* Header Desktop */}
      <div className={styles.headerDesktop}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image
            src="/symbols/nav-arrow-left.svg"
            alt="Voltar"
            width={20}
            height={20}
          />
        </button>
        <h1 className={styles.headerTitle}>Meus Favoritos</h1>
      </div>

      {/* Lista de produtos favoritos */}
      <div className={styles.products}>
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div key={product.id} className={styles.card}>
              <button
                className={styles.favoriteBtn}
                onClick={() => toggleFavorite(product.id)}
              >
                <FaHeart />
              </button>

              <Image
                src={product.img}
                alt={product.name}
                width={250}
                height={200}
                className={styles.productImg}
              />
              <div className={styles.cardInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.price}>R$ {product.price}</p>
                <Link
                  href={`/comprar/${product.slug}`}
                  className={styles.buyBtn}
                >
                  Comprar
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyMsg}>Nenhum produto favoritado ainda.</p>
        )}
      </div>
    </div>
  );
}
