"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import styles from "./Favoritos.module.css";

export default function Favoritos() {
  const router = useRouter();
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Buscar favoritos do usuário logado
  useEffect(() => {
    async function carregarFavoritos() {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario || !usuario.id) {
          router.push("/login");
          return;
        }

        const res = await fetch(`http://localhost:3333/favoritos/${usuario.id}`);
        if (!res.ok) throw new Error("Erro ao buscar favoritos");

        const dados = await res.json();
        setFavoritos(dados || []);
      } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
      } finally {
        setCarregando(false);
      }
    }

    carregarFavoritos();
  }, [router]);

  // Remover um favorito
  async function removerFavorito(produtoId) {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario || !usuario.id) return;

      const res = await fetch(`http://localhost:3333/favoritos`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: usuario.id,
          produtoId: produtoId,
        }),
      });

      if (!res.ok) throw new Error("Erro ao remover favorito");

      // Atualiza lista local sem recarregar
      setFavoritos((prev) =>
        prev.filter((fav) => fav.produto.id !== produtoId)
      );
    } catch (err) {
      console.error("Erro ao remover favorito:", err);
    }
  }

  if (carregando) {
    return (
      <div className={styles.container}>
        <p>Carregando favoritos...</p>
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
        {favoritos.length > 0 ? (
          favoritos.map((fav) => (
            <div key={fav.id} className={styles.card}>
              <button
                className={styles.favoriteBtn}
                onClick={() => removerFavorito(fav.produto.id)}
              >
                <FaHeart color="red" />
              </button>

              <Image
                src={fav.produto.imagem1Url}
                alt={fav.produto.nome}
                width={250}
                height={200}
                className={styles.productImg}
              />

              <div className={styles.cardInfo}>
                <h3 className={styles.productName}>{fav.produto.nome}</h3>
                <p className={styles.price}>
                  R$ {fav.produto.preco.toFixed(2)}
                </p>
                <Link
                  href={`/comprar/${fav.produto.id}`}
                  className={styles.buyBtn}
                >
                  Comprar
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyMsg}>Nenhum produto favoritado ainda</p>
        )}
      </div>
    </div>
  );
}
