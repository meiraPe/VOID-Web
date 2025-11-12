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
  const [usuario, setUsuario] = useState(null);
  const menuRef = useRef(null);

  // --- Verifica se o usuário está logado ---
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

  // --- Logout ---
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setUsuarioLogado(false);
    setShowBox(false);
    router.push("/login");
  };

  // --- Excluir conta ---
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
      const resposta = await fetch(`http://localhost:3333/usuarios/${usuario.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });

      if (resposta.ok) {
        alert("Conta excluída com sucesso.");
        localStorage.removeItem("usuario");
        router.push("/login");
      } else {
        const erro = await resposta.json();
        alert("Erro ao excluir conta: " + (erro.error || "Erro desconhecido."));
      }
    } catch (erro) {
      console.error("Erro ao excluir conta:", erro);
      alert("Erro ao excluir conta. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
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
              <Image
                src="/symbols/Search.svg"
                alt="Buscar"
                width={18}
                height={18}
              />
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
              />
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
                    <Link href="/editPerfil">Editar Perfil</Link>
                    <Link href="/cartoes">Meus Cartões</Link>
                    <Link href="/favoritos">Favoritos</Link>

                    <button
                      className={styles.logoutBtn}
                      onClick={handleLogout}
                    >
                      Sair
                    </button>

                    {/* --- Novo botão de excluir conta --- */}
                    <button
                      className={styles.deleteBtn}
                      onClick={handleDeleteAccount}
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ff4444",
                        color: "white",
                        border: "none",
                        padding: "8px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Excluir conta
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
        <div
          className={styles.overlay}
          onClick={() => {
            handleCloseSidebar();
            handleCloseSidebarMarcas();
          }}
        ></div>
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
                <li>
                  <Link href="/marcas">Nike</Link>
                </li>
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
            <ul>
              <li>Tênis</li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}
