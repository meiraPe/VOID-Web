"use client";

import { useState, useEffect } from "react";
import styles from "./Cartoes.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cartoes() {
  const router = useRouter();

  // -----------------------------
  // ESTADOS
  // -----------------------------
  const [cartoes, setCartoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formVisible, setFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null);

  // -----------------------------
  // FETCH INICIAL (listar cartões)
  // -----------------------------
  useEffect(() => {
    const fetchCartoes = async () => {
      try {
        const res = await fetch("/api/cartoes"); // Endpoint da sua API
        if (!res.ok) throw new Error("Erro ao buscar cartões");
        const data = await res.json();
        setCartoes(data);
      } catch (err) {
        console.error(err);
        // fallback caso API não exista ainda:
        setCartoes([
          { id: 1, numero: "**** **** **** 1234", validade: "12/26" },
          { id: 2, numero: "**** **** **** 5678", validade: "09/27" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCartoes();
  }, []);

  // -----------------------------
  // POPUP DE SUCESSO
  // -----------------------------
  const mostrarPopup = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  // -----------------------------
  // ABRIR / FECHAR FORMULÁRIO
  // -----------------------------
  const abrirAdicionar = () => {
    setEditMode(false);
    setSelectedCard(null);
    setNumero("");
    setValidade("");
    setCvv("");
    setFormVisible(true);
  };

  const abrirEditar = (cartao) => {
    setEditMode(true);
    setSelectedCard(cartao);
    setNumero(cartao.numero.replace(/\*/g, "").replace(/\s+/g, "").trim());
    setValidade(cartao.validade);
    setFormVisible(true);
  };

  const fecharForm = () => setFormVisible(false);

  // -----------------------------
  // SALVAR / EDITAR CARTÃO
  // -----------------------------
  const salvarCartao = async () => {
    if (!numero || !validade || (!editMode && !cvv)) {
      alert("Preencha todos os campos (CVV é obrigatório ao adicionar).");
      return;
    }

    const novoCartao = {
      id: editMode ? selectedCard.id : Date.now(),
      numero: mascararNumero(numero),
      validade,
    };

    try {
      const method = editMode ? "PUT" : "POST";
      const res = await fetch("/api/cartoes", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCartao),
      });
      if (!res.ok) throw new Error("Erro ao salvar cartão");

      if (editMode) {
        setCartoes((prev) =>
          prev.map((c) => (c.id === selectedCard.id ? novoCartao : c))
        );
        mostrarPopup("Cartão atualizado com sucesso!");
      } else {
        setCartoes((prev) => [...prev, novoCartao]);
        mostrarPopup("Cartão adicionado com sucesso!");
      }
    } catch (err) {
      console.error(err);
      mostrarPopup("Erro ao salvar cartão");
    } finally {
      fecharForm();
    }
  };

  // -----------------------------
  // REMOVER CARTÃO
  // -----------------------------
  const removerCartao = async (cartao) => {
    try {
      const res = await fetch(`/api/cartoes/${cartao.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao remover cartão");
      setCartoes((prev) => prev.filter((c) => c.id !== cartao.id));
      mostrarPopup("Cartão removido com sucesso!");
    } catch (err) {
      console.error(err);
      mostrarPopup("Erro ao remover cartão");
    } finally {
      setConfirmRemove(null);
    }
  };

  const mascararNumero = (num) => {
    const digitos = String(num).replace(/\s+/g, "").slice(-4);
    return `**** **** **** ${digitos}`;
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (

    
    
    <div className={styles.pageContainer}>
    <div className={styles.headerContainer}>
        <header className={styles.headerMobile}>
          <div className={styles.headerLeft}>
            <button className={styles.backButton} onClick={() => router.back()}>
              <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
            </button>
            <span className={styles.headerTitle}>Meus Cartões</span>
          </div>
        </header>

        <div className={styles.headerDesktop}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
          </button>
          <h1 className={styles.headerTitle}>Meus Cartões</h1>
        </div>
      </div>

      <div className={styles.container}>
        {loading ? (
          <p className={styles.loading}>Carregando cartões...</p>
        ) : (
          <section className={styles.content}>
            <h2 className={styles.subtitle}>CARTÕES CADASTRADOS</h2>

            <div className={styles.cardList}>
              {cartoes.map((card) => (
                <div key={card.id} className={styles.card}>
                  <div>
                    <span className={styles.cardNumber}>{card.numero}</span>
                    <span className={styles.cardDate}>Validade: {card.validade}</span>
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      className={styles.editButton}
                      onClick={() => abrirEditar(card)}
                    >
                      ✏️
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => setConfirmRemove(card)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.addButton} onClick={abrirAdicionar}>
              ADICIONAR CARTÃO
            </button>
          </section>
        )}

        {/* MODAL FORM */}
          {formVisible && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalBox}>
                <h3 className={styles.modalTitle}>
                  {editMode ? "Editar Cartão" : "Adicionar Cartão"}
                </h3>

                <div className={styles.modalFields}>
                  <input
                    type="text"
                    placeholder="Número do Cartão"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className={styles.inputField}
                  />
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                    className={styles.inputField}
                  />
                  {!editMode && (
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className={styles.inputField}
                    />
                  )}
                </div>

                <div className={styles.modalButtons}>
                  <button onClick={fecharForm} className={styles.cancelButton}>
                    Cancelar
                  </button>
                  <button onClick={salvarCartao} className={styles.saveButton}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}


        {/* MODAL CONFIRMAR REMOÇÃO */}
        {confirmRemove && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
              <h3>Remover cartão</h3>
              <p>
                Deseja remover <strong>{confirmRemove.numero}</strong>?
              </p>
              <div className={styles.modalButtons}>
                <button
                  onClick={() => setConfirmRemove(null)}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => removerCartao(confirmRemove)}
                  className={styles.deleteButton}
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        )}

        {/* POPUP DE SUCESSO */}
        {showPopup && (
          <div className={styles.popup}>
            <p>{popupMsg}</p>
          </div>
        )}

        <footer className={styles.footer}>
          <h2>COMPRE E VENDA COM MAIOR COMODIDADE</h2>
          <div className={styles.stores}>
            <Link href="#">
              <Image src="/placeholders/googleplay.png" alt="Google Play" width={130} height={40} />
            </Link>
            <Link href="#">
              <Image src="/placeholders/appstore.png" alt="Apple Store" width={130} height={40} />
            </Link>
          </div>
          <div className={styles.mockups}>
            <Image
              src="/placeholders/mockup1.png"
              alt="App Mockup 1"
              width={260}
              height={160}
              priority
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
