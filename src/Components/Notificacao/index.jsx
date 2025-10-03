"use client";

import styles from './notificacao.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Notificacao() {
  const router = useRouter();
    const [showBox, setShowBox] = useState(false);

  return (
    <>
    <div className={styles.container}>

{/* Header Mobile */}
      <header className={styles.headerMobile}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
          </button>
          <span className={styles.headerTitle}>Notificação</span>
        </div>
        <Image className={styles.logo} src="/logos/pngPRETO.png" alt="Void Logo" width={110} height={40} />
      </header>

      {/* Header Desktop */}
      <div className={styles.headerDesktop}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
        </button>
        <h1 className={styles.headerTitle}>Notificação</h1>
      </div>


        <div className={styles.notcontainer}>
            <div className={styles.semmsg}>
                <Image src="/symbols/usuario/notifications2.svg" alt='Notificação' width={80} height={80} />
                <h1>Você não tem notificações</h1>
            </div>
        </div>

        <div className={styles.notcards}>

            <div className={styles.card}>

                <div className={styles.cardSeparator}>
                <Image src="/produtos/CamisaPreta.png" alt="CamisaPreta" width={50} height={50} />
                <h2>Compra Realizada com sucesso</h2>
                </div>

                <a className={styles.cardAction} href="#" onClick={(e) => { e.preventDefault(); setShowBox(!showBox); }} style={{ color: "blue", cursor: "pointer" }}>
                    <Image src="/symbols/usuario/list.svg" alt='Png' width={30} height={30} />
                </a>

            </div>

            <div className={styles.card}>

                <div className={styles.cardSeparator}>
                <Image src="/produtos/CamisaBranca.png" alt="CamisaBranca" width={50} height={50} />
                <h2>Estará chegando em breve</h2>
                </div>

                <a className={styles.cardAction} href="#" onClick={(e) => { e.preventDefault(); setShowBox(!showBox); }} style={{ color: "blue", cursor: "pointer" }}>
                    <Image src="/symbols/usuario/list.svg" alt='Png' width={30} height={30} />
                </a>

            </div>


                <div
                style={{
                    padding: "1rem",
                    borderRadius: "0 20px 20px 20px",
                    width: "200px",
                    backgroundColor: " #FFF ",
                    opacity: showBox ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    pointerEvents: showBox ? "auto" : "none",
                    color: "black",
                }}>
                {showBox && (
                    <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                        <div className={styles.cardNew}>
                            <li src="#"><input type="checkbox"/>  Marcar como lido</li>
                            <li src="#">Ver mais</li>
                        </div>
                    </ul> 
                        
                )}
                </div>

            
        </div>


    </div>
    </>

    )
}