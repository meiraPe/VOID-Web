"use client";

import styles from "./HeaderDesk.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HeaderDesk() {
  const router = useRouter();
  const [showSidebarMarcas, setShowSidebarMarcas] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const menuRef = useRef(null);

  // Verifica se há token no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUsuarioLogado(!!token);
  }, []);

  // Controle de scroll para esconder/mostrar header
  useEffect(() => {
    const handleScroll = () => {
      setShowMenu(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fecha sidebar ao clicar fora ou apertar ESC
  useEffect(() => {
    const handleClickOutsideSidebar = (e) => {
      if (e.target.classList.contains(styles.sidebarOverlay)) setShowSidebar(false);
    };
    const handleEscapeKey = (e) => { if (e.key === "Escape") setShowSidebar(false); };
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

  // Fecha sidebar marcas ao clicar fora ou apertar ESC
  useEffect(() => {
    const handleClickOutsideSidebar = (e) => {
      if (e.target.classList.contains(styles.sidebarMarcasOverlay)) setShowSidebarMarcas(false);
    };
    const handleEscapeKey = (e) => { if (e.key === "Escape") setShowSidebarMarcas(false); };
    if (showSidebarMarcas) {
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
  }, [showSidebarMarcas]);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    setUsuarioLogado(false);
    setShowBox(false);
    router.push("/login");
  };

  return (
    <>
      <header className={`${styles.header} ${showMenu ? styles.visible : styles.hidden}`}>
        <div className={styles.inner}>
          {/* Logo + Nav */}
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              <Image src="/logos/pngBRANCO.png" alt="Logo" width={100} height={40} />
            </Link>
            <nav className={styles.nav}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSidebarMarcas((prev) => !prev);
                  setShowSidebar(false);
                }}
              >
                Marcas
              </Link>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSidebar((prev) => !prev);
                  setShowSidebarMarcas(false);
                }}
              >
                Categorias
              </Link>
              <Link href="/sacola">Sacola</Link>
            </nav>
          </div>

          {/* Busca + Perfil */}
          <div className={styles.right} ref={menuRef}>
            <div className={styles.searchBox}>
              <Image src="/symbols/Search.svg" alt="Buscar" width={18} height={18} style={{ marginRight: "0.4rem" }} />
              <input type="text" placeholder="Search" className={styles.searchInput} />
            </div>

            <Image
              onClick={() => setShowBox(!showBox)}
              style={{ cursor: "pointer" }}
              className={styles.profileImg}
              src="/symbols/Profile.svg"
              alt="Perfil"
              width={30}
              height={30}
            />

            {/* Dropdown */}
            {showBox && (
              <div className={styles.dropdown}>
                {!usuarioLogado ? (
                  <>
                    <Link href="/login">Entrar</Link>
                    <Link href="/signin">Criar Conta</Link>
                  </>
                ) : (
                  <>
                    <Link href="/notificacao">Notificações</Link>
                    <button className={styles.logoutBtn} onClick={handleLogout}>Sair</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {showSidebar && <div className={styles.sidebarOverlay}></div>}
      {showSidebarMarcas && <div className={styles.sidebarMarcasOverlay}></div>}

      {/* Sidebar Marcas */}
      {showSidebarMarcas && (
        <div className={`${styles.sidebarMarcas} ${showSidebarMarcas ? styles.open : ""}`}>
          <button className={styles.closeBtn} onClick={() => setShowSidebarMarcas(false)}>Fechar</button>
          <div className={styles.part}>
            <div className={styles.close}>
              <h1>MARCAS</h1>
              <li>
                <img
                  src="/symbols/usuario/x-circle.svg"
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowSidebarMarcas(false)}
                />
              </li>
            </div>
            <div>
              <h1>A</h1>
              <ul>
                <li>Adidas</li>
                <li>Asics</li>
                <li>Air Jordan</li>
                <li>Air Max</li>
              </ul>
            </div>
            <div>
              <h1>B</h1>
              <ul>
                <li>Bape</li>
                <li>Balenciaga</li>
              </ul>
            </div>
            <div>
              <h1>C</h1>
              <ul>
                <li>Converse</li>
                <li>Corteiz</li>
                <li>Calvin Klein</li>
              </ul>
            </div>
            <div>
              <h1>F</h1>
              <ul>
                <li>Fila</li>
                <li>FeRrari</li>
              </ul>
            </div>
            <div>
              <h1>J</h1>
              <ul>
                <li>Jordan</li>
              </ul>
            </div>
            <div>
              <h1>N</h1>
              <ul>
                <li><Link href="/marcas">Nike</Link></li>
                <li>New Balance</li>
              </ul>
            </div>
            <div>
              <h1>O</h1>
              <ul>
                <li>Oakley</li>
              </ul>
            </div>
            <div>
              <h1>P</h1>
              <ul>
                <li>Puma</li>
                <li>Prada</li>
              </ul>
            </div>
            <div>
              <h1>V</h1>
              <ul>
                <li>Vans</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Categorias */}
      {showSidebar && (
        <div className={`${styles.sidebar} ${showSidebar ? styles.open : ""}`}>
          <button className={styles.closeBtn} onClick={() => setShowSidebar(false)}>Fechar</button>

          <div className={styles.part}>
            <div className={styles.close}><h1>SNEAKERS</h1>
              <li>
                <img
                  src="/symbols/usuario/x-circle.svg"
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowSidebar(false)}
                />
              </li>
            </div>
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
