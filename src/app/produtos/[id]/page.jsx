"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// Ícones
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import { PiShoppingBagBold } from "react-icons/pi";
import { IoFlashSharp, IoChevronBack, IoChevronForward } from "react-icons/io5";

import styles from "./ProdutoPage.module.css";
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer";

export default function ProdutoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState(null);
  const [isFavorito, setIsFavorito] = useState(false);

  // Carrossel
  const [slideIndex, setSlideIndex] = useState(0);

  // POPUP
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState("");

  function triggerPopup(msg) {
    setPopupText(msg);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 1400);
  }

  // Obtém usuário e produto
  useEffect(() => {
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

  // Verificar favorito
  useEffect(() => {
    if (!usuarioId || !id) return;

    const verificarFavorito = async () => {
      try {
        const res = await fetch(`http://localhost:3333/favoritos/${usuarioId}`);
        const data = await res.json();

        const existe = data.some((fav) => fav.produtoId === Number(id));
        setIsFavorito(existe);
      } catch (err) {
        console.error("Erro ao verificar favorito:", err);
      }
    };

    verificarFavorito();
  }, [usuarioId, id]);

  // FAVORITAR / REMOVER FAVORITO
  async function toggleFavorito() {
    if (!usuarioId) {
      triggerPopup("Faça login para favoritar");
      return;
    }

    try {
      if (isFavorito) {
        await fetch(`http://localhost:3333/favoritos`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuarioId, produtoId: produto.id }),
        });

        setIsFavorito(false);
        triggerPopup("Removido dos favoritos");
      } else {
        await fetch(`http://localhost:3333/favoritos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuarioId, produtoId: produto.id }),
        });

        setIsFavorito(true);
        triggerPopup("Adicionado aos favoritos");
      }
    } catch (error) {
      console.error("Erro:", error);
      triggerPopup("Erro ao atualizar favorito");
    }
  }

  // ADICIONAR NA SACOLA
  async function adicionarNaSacola() {
    if (!usuarioId) {
      triggerPopup("Você precisa estar logado");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3333/sacolas/${usuarioId}/itens`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            produtoId: produto.id,
            quantidade: 1,
          }),
        }
      );

      if (!res.ok) throw new Error("Erro ao adicionar na sacola.");

      triggerPopup("Adicionado à sacola!");

      // Aguarda o popup antes de ir para sacola
      setTimeout(() => {
        router.push("/sacola");
      }, 500);
    } catch (error) {
      console.error("Erro ao adicionar na sacola:", error);
      triggerPopup("Erro ao adicionar à sacola");
    }
  }

  // COMPRAR AGORA
  function comprarAgora() {
    if (!usuarioId) return triggerPopup("Você precisa estar logado");
    triggerPopup("Compra realizada!");
  }

  // STATES DE LOAD
  if (loading) return <p className={styles.loading}>Carregando produto...</p>;

  if (!produto) return <p className={styles.error}>Produto não encontrado.</p>;

  const imagens = [produto.imagem1Url, produto.imagem2Url].filter(Boolean);

  return (
    <>
      <HeaderDesk />

      <div className={styles.headerDesktop}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image
            src="/symbols/nav-arrow-left.svg"
            alt="Voltar"
            width={20}
            height={20}
          />
        </button>
        <h1 className={styles.headerTitle}>Voltar</h1>
      </div>

      <main className={styles.container}>
        <div className={styles.productBox}>
          {/* IMAGENS + CARROSSEL */}
          <div className={styles.imageSection}>
            {imagens.length > 1 && (
              <button
                className={styles.carouselBtnLeft}
                onClick={() =>
                  setSlideIndex(
                    (prev) => (prev - 1 + imagens.length) % imagens.length
                  )
                }
              >
                <IoChevronBack size={28} />
              </button>
            )}

            <Image
              src={imagens[slideIndex]}
              alt={produto.nome}
              width={400}
              height={400}
              className={styles.image}
              priority
            />

            {imagens.length > 1 && (
              <button
                className={styles.carouselBtnRight}
                onClick={() =>
                  setSlideIndex((prev) => (prev + 1) % imagens.length)
                }
              >
                <IoChevronForward size={28} />
              </button>
            )}
          </div>

          {/* INFORMAÇÕES */}
          <div className={styles.infoSection}>
            <div className={styles.nameRow}>
              <h1 className={styles.productName}>{produto.nome}</h1>

              <button className={styles.favoriteIcon} onClick={toggleFavorito}>
                <FaHeart color={isFavorito ? "red" : "gray"} size={22} />
              </button>
            </div>

            <p className={styles.desc}>{produto.descricao}</p>

            <span className={styles.price}>R$ {produto.preco.toFixed(2)}</span>

            {/* BOTÕES */}
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.actionButton} ${styles.sacolaBtn}`}
                onClick={adicionarNaSacola}
              >
                <PiShoppingBagBold size={22} />
                <span>Adicionar à Sacola</span>
              </button>

              <button
                className={`${styles.actionButton} ${styles.buyNowBtn}`}
                onClick={comprarAgora}
              >
                <IoFlashSharp size={22} />
                <span>Comprar Agora</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* POPUP */}
      {popupVisible && (
        <div className={styles.popup}>
          <FaCheckCircle className={styles.popupIcon} />
          <p className={styles.popupText}>{popupText}</p>
        </div>
      )}

      <Footer />
    </>
  );
}
