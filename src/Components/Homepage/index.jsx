"use client";

import styles from './Homepage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Marcas from '@/Components/Marcas';
import Sneakers from '../Sneakers';
import { useMarcaStore } from '../../stores/useMarcaStore.js';
import { useProdutoStore } from '../../stores/useProdutoStore.js';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { marcas, setMarcas } = useMarcaStore();
  const { produtos, setProdutos } = useProdutoStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      router.push("/login");
    } else {
      console.log("Usuário autenticado: ", token);
    }
  }, []);

  // Marcas
  useEffect(() => {
    async function listMarcas() {
      try {
        const response = await fetch('http://localhost:3333/marcas');
        if (response.ok) {
          const data = await response.json();
          setMarcas(data);
        } else {
          console.log('Erro ao listar marcas');
        }
      } catch (error) {
        console.log(error);
      }
    }
    listMarcas();
  }, [setMarcas]);

  // Produtos
  useEffect(() => {
    async function listProdutos() {
      try {
        const response = await fetch('http://localhost:3333/produtos');
        if (response.ok) {
          const data = await response.json();
          setProdutos(data);
        } else {
          console.log('Erro ao listar produtos');
        }
      } catch (error) {
        console.log(error);
      }
    }
    listProdutos();
  }, [setProdutos]);

  return (
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
            src="/placeholders/bannerHomeDesktop.png"
            alt="Banner Home"
            width={1920}
            height={750}
            quality={100}
            priority
            className={styles.imageBanner}
          />
        </div>

        <div className={styles.textBox}>
          <h1>OS MELHORES<br /> PRODUTOS VOCÊ <br/> ENCONTRA AQUI!</h1>

          <Link href="/marcas">
              <button className={styles.shopNowBtn}>
                Ver Mais
                <Image
                  src="/symbols/arrow-right-white.svg"
                  alt="Seta para direita"
                  width={30}
                  height={30}
                />
              </button>
            </Link>
        </div>
      </div>

      {/* Banner Mobile */}
      <div className={styles.bannerMobile}>
        <div className={styles.boxBanner}>
          <Image
            src="/placeholders/bannerHomeMobile.png"
            alt="Banner Home"
            width={650}
            height={650}
            priority
            quality={100}
            style={{ objectFit: "cover" }}
            unoptimized
            className={styles.imageBanner}
          />

          <div className={styles.textOverlay}>
            <h1 className={styles.bannerTitle}>
              OS MELHORES<br /> PRODUTOS VOCÊ <br/> ENCONTRA AQUI!
            </h1>
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
      <section className={styles.brandsSection}>
        {marcas.map((marca) => (
          <Marcas
            key={marca.id}
            imagemUrl={marca.imagemUrl}
          />
        ))}
      </section>

      {/* Sneakers em Destaque Section */}
      <div className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>
          <span>Sneakers</span> em Destaque
        </h2>

        {/* Products Grid */}
        <section className={styles.productsGrid}>
          {produtos.map((produto) => (
            <Sneakers
              key={produto.id}
              imagem1Url={produto.imagem1Url}
              marca={produto.marca?.nome || ""}
              nome={produto.nome}
            />
          ))}
      </section>
      </div>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <h2>COMPRE E VENDA COM MAIOR COMODIDADE</h2>
        <div className={styles.stores}>
          <Link href="#"><Image src="/placeholders/googleplay.png" alt="Google Play" width={140} height={42} /></Link>
          <Link href="#"><Image src="/placeholders/appstore.png" alt="Apple Store" width={140} height={42} /></Link>
        </div>
        <div className={styles.mockups}>
          <Image src="/placeholders/mockup1.png" alt="App Mockup 1" width={300} height={190} priority />
        </div>
      </footer>
    </div>
  );
}
