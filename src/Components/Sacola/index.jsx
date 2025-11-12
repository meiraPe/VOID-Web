"use client";

import { useEffect, useState } from "react";
import styles from "./Sacola.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Sacola() {
  const router = useRouter();
  const [itensSacola, setItensSacola] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Buscar sacola do usuário logado
  useEffect(() => {
    async function carregarSacola() {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario || !usuario.id) {
          router.push("/login");
          return;
        }

        const res = await fetch(`http://localhost:3333/sacolas/${usuario.id}`);
        if (!res.ok) throw new Error("Erro ao buscar sacola");

        const dados = await res.json();
        setItensSacola(dados.itens || []);
      } catch (err) {
        console.error("Erro ao carregar sacola:", err);
      } finally {
        setCarregando(false);
      }
    }

    carregarSacola();
  }, [router]);

  // Remover item da sacola
  async function removerItem(itemId) {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario || !usuario.id) return;

      const res = await fetch(
        `http://localhost:3333/sacolas/${usuario.id}/itens/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Erro ao remover item da sacola");

      // Atualiza a lista local
      setItensSacola((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Erro ao remover item:", err);
    }
  }

  if (carregando) {
    return (
      <div className={styles.container}>
        <p>Carregando sacola...</p>
      </div>
    );
  }

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
          <span className={styles.headerTitle}>Sua Sacola</span>
        </div>
        <Image
          className={styles.logo}
          src="/logos/pngPRETO.png"
          alt="Void Logo"
          width={110}
          height={40}
        />
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
        <h1 className={styles.headerTitle}>Sua Sacola</h1>
      </div>

      {/* Conteúdo */}
      <section className={styles.sacolaContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionDivider}></div>
          <h1>ITENS DA SACOLA</h1>
          <div className={styles.sectionDivider}></div>
        </div>

        {itensSacola.length === 0 ? (
          <p className={styles.vazio}>Sua sacola está vazia</p>
        ) : (
          <div className={styles.productsList}>
            {itensSacola.map((item) => (
              <div key={item.id} className={styles.productCard}>
                <Image
                  src={item.produto.imagem1Url}
                  alt={item.produto.nome}
                  width={130}
                  height={130}
                />

                <div className={styles.productDetails}>
                  <h2>{item.produto.nome}</h2>
                  <p>Qtd: {item.quantidade}</p>
                  <p>Preço: R$ {item.produto.preco.toFixed(2)}</p>
                </div>

                <div className={styles.productActions}>
                  <button
                    className={styles.actionBtn}
                    onClick={() => removerItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
