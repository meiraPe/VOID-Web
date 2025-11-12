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
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    // Supondo que o ID do usuário esteja salvo no localStorage
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUsuarioId(parsed.id);
    }

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

  async function adicionarNaSacola() {
    if (!usuarioId) {
      alert("Você precisa estar logado para adicionar à sacola.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3333/sacolas/${usuarioId}/itens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produtoId: produto.id,
          quantidade: 1,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao adicionar produto à sacola");
      }

      const data = await res.json();
      console.log("Item adicionado:", data);
      alert("Produto adicionado à sacola!");
    } catch (error) {
      console.error("Erro ao adicionar na sacola:", error);
      alert("Não foi possível adicionar o produto à sacola.");
    }
  }

  if (loading) return <p className={styles.loading}>Carregando produto...</p>;
  if (!produto) return <p className={styles.error}>Produto não encontrado.</p>;

  return (
    <>
      <HeaderDesk />

      <main className={styles.container}>
        <div className={styles.productBox}>
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

          <div className={styles.infoSection}>
            <h1>{produto.nome}</h1>
            <p className={styles.desc}>{produto.descricao || "Sem descrição."}</p>
            <span className={styles.price}>R$ {produto.preco.toFixed(2)}</span>

            <button onClick={adicionarNaSacola} className={styles.buyBtn}>
              Adicionar à Sacola
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
