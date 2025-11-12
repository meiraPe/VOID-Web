"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./EditPerfil.module.css";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";

export default function EditarPerfil() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Carrega dados do usuário logado
  useEffect(() => {
    try {
      const usuarioStr = localStorage.getItem("usuario");

      if (!usuarioStr) {
        console.warn("Nenhum usuário encontrado no localStorage, redirecionando...");
        router.push("/login");
        return;
      }

      const usuarioObj = JSON.parse(usuarioStr);
      console.log("Usuário carregado:", usuarioObj);

      setUsuario(usuarioObj);
      setName(usuarioObj.nome || "");
      setEmail(usuarioObj.email || "");
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // 🔹 Função para salvar alterações
  const salvarAlteracoes = async () => {
    if (!usuario || !usuario?.id || !usuario?.token) {
      alert("Sessão inválida. Faça login novamente.");
      router.push("/login");
      return;
    }

    const body = { nome: name, email };
    if (password.trim()) body.senha = password;

    try {
      const response = await fetch(`http://localhost:3333/usuarios/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data?.error || "Erro ao atualizar perfil.");
        return;
      }

      // Atualiza o localStorage e o state local
      const usuarioAtualizado = {
        ...usuario,
        nome: data.nome || name,
        email: data.email || email,
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
      setUsuario(usuarioAtualizado);
      setPassword("");

      // Exibe popup de sucesso
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 2500);
    } catch (err) {
      console.error("Erro no fetch:", err);
      alert("Falha ao conectar com o servidor.");
    }
  };

  // 🔹 Exibe mensagem de carregamento
  if (loading)
    return (
      <div className={styles.loading}>
        <p>Carregando informações do usuário...</p>
      </div>
    );

  // 🔹 Renderização principal
  return (
    <div className={styles.container}>
      {/* Header Mobile */}
      <header className={styles.headerMobile}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image
            src="/symbols/nav-arrow-left.svg"
            alt="Voltar"
            width={20}
            height={20}
          />
        </button>
        <span className={styles.headerTitle}>Editar Perfil</span>
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
        <h1 className={styles.headerTitle}>Editar Perfil</h1>
      </div>

      {/* Formulário */}
      <div className={styles.formCard}>
        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Nova senha (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>

        <button className={styles.saveBtn} onClick={salvarAlteracoes}>
          <FaCheckCircle /> Salvar Alterações
        </button>
      </div>

      {/* Popup de sucesso */}
      {popupVisible && (
        <div className={styles.popup}>
          <FaCheckCircle className={styles.popupIcon} />
          <p className={styles.popupText}>Alterações salvas com sucesso!</p>
        </div>
      )}
    </div>
  );
}
