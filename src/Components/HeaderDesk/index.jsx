"use client";

import styles from "./HeaderDesk.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function HeaderDesk() {
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBox, setShowBox] = useState(false);
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

  return (
    <header
      className={`${styles.header} ${showMenu ? styles.visible : styles.hidden}`}
    >
    
    <div className={styles.inner}>
        

      {/* Logo  + Nav */}
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
          <Link href="/categorias">Categorias</Link>
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
            e.preventDefault(); // evita reload da página
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
                <Link href="/notifications">Notificações</Link>
                <button className={styles.logoutBtn}>Sair</button>
              </div>
            )}
        </div>
        </div>
    </header>
  );
}
