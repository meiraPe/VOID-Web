"use client";

import styles from "./HeaderDesk.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeaderDesk() {
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <header
      className={`${styles.header} ${showMenu ? styles.visible : styles.hidden}`}
    >
    
    <div className={styles.inner}>
        

      {/* Logo  + Nav */}
      <div className={styles.left}>  
      
        <Image
          className={styles.logo}
          src="/logos/pngBRANCO.png"
          alt="Logo"
          width={100}
          height={80}
        />

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
            className={styles.profileImg}
            src="/symbols/Profile.svg"
            alt="Perfil"
            width={30}
            height={30}
          />
        </div>
        </div>
    </header>
  );
}
