"use client";

import styles from './Usuario.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Usuario() {
  const router = useRouter();

  return (
    <div className={styles.container}>

        
        {/* Header (aparece só no mobile) */}
        
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.leftGroup}>
                    <button className={styles.backBtn} onClick={() => router.back()}>
                        <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
                    </button>
                    <span className={styles.title}>USUÁRIO</span>
                </div>

                <Image 
                    className={styles.logo} 
                    src="/logos/pngPRETO.png" 
                    alt="Void Logo" 
                    width={110} 
                    height={40} 
                />
            </header>

        <div className={styles.infolinks}>

            <div className={styles.info1}>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/user-icon.svg" alt="Usuário" width={40} height={40}/> <h2>NOME DE USUÁRIO</h2> </Link>

            </div>

            <div className={styles.info2}>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/notifications.svg" alt="Notificação" width={35} height={35}/> <h2>Notificação</h2> </Link>

            </div>

            <div className={styles.info3}>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/cart.svg" alt="Compras" width={35} height={35}/> <h2>Compras</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/trending-up-outline.svg" alt="Vendas" width={35} height={35}/> <h2>Vendas</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/pricetag.svg" alt="Makret" width={35} height={35}/> <h2>Market</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/lock-closed.svg" alt="Closet" width={35} height={35}/> <h2>Closet</h2> </Link>

            </div>

            <div className={styles.info4}>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/chatbox.svg" alt="Mensagens" width={35} height={35}/> <h2>Mensagens</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/location-sharp.svg" alt="Endereços" width={35} height={35}/> <h2>Endereços</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/heart.svg" alt="Favoritos" width={35} height={35}/> <h2>Favoritos</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/finger-print.svg" alt="Documentos" width={35} height={35}/> <h2>Documentos</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/calendar-clear.svg" alt="Eventos" width={35} height={35}/> <h2>Eventoss</h2> </Link>

            </div>

            <div className={styles.info5}>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/qr-code.svg" alt="Qr-code" width={35} height={35}/> <h2>Ler tag de autentidade</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/logo-usd.svg" alt="Cupons" width={35} height={35}/> <h2>Cupons</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/settings-sharp.svg" alt="Confguração" width={35} height={35}/> <h2>Configuração</h2> </Link>

                <Link href="#" className={styles.link}> <Image src="/symbols/usuario/log-in.svg" alt="Sair" width={35} height={35}/> <h2>Sair</h2> </Link>

            </div>


        </div>

    </div>


  );
};