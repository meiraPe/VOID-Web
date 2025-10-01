"use client";

import styles from "./MarcasSection.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { products } from "@/app/data/products";

export default function MarcasSection() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header Mobile */}
      <header className={styles.headerMobile}>
        <div className={styles.leftGroup}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
          </button>
          <span className={styles.title}>Marcas</span>
        </div>

        <div className={styles.rightGroup}>
          <Image className={styles.logo} src="/logos/pngPRETO.png" alt="Void Logo" width={110} height={40} />

          {/* Botão hamburguer que também fecha */}
          <button
            className={`${styles.menuHam} ${sidebarOpen ? styles.active : ""}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Header Desktop */}
      <div className={styles.headerDesktop}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
        </button>
        <h1 className={styles.title}>Marcas</h1>
      </div>

      <div className={styles.layout}>
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className={styles.overlay}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar Mobile (entra da direita) */}
        <div className={`${styles.sidebarMobile} ${sidebarOpen ? styles.open : ""}`}>
          <ul>
            <li className={styles.filterItem}>ORDENAR POR</li>
            <li className={styles.filterItem}>CATEGORIA</li>
            <li className={styles.filterItem}>TAMANHOS</li>
            <li className={styles.filterItem}>CONDIÇÃO</li>
            <li className={styles.filterItem}>MARCA</li>
            <li className={styles.filterItem}>
              COR
              <div className={styles.colors}>
                {["red","blue","green","yellow","black","white"].map((color, i) => (
                  <span key={i} className={styles.color} style={{ backgroundColor: color }} />
                ))}
              </div>
            </li>
            <li className={styles.filterItem}>
              PREÇO
              <div className={styles.priceInputs}>
                <input type="number" placeholder="mínimo" />
                <input type="number" placeholder="máximo" />
              </div>
            </li>
          </ul>
        </div>

        {/* Sidebar Desktop */}
        <aside className={styles.sidebar}>
          <ul>
            <li className={styles.filterItem}>ORDENAR POR</li>
            <li className={styles.filterItem}>CATEGORIA</li>
            <li className={styles.filterItem}>TAMANHOS</li>
            <li className={styles.filterItem}>CONDIÇÃO</li>
            <li className={styles.filterItem}>MARCA</li>
            <li className={styles.filterItem}>
              COR
              <div className={styles.colors}>
                {["red","blue","green","yellow","purple","pink","orange","gray","black","white"].map((color, i) => (
                  <span key={i} className={styles.color} style={{ backgroundColor: color }} />
                ))}
              </div>
            </li>
            <li className={styles.filterItem}>
              PREÇO
              <div className={styles.priceInputs}>
                <input type="number" placeholder="mínimo" />
                <input type="number" placeholder="máximo" />
              </div>
            </li>
          </ul>
        </aside>

        {/* Conteúdo */}
        <main className={styles.content}>
          <div className={styles.brandInfo}>
            <h1>NIKE</h1>
            <p>
              Fundada em 1964 por Bill Bowerman e Phil Knight como Blue Ribbon Sports,
              a Nike se tornou oficialmente Nike, Inc. em 1971, adotando o icônico símbolo “Swoosh”. 
              Reconhecida mundialmente por seu impacto no esporte e na cultura, 
              a empresa mantém suas raízes nos Estados Unidos, com sede em Beaverton, Oregon. 
              Além de desenvolver calçados inovadores, a Nike investe em tecnologia, 
              sustentabilidade e mantém uma forte presença global em design e produção.
            </p>
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
        </main>
      </div>
    </div>
  );
}
