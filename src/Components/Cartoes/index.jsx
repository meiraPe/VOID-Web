"use client";

import { useState, useEffect } from "react";
import styles from "./Cartoes.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cartoes() {
  const router = useRouter();

  const [cartoes, setCartoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formVisible, setFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [numero, setNumero] = useState("");
  const [nomeTitular, setNomeTitular] = useState("");
  const [validadeMes, setValidadeMes] = useState("");
  const [validadeAno, setValidadeAno] = useState("");
  const [cvv, setCvv] = useState("");

  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null);

  const [usuarioId, setUsuarioId] = useState(null);

  // ---------------------------------------------------
  // PEGAR USUÁRIO E LISTAR CARTÕES
  // ---------------------------------------------------
  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    
    if (!stored) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(stored);
    setUsuarioId(user.id);

    const fetchCartoes = async () => {
      const url = `http://localhost:3333/cartoes/usuario/${user.id}`;
      
      try {
        const res = await fetch(url);
        
        if (res.status === 500) {
          const errorData = await res.json();
          console.error("Erro no servidor:", errorData);
          setCartoes([]);
          return;
        }
        
        if (!res.ok) {
          setCartoes([]);
          return;
        }
        
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setCartoes(data);
        } else {
          setCartoes([]);
        }
      } catch (err) {
        console.error("Erro ao buscar cartões:", err);
        setCartoes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartoes();
  }, []);

  const mostrarPopup = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  // ---------------------------------------------------
  // ABRIR / FECHAR FORM
  // ---------------------------------------------------
  const abrirAdicionar = () => {
    setEditMode(false);
    setSelectedCard(null);
    setNumero("");
    setNomeTitular("");
    setValidadeMes("");
    setValidadeAno("");
    setCvv("");
    setFormVisible(true);
  };

  const abrirEditar = (card) => {
    setEditMode(true);
    setSelectedCard(card);
    setNumero(card.numero.replace(/\*/g, ""));
    setNomeTitular(card.nomeTitular);
    setValidadeMes(card.validadeMes);
    setValidadeAno(card.validadeAno);
    setFormVisible(true);
  };

  const fecharForm = () => setFormVisible(false);

  // ---------------------------------------------------
  // SALVAR / EDITAR CARTÃO
  // ---------------------------------------------------
  const salvarCartao = async () => {
    if (!numero || !nomeTitular || !validadeMes || !validadeAno || (!editMode && !cvv)) {
      alert("Preencha todos os campos.");
      return;
    }

    const payload = {
      usuarioId,
      numero,
      nomeTitular,
      validadeMes: Number(validadeMes),
      validadeAno: Number(validadeAno),
      codigoSeguranca: cvv,
    };

    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode
        ? `http://localhost:3333/cartoes/${selectedCard.id}`
        : "http://localhost:3333/cartoes";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro ao salvar:", errorText);
        throw new Error("Erro ao salvar cartão");
      }

      mostrarPopup(editMode ? "Cartão atualizado!" : "Cartão adicionado!");

      // Atualizar lista
      const refreshUrl = `http://localhost:3333/cartoes/usuario/${usuarioId}`;
      const refresh = await fetch(refreshUrl);
      
      if (refresh.ok) {
        const refreshData = await refresh.json();
        if (Array.isArray(refreshData)) {
          setCartoes(refreshData);
        }
      }
    } catch (err) {
      console.error("Erro ao salvar cartão:", err);
      mostrarPopup("Erro ao salvar cartão");
    } finally {
      fecharForm();
    }
  };

  // ---------------------------------------------------
  // REMOVER
  // ---------------------------------------------------
  const removerCartao = async (cartao) => {
    try {
      const url = `http://localhost:3333/cartoes/${cartao.id}`;
      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro ao remover:", errorText);
        throw new Error("Erro ao remover");
      }

      mostrarPopup("Cartão removido!");

      setCartoes((prev) => prev.filter((c) => c.id !== cartao.id));
    } catch (err) {
      console.error("Erro ao remover cartão:", err);
      mostrarPopup("Erro ao remover");
    } finally {
      setConfirmRemove(null);
    }
  };

  // ---------------------------------------------------
  // RENDERIZAÇÃO
  // ---------------------------------------------------
  return (
    <div className={styles.pageContainer}>
      {/* HEADER */}
      <div className={styles.headerContainer}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image src="/symbols/nav-arrow-left.svg" width={20} height={20} alt="voltar" />
        </button>
        <h1 className={styles.headerTitle}>Meus Cartões</h1>
      </div>

      <div className={styles.container}>
        {loading ? (
          <p className={styles.loading}>Carregando...</p>
        ) : (
          <>
            <div className={styles.cardList}>
              {cartoes.length === 0 ? (
                <p className={styles.emptyMessage}>Nenhum cartão cadastrado</p>
              ) : (
                cartoes.map((c) => (
                  <div key={c.id} className={styles.card}>
                    <strong>**** **** **** {c.numero.slice(-4)}</strong>
                    <span>Validade: {c.validadeMes.toString().padStart(2, '0')}/{c.validadeAno}</span>

                    <div className={styles.cardActions}>
                      <button 
                        onClick={() => abrirEditar(c)}
                        title="Editar cartão"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button 
                        onClick={() => setConfirmRemove(c)}
                        title="Remover cartão"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button className={styles.addButton} onClick={abrirAdicionar}>
              ADICIONAR CARTÃO
            </button>
          </>
        )}

        {/* MODAL FORM */}
        {formVisible && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
              <h2>{editMode ? "Editar Cartão" : "Adicionar Cartão"}</h2>

              <input
                className={styles.inputField}
                placeholder="Número do Cartão"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />

              <input
                className={styles.inputField}
                placeholder="Nome do Titular"
                value={nomeTitular}
                onChange={(e) => setNomeTitular(e.target.value)}
              />

              <input
                className={styles.inputField}
                placeholder="Mês (MM)"
                value={validadeMes}
                onChange={(e) => setValidadeMes(e.target.value)}
              />

              <input
                className={styles.inputField}
                placeholder="Ano (AAAA)"
                value={validadeAno}
                onChange={(e) => setValidadeAno(e.target.value)}
              />

              {!editMode && (
                <input
                  className={styles.inputField}
                  placeholder="CVV"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              )}

              <div className={styles.modalButtons}>
                <button onClick={fecharForm}>Cancelar</button>
                <button onClick={salvarCartao}>Salvar</button>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRMAR REMOÇÃO */}
        {confirmRemove && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
              <h3>Remover cartão?</h3>
              <p><strong>{confirmRemove.numero}</strong></p>

              <div className={styles.modalButtons}>
                <button onClick={() => setConfirmRemove(null)}>Cancelar</button>
                <button onClick={() => removerCartao(confirmRemove)} className="removeBtn">Remover</button>
              </div>
            </div>
          </div>
        )}

        {/* POPUP */}
        {showPopup && (
          <div className={styles.popup}>
            <p>{popupMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
}
