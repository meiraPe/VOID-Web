"use client";

import styles from './Usuario.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sacola() {
    const router = useRouter();

    return (
        <div className={styles.container}>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.leftGroup}>
                    <button className={styles.backBtn} onClick={() => router.back()}>
                        <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
                    </button>
                    <span className={styles.title}>SACOLA</span>
                </div>

                <Image 
                    className={styles.logo} 
                    src="/logos/pngPRETO.png" 
                    alt="Void Logo" 
                    width={110} 
                    height={40} 
                />
            </header>

            <div className={styles.userinfo}>

                <div className={styles.info1}>

                    <Link href="#"> <Image src="/symbols/usuario/user-icon.svg" alt="Usuario" width={40} height={40}/> <h2>NOME DE USUÁRIO</h2> </Link>

                </div>

                <div className={styles.info2}>

                    <Link href="#"> <Image src="/symbols/usuario/notifications.svg" alt="Notificação" width={30} height={30}/> <h2>Notificação</h2> </Link>
                    
                </div>

                <div className={styles.info3}>

                    <Link href="#"> <Image src="/symbols/usuario/cart.svg" alt="Compras" width={30} height={30}/> <h2>Compras</h2> </Link>
                    
                </div>

                <div className={styles.info4}>
                    
                </div>

                <div className={styles.info5}>
                    
                </div>

            </div>

        </div>
    );
};