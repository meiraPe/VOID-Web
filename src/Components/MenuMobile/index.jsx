"use client"
import { useEffect, useState, useRef } from 'react';
import styles from './MenuMobile.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuMob() {
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
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

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        if (showBox) handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showBox]);

  const handleToggle = () => {
    if (showBox) {
      handleClose();
    } else {
      setShowBox(true);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowBox(false);
      setIsClosing(false);
    }, 250); // mesmo tempo da animação
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
              className={`${styles.dropup} ${isClosing ? styles.closing : styles.opening}`}
            >
              <Link href="/login">Entrar</Link>
              <Link href="/signin">Criar Conta</Link>
              <Link href="/notifications">Notificações</Link>
              <button className={styles.logoutBtn}>Sair</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
