"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./MarcaPage.module.css";

// Importação dos componentes globais
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer";

export default function MarcaPage() {
  const { id } = useParams();
  const [marca, setMarca] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchMarca = async () => {
      try {
        const res = await fetch(`http://localhost:3333/marcas/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar marca");
        const data = await res.json();
        setMarca(data);
      } catch (err) {
        console.error("Erro ao buscar marca:", err);
      }
    };

    const fetchProdutos = async () => {
      try {
        const res = await fetch(`http://localhost:3333/produtos`);
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        const data = await res.json();
        const filtrados = data.filter((p) => p.marca_id === Number(id));
        setProdutos(filtrados);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    if (id) {
      fetchMarca();
      fetchProdutos();
    }
  }, [id]);

  if (!marca) return <p className={styles.empty}>Carregando marca...</p>;

  return (
    <>
      {/* Header fixo e global */}
      <HeaderDesk />

      {/* Conteúdo principal da página */}
      <main className={styles.container}>
        {/* === Header da Marca === */}
        <header className={styles.header}>
          {marca.imagem && (
            <Image
              src={marca.imagem}
              alt={marca.nome}
              width={120}
              height={120}
              priority
            />
          )}
          <h1>{marca.nome}</h1>
          <p>{marca.descricao || "Sem descrição disponível."}</p>
        </header>

        {/* === Lista de Produtos === */}
        <section className={styles.productsSection}>
          <h2 className={styles.productsTitle}>Produtos dessa marca</h2>

          {produtos.length > 0 ? (
            <div className={styles.productsGrid}>
              {produtos.map((p) => (
                <div className={styles.card} key={p.id}>
                  <Image
                    src={p.imagem || "/placeholder.png"}
                    alt={p.nome}
                    width={250}
                    height={250}
                  />
                  <div className={styles.cardInfo}>
                    <h3>{p.nome}</h3>
                    <p>{p.descricao || "Produto sem descrição."}</p>
                    <span className={styles.price}>R$ {p.preco}</span>
                    <a href={`/produtos/${p.id}`} className={styles.buyBtn}>
                      Comprar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>
              Nenhum produto encontrado para esta marca.
            </p>
          )}
        </section>
      </main>

      {/* Footer global */}
      <Footer />
    </>
  );
}
