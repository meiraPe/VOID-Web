"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Perfil.module.css";

export default function Perfil() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("usuario");
      if (stored) {
        const usuario = JSON.parse(stored);
        setUser(usuario);
      }
    } catch (err) {
      console.error("Erro ao carregar usuário:", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.alert("Você saiu da conta.");
    router.replace("/");
  };

  const deletarConta = async () => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:3333/usuarios/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("usuario");
        window.alert("Conta deletada com sucesso.");
        router.replace("/");
      } else {
        const data = await response.json();
        window.alert(data.mensagem || "Erro ao deletar conta.");
      }
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      window.alert("Ocorreu um erro ao tentar deletar a conta.");
    }
  };

  if (!user) return null; // evita flash antes de carregar

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
          <span className={styles.headerTitle}>Perfil</span>
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
        <h1 className={styles.headerTitle}>Seu Perfil</h1>
      </div>

      {/* Avatar e informações */}
      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <Image
            src="/symbols/profile.png"
            alt="Avatar"
            width={100}
            height={100}
            className={styles.avatar}
          />
        </div>
        <h2 className={styles.userName}>Olá, {user.nome}</h2>
        <p className={styles.userSub}>Membro desde 2025</p>
      </div>

      {/* Ações */}
      <div className={styles.actions}>
        <button
          className={styles.optionBtn}
          onClick={() => router.push("/editar-perfil")}
        >
          Editar Perfil
        </button>

        <button
          className={styles.optionBtn}
          onClick={() => router.push("/meus-cartoes")}
        >
          Meus Cartões
        </button>

        <button
          className={`${styles.optionBtn} ${styles.logoutBtn}`}
          onClick={handleLogout}
        >
          Sair
        </button>

        <button
          className={`${styles.optionBtn} ${styles.deleteBtn}`}
          onClick={deletarConta}
        >
          Excluir Conta
        </button>
      </div>
    </div>
  );
}
