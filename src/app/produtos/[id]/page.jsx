"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
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

  // Estado do carrossel
  const [slideIndex, setSlideIndex] = useState(0);

  // TOAST
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  function triggerToast(msg) {
    setToastMessage(msg);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);

      if (msg === "Compra realizada com sucesso") {
        setTimeout(() => router.push("/"), 300);
      }
    }, 1600);
  }

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

  async function toggleFavorito() {
    if (!usuarioId) {
      triggerToast("Faça login para favoritar");
      return;
    }

    try {
      if (isFavorito) {
        await fetch(`http://localhost:3333/favoritos`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuarioId, produtoId: produto.id })
        });
        setIsFavorito(false);
      } else {
        await fetch(`http://localhost:3333/favoritos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuarioId, produtoId: produto.id })
        });
        setIsFavorito(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      triggerToast("Erro ao atualizar favorito");
    }
  }

  function adicionarNaSacola() {
    if (!usuarioId) {
      triggerToast("Você precisa estar logado");
      return;
    }

    triggerToast("Adicionado à sacola!");
  }

  function comprarAgora() {
    if (!usuarioId) {
      triggerToast("Você precisa estar logado");
      return;
    }

    triggerToast("Compra realizada com sucesso");
  }

  const imagens = [produto?.imagem1Url, produto?.imagem2Url].filter(Boolean);

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % imagens.length);
  };

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  if (loading) return <p className={styles.loading}>Carregando produto...</p>;
  if (!produto) return <p className={styles.error}>Produto não encontrado.</p>;

  return (
    <>
      <HeaderDesk />

      {/* HEADER INTERNO */}
      <div className={styles.headerDesktop}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
        </button>
        <h1 className={styles.headerTitle}>Voltar</h1>
      </div>

      <main className={styles.container}>
        <div className={styles.productBox}>
          {/* IMAGEM + CARROSSEL */}
          <div className={styles.imageSection}>

            {imagens.length > 1 && (
              <button className={styles.carouselBtnLeft} onClick={handlePrev}>
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
              <button className={styles.carouselBtnRight} onClick={handleNext}>
                <IoChevronForward size={28} />
              </button>
            )}
          </div>

          {/* INFORMAÇÕES */}
          <div className={styles.infoSection}>
            <div className={styles.nameRow}>
              <h1 className={styles.productName}>{produto?.nome}</h1>

              <div className={styles.favoriteIcon} onClick={toggleFavorito}>
                <FaHeart color={isFavorito ? "red" : "gray"} size={22} />
              </div>
            </div>
            <p className={styles.desc}>{produto.descricao || "Sem descrição."}</p>
            <span className={styles.price}>R$ {produto.preco.toFixed(2)}</span>

            <div className={styles.buttonGroup}>
              <button className={`${styles.actionButton} ${styles.buyBtn}`}>
                Adicionar ao Carrinho
              </button>

              <button className={`${styles.actionButton} ${styles.buyNowBtn}`}>
                Comprar Agora
              </button>
            </div>  
          </div>
        </div>
      </main>

      {/* TOAST */}
      {showToast && (
        <div className={styles.toast}>
          {toastMessage}
        </div>
      )}

      <Footer />
    </>
  );
}
