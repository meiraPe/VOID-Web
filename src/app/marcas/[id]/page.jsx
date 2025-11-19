"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./MarcaPage.module.css";

import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer";
import Marcas from "@/Components/Marcas";

export default function MarcaPage() {
  const { id } = useParams();
  const [marca, setMarca] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchMarca = async () => {
      try {
        const res = await fetch(`http://localhost:3333/marcas/${id}`);
        const data = await res.json();
        setMarca(data);
      } catch (err) {
        console.error("Erro ao buscar marca:", err);
      }
    };

    const fetchProdutos = async () => {
      try {
        const res = await fetch("http://localhost:3333/produtos");
        const data = await res.json();
        setProdutos(data.filter((p) => p.marcaId == id));
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    if (id) {
      fetchMarca();
      fetchProdutos();
    }
  }, [id]);

  if (!marca) return <p className={styles.loading}>Carregando marca...</p>;

  return (
    <>
      <HeaderDesk />

      <main className={styles.container}>

        {/* HERO DA MARCA */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>

            {/* Logo através do componente Marcas */}
            <div className={styles.heroLogo}>
              <Marcas imagemUrl={marca.imagemUrl} />
            </div>

            <div className={styles.heroText}>
              <h1>{marca.nome}</h1>
              <p>{marca.descricao || "Produtos selecionados da marca"}</p>
            </div>
          </div>
        </section>

        {/* LISTA DE PRODUTOS */}
        <section className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Produtos da {marca.nome}</h2>

          {produtos.length > 0 ? (
            <div className={styles.productsGrid}>
              {produtos.map((p) => (
                <a key={p.id} href={`/produtos/${p.id}`} className={styles.card}>
                  <div className={styles.productImageWrapper}>
                    <Image
                      src={p.imagem1Url || "/placeholder.png"}
                      alt={p.nome}
                      width={350}
                      height={350}
                      className={styles.productImage}
                    />
                  </div>

                  <div className={styles.cardInfo}>
                    <h3>{p.nome}</h3>
                    <span className={styles.price}>R$ {p.preco}</span>
                    <button className={styles.buyBtn}>Ver Produto</button>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Nenhum produto encontrado.</p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
