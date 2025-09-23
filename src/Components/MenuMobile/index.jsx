"use client"
import { useEffect, useState } from 'react';
import styles from './MenuMobile.module.css';
import Link  from 'next/link';
import Image from 'next/image';

export default function MenuMob() {
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
        <header className={`${styles.menu} ${showMenu ? styles.visible : styles.hidden}`}>
            <nav className={styles.nav}>
                <Link href="/prudutos">
                    <Image
                        className={styles.img}
                        src="/symbols/roupas.svg"
                        alt="Produtos"
                        width={40}   
                        height={40}
                        priority    
                    />
                </Link>

                <Link href="/categorias">
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

                <Link href="/perfil">
                    <Image
                        className={styles.img}
                        src="/symbols/Profile.svg"
                        alt="Profile"
                        width={40}
                        height={40}
                    />
                </Link>
            </nav>
        </header>
    );
}
