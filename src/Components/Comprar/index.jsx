"use client";

import styles from "./Comprar.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { products } from "@/app/data/products";

export default function Comprar({ slug }) {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [showError, setShowError] = useState(false);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className={styles.container}>
        <h2>Produto não encontrado</h2>
        <button onClick={() => router.push("/")}>Voltar à Loja</button>
      </div>
    );
  }

  const handleBuy = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      router.push("/");
    }, 2500);
  };

  const sizes = [
    { label: "38", available: true },
    { label: "39", available: false },
    { label: "40", available: true },
    { label: "41", available: true },
    { label: "42", available: false },
  ];

  return (
    <div className={styles.container}>
      {/* Header Mobile */}
      <header className={styles.headerMobile}>
        <div className={styles.leftGroup}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <Image
              src="/symbols/nav-arrow-left.svg"
              alt="Voltar"
              width={20}
              height={20}
            />
          </button>
          <span className={styles.title}>Voltar</span>
        </div>
      </header>

      {/* Header Desktop */}
      <div className={styles.headerDesktop}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <Image
            src="/symbols/nav-arrow-left.svg"
            alt="Voltar"
            width={20}
            height={20}
          />
        </button>
        <h1 className={styles.title}>Voltar</h1>
      </div>

      {/* Conteúdo */}
      <section className={styles.productBox}>
        <div className={styles.imageBox}>
          <Image
            src={product.img}
            alt={product.name}  
            width={300}
            height={250}
          />
        </div>

        <div className={styles.infoBox}>
          <h1>{product.name}</h1>
          <p className={styles.price}>R$ {product.price}</p>
          <p className={styles.description}>
            Aproveite este produto exclusivo. <br/> Estoque limitado!
          </p>

          {/* Seletor de tamanho */}
          <div className={styles.sizeSelector}>
            <h3>Selecione o tamanho:</h3>
            <div className={styles.sizeGrid}>
              {sizes.map((size) => (
                <button
                  key={size.label}
                  disabled={!size.available}
                  onClick={() => {
                    if (size.available) {
                      setSelectedSize(size.label);
                      setShowError(false);
                    }
                  }}
                  className={`${styles.sizeBtn} 
                    ${selectedSize === size.label ? styles.active : ""} 
                    ${!size.available ? styles.unavailable : ""}`}
                >
                  {size.label}
                </button>
              ))}
            </div>
            {showError && (
              <p className={styles.errorMsg}>Selecione um tamanho antes de comprar.</p>
            )}
          </div>

          <button className={styles.buyBtn} onClick={handleBuy}>
            Comprar Agora
          </button>
        </div>
      </section>

      {/* POPUP */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <Image
              src="/symbols/check.png"
              alt="Sucesso"
              width={60}
              height={60}
            />
            <h2>Compra Confirmada!</h2>
            <p>
              Seu pedido de <strong>{product.name}</strong> (tamanho{" "}
              <strong>{selectedSize}</strong>) foi realizado com sucesso.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
