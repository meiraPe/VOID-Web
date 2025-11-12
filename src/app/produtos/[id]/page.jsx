"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./ProdutoPage.module.css";

import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer";

export default function ProdutoPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const res = await fetch(`http://localhost:3333/produtos/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar produto");
        const data = await res.json();
        setProduto(data);
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduto();
  }, [id]);

  if (loading) {
    return <p className={styles.loading}>Carregando produto...</p>;
  }

  if (!produto) {
    return <p className={styles.error}>Produto não encontrado.</p>;
  }

  return (
    <>
      <HeaderDesk />

      <main className={styles.container}>
        <div className={styles.productBox}>
          {/* Imagem principal */}
          <div className={styles.imageSection}>
            <Image
              src={produto.imagem1Url || "/placeholder.png"}
              alt={produto.nome}
              width={400}
              height={400}
              className={styles.image}
              priority
            />
            {produto.imagem2Url && (
              <Image
                src={produto.imagem2Url}
                alt={`${produto.nome} (secundária)`}
                width={150}
                height={150}
                className={styles.thumb}
              />
            )}
          </div>

          {/* Informações */}
          <div className={styles.infoSection}>
            <h1>{produto.nome}</h1>
            <p className={styles.desc}>{produto.descricao || "Sem descrição."}</p>
            <span className={styles.price}>R$ {produto.preco.toFixed(2)}</span>

            <button
              className={styles.buyBtn}
              onClick={() => alert("Produto adicionado à sacola!")}
            >
              Adicionar à Sacola
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
