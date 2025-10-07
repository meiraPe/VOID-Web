"use client";

import styles from "./HeaderDesk.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function HeaderDesk() {
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideSidebar = (e) => {
      if (e.target.classList.contains(styles.sidebarOverlay)) {
        setShowSidebar(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutsideSidebar);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSidebar);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSidebar);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showSidebar]);

  useEffect(() => {
    const handleScroll = () => {
      if (showSidebar) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSidebar]);

  return (
    <>
      <header
        className={`${styles.header} ${showMenu ? styles.visible : styles.hidden}`}
      >
        <div className={styles.inner}>
          {/* Logo + Nav */}
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/logos/pngBRANCO.png"
                alt="Logo"
                width={100}
                height={40}
              />
            </Link>

            <nav className={styles.nav}>
              <Link href="/marcas">Marcas</Link>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSidebar((prev) => !prev); // Toggle sidebar
                }}
              >
                Categorias
              </Link>
              <Link href="/sacola">Sacola</Link>
            </nav>
          </div>

          {/* Busca + Perfil */}
          <div className={styles.right}>
            <div className={styles.searchBox}>
              <Image
                src="/symbols/Search.svg"
                alt="Buscar"
                width={18}
                height={18}
                style={{ marginRight: "0.4rem" }}
              />
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
              />
            </div>
            <Image
              onClick={(e) => {
                e.preventDefault();
                setShowBox(!showBox);
              }}
              style={{ color: "blue", cursor: "pointer" }}
              className={styles.profileImg}
              src="/symbols/Profile.svg"
              alt="Perfil"
              width={30}
              height={30}
            />

            {/* Dropdown */}
            {showBox && (
              <div className={styles.dropdown}>
                <Link href="/login">Entrar</Link>
                <Link href="/signin">Criar Conta</Link>
                <Link href="/notificacao">Notificações</Link>
                <button className={styles.logoutBtn}>Sair</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {showSidebar && <div className={styles.sidebarOverlay}></div>}

      {/* Sidebar */}
      {showSidebar && (
        <div className={`${styles.sidebar} ${showSidebar ? styles.open : ""}`}>
          <button className={styles.closeBtn} onClick={() => setShowSidebar(false)}>
            Fechar
          </button>

          <div className={styles.part}>
            <div className={styles.close}><h1>SNEAKERS</h1>
            <li>
    <img
      src="/symbols/usuario/x-circle.svg"
      alt=""
      style={{ cursor: "pointer" }}
      onClick={() => setShowSidebar(false)}
    />
  </li></div>

            <ul>
              <li>Tênis</li>
            </ul>
          </div>

          <div className={styles.part}>
            <h1>VESTUÁRIO</h1>
            <ul>
              <li>Camiseta</li>
              <li>Calça</li>
              <li>Boné</li>
              <li>Moletom</li>
              <li>Bermuda</li>
              <li>Corta Vento</li>
              <li>Meia</li>
            </ul>
          </div>

          <div className={styles.part}>
            <h1>ACESSÓRIOS</h1>
            <ul>
              <li>Mochila</li>
              <li>Chaveiro</li>
              <li>Relógio</li>
              <li>Carteira</li>
              <li>Óculos</li>
              <li>Anel</li>
              <li>Colar</li>
            </ul>
          </div>
        
        </div>
      )}
    </>
  );
}
