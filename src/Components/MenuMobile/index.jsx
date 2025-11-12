"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./MenuMobile.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MenuMob() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const menuRef = useRef(null);

  // Detecta rolagem para esconder/mostrar menu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // --- Verifica login no localStorage ---
  useEffect(() => {
    try {
      const usuarioStr = localStorage.getItem("usuario");
      if (!usuarioStr) {
        setUsuarioLogado(false);
        return;
      }

      const usuarioObj = JSON.parse(usuarioStr);
      if (usuarioObj?.token) {
        setUsuario(usuarioObj);
        setUsuarioLogado(true);
      } else {
        setUsuarioLogado(false);
      }
    } catch (err) {
      console.error("Erro ao carregar dados do usuário:", err);
      setUsuarioLogado(false);
    }
  }, []);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        if (showBox) handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showBox]);

  // --- Alternar dropup ---
  const handleToggle = () => {
    if (showBox) handleClose();
    else setShowBox(true);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowBox(false);
      setIsClosing(false);
    }, 250);
  };

  // --- Logout ---
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setUsuarioLogado(false);
    setShowBox(false);
    router.push("/login");
  };

  // --- Deletar conta ---
  const handleDeleteAccount = async () => {
    if (!usuario?.id) {
      alert("Erro: usuário não encontrado.");
      return;
    }

    const confirmar = confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível."
    );
    if (!confirmar) return;

    try {
      console.log("Tentando excluir conta ID:", usuario.id);

      const resposta = await fetch(`http://localhost:3333/usuarios/${usuario.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });

      console.log("Status da resposta:", resposta.status);

      const dados = await resposta.json().catch(() => ({}));
      console.log("Resposta JSON:", dados);

      if (resposta.ok) {
        alert("Conta excluída com sucesso.");
        localStorage.removeItem("usuario");
        router.push("/login");
      } else {
        alert(
          "Erro ao excluir conta: " +
            (dados.error || dados.message || "Erro desconhecido.")
        );
      }
    } catch (erro) {
      console.error("Erro ao excluir conta:", erro);
      alert("Erro ao excluir conta. Verifique o console para mais detalhes.");
    }
  };

  return (
    <header
      className={`${styles.menu} ${showMenu ? styles.visible : styles.hidden}`}
      ref={menuRef}
    >
      <nav className={styles.nav}>
        <Link href="/">
          <Image
            className={styles.img}
            src="/symbols/home.png"
            alt="Home"
            width={50}
            height={50}
            priority
          />
        </Link>

        <Link href="/marcas">
          <Image
            className={styles.img}
            src="/symbols/Pasta.svg"
            alt="Categorias"
            width={40}
            height={40}
          />
        </Link>

        <Link href="/sacola">
          <Image
            className={styles.img}
            src="/symbols/Sacola.svg"
            alt="Sacola"
            width={40}
            height={40}
          />
        </Link>

        {/* Botão perfil com DropUp */}
        <div className={styles.profileWrapper}>
          <Image
            onClick={handleToggle}
            className={styles.img}
            src="/symbols/Profile.svg"
            alt="Profile"
            width={40}
            height={40}
            style={{ cursor: "pointer" }}
          />

          {showBox && (
            <div
              className={`${styles.dropup} ${
                isClosing ? styles.closing : styles.opening
              }`}
            >
              {!usuarioLogado ? (
                <>
                  <Link href="/login">Entrar</Link>
                  <Link href="/signin">Criar Conta</Link>
                </>
              ) : (
                <>
                  <Link href="/notificacao">Notificações</Link>
                  <Link href="/editPerfil">Editar Perfil</Link>
                  <Link href="/cartoes">Meus Cartões</Link>
                  <Link href="/favoritos">Favoritos</Link>

                  <button className={styles.logoutBtn} onClick={handleLogout}>
                    Sair
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={handleDeleteAccount}
                  >
                    Excluir Conta
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
