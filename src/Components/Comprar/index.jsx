"use client";

import styles from "./Comprar.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products } from "@/app/data/products"; // centralizamos aqui

export default function Comprar({ slug }) {
  const router = useRouter();

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
    alert(`✅ Compra do produto "${product.name}" realizada com sucesso!`);
    router.push("/");
  };

  return (
    <div className={styles.container}>
      {/* Header Mobile */}
        <header className={styles.headerMobile}>
          <div className={styles.leftGroup}>
            <button className={styles.backBtn} onClick={() => router.back()}>
              <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
            </button>
            <span className={styles.title}>Voltar</span>
          </div>
          <Image className={styles.logo} src="/logos/pngPRETO.png" alt="Void Logo" width={110} height={40} />
        </header>

        {/* Header Desktop */}
        <div className={styles.headerDesktop}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
          </button>
          <h1 className={styles.title}>Voltar</h1>
        </div>

      {/* Conteúdo */}
      <section className={styles.productBox}>
        <div className={styles.imageBox}>
          <Image src={product.img} alt={product.name} width={300} height={250} />
        </div>

        <div className={styles.infoBox}>
          <h1>{product.name}</h1>
          <p className={styles.price}>R$ {product.price}</p>
          <p className={styles.description}>
            Aproveite este produto exclusivo. Estoque limitado!
          </p>
          <button className={styles.buyBtn} onClick={handleBuy}>
            Comprar Agora
          </button>
        </div>
      </section>
    </div>
  );
}
