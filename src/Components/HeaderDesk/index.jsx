"use client";

import styles from "./HeaderDesk.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HeaderDesk() {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSidebarMarcas, setShowSidebarMarcas] = useState(false);
  const [closingSidebar, setClosingSidebar] = useState(false);
  const [closingMarcas, setClosingMarcas] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const menuRef = useRef(null);

  // --- Verifica se há token salvo ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUsuarioLogado(!!token);
  }, []);

  // --- Fecha dropdown se clicar fora ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Fecha com ESC ---
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        handleCloseSidebar();
        handleCloseSidebarMarcas();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // --- Abertura e fechamento com animação ---
  const handleCloseSidebar = () => {
    if (!showSidebar) return;
    setClosingSidebar(true);
    setTimeout(() => {
      setShowSidebar(false);
      setClosingSidebar(false);
    }, 400);
  };

  const handleCloseSidebarMarcas = () => {
    if (!showSidebarMarcas) return;
    setClosingMarcas(true);
    setTimeout(() => {
      setShowSidebarMarcas(false);
      setClosingMarcas(false);
    }, 400);
  };

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
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              <Image src="/logos/pngBRANCO.png" alt="Logo" width={100} height={40} />
            </Link>

            <nav className={styles.nav}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (showSidebarMarcas) handleCloseSidebarMarcas();
                  else {
                    setShowSidebar(false);
                    setShowSidebarMarcas(true);
                  }
                }}
              >
                Marcas
              </Link>

              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (showSidebar) handleCloseSidebar();
                  else {
                    setShowSidebarMarcas(false);
                    setShowSidebar(true);
                  }
                }}
              >
                Categorias
              </Link>

              <Link href="/sacola">Sacola</Link>
            </nav>
          </div>

          <div className={styles.right} ref={menuRef}>
            <div className={styles.searchBox}>
              <Image src="/symbols/Search.svg" alt="Buscar" width={18} height={18} />
              <input type="text" placeholder="Search" className={styles.searchInput} />
            </div>

            <Image
              onClick={() => setShowBox((prev) => !prev)}
              style={{ cursor: "pointer" }}
              className={styles.profileImg}
              src="/symbols/Profile.svg"
              alt="Perfil"
              width={30}
              height={30}
            />

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
                    <Link href="/perfil">Meu Perfil</Link>
                    <Link href="/cartoes">Meus Cartões</Link>
                    <Link href="/favoritos">Favoritos</Link>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                      Sair
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* === Overlay === */}
      {(showSidebar || showSidebarMarcas) && (
        <div className={styles.overlay} onClick={() => {
          handleCloseSidebar();
          handleCloseSidebarMarcas();
        }}></div>
      )}

      {/* === Sidebar Marcas === */}
      {(showSidebarMarcas || closingMarcas) && (
        <aside
          className={`${styles.sidebarMarcas} ${
            showSidebarMarcas
              ? styles.sidebarEnter
              : closingMarcas
              ? styles.sidebarExit
              : ""
          }`}
        >
          <div className={styles.part}>
            <div className={styles.close}>
              <h1>MARCAS</h1>
              <li>
                <img
                  src="/symbols/usuario/x-circle.svg"
                  alt=""
                  onClick={handleCloseSidebarMarcas}
                  style={{ cursor: "pointer" }}
                />
              </li>
            </div>
            <div>
              <h2>A</h2>
                <ul>
                  <li>Adidas</li>
                  <li>Asics</li>
                  <li>Air Jordan</li>
                  <li>Air Max</li>
                </ul>
            </div>
            <div>
              <h2>B</h2>
                <ul>
                  <li>Bape</li>
                  <li>Balenciaga</li>
                </ul>
            </div>

            <div>
              <h2>C</h2>
                <ul>
                  <li>Converse</li>
                  <li>Corteiz</li>
                  <li>Calvin Klein</li>
                </ul>
            </div>  
            
            <div>
              <h2>N</h2>
                <ul>
                  <li><Link href="/marcas">Nike</Link></li>
                  <li>New Balance</li>
                </ul>
            </div>

            <div>
              <h2>P</h2>
                <ul>
                  <li>Puma</li>
                  <li>Prada</li>
                </ul>
            </div>

            <div>
              <h2>R</h2>
                <ul>
                  <li>Reebok</li>
                  <li>Raf Simons</li>
                </ul>
            </div>

            <div>
              <h2>V</h2>
                <ul>
                  <li>Vans</li>
                  <li>Valentino</li>
                </ul>
            </div>
          </div>
        </aside>
      )}

      {/* === Sidebar Categorias === */}
      {(showSidebar || closingSidebar) && (
        <aside
          className={`${styles.sidebar} ${
            showSidebar
              ? styles.sidebarEnter
              : closingSidebar
              ? styles.sidebarExit
              : ""
          }`}
        >
          <div className={styles.part}>
            <div className={styles.close}>
              <h1>SNEAKERS</h1>
              <li>
                <img
                  src="/symbols/usuario/x-circle.svg"
                  alt=""
                  onClick={handleCloseSidebar}
                  style={{ cursor: "pointer" }}
                />
              </li>
            </div>
            <ul><li>Tênis</li></ul>
          </div>
        </aside>
      )}
    </>
  );
}
