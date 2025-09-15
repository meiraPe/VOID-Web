"use client";

import styles from './Sacola.module.css';
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

                <Image className={styles.logo} src="/logos/pngPRETO.png" alt="Void Logo" width={110} height={40} />
            </header>

            {/* Sacola */}
            <section className={styles.sacola}>

                <div className={styles.pendente}>
                    <div className={styles.info}>
                        <div className={styles.line}></div>
                        <h1>COMPRAS A PAGAR</h1>
                        <div className={styles.line}></div>
                    </div>

                    {/* Produtos */}
                    <div className={styles.produtos}>
                        <div className={styles.card}>
                            <Image className={styles.logo} src="/produtos/CamisaBranca.png" alt="Camisa-Branca" width={110} height={110} />   

                            <div className={styles.detalhes}>
                                <h2>Camiseta Cold Blanks<br></br> Heavy Oversized Off </h2>
                                <h2>Bege</h2>
                                <div className={styles.size}>
                                <h1>P</h1>
                                </div>
                            </div>

                            <div className={styles.payment}>

                                <div className={styles.infopay}>
                                    <h2>INICIADO</h2>
                                </div>

                                <div className={styles.price}>
                                    <p>R$</p>
                                    <h2>89,00</h2>
                                </div>

                                <h1 className={styles.pedido}>PEDIDO #00001</h1>

                                <div className={styles.actions}>
                                    <button className={styles.cancelBtn}>CONTINUAR COMPRA</button>

                                    <a href="#"><Image src="/symbols/nav-arrow-right.svg" alt="Continuar" width={20} height={20} /></a>
                                </div>
                            </div>
                                
                        </div>
                    </div>

                </div>

                <div className={styles.finalizado}>
                    <div className={styles.info}>
                        <div className={styles.line}></div>
                        <h1>COMPRAS PAGAS</h1>
                        <div className={styles.line}></div>
                    </div>

                    {/* Produtos */}
                    <div className={styles.produtos}>
                        <div className={styles.card}>
                            <Image className={styles.logo} src="/produtos/CamisaBranca.png" alt="Camisa-Branca" width={110} height={110} />   

                            <div className={styles.detalhes}>
                                <h2>Camiseta Cold Blanks<br></br> Heavy Oversized Off </h2>
                                <h2>Bege</h2>
                                <div className={styles.size}>
                                <h1>P</h1>
                                </div>
                            </div>

                            <div className={styles.payment}>

                                <div className={styles.infopaid}>
                                    <h2>INICIADO</h2>
                                </div>

                                <div className={styles.price}>
                                    <p>R$</p>
                                    <h2>89,00</h2>
                                </div>

                                <h1>PEDIDO #00001</h1>

                                <div className={styles.actions}>
                                    <button className={styles.cancelBtn}>CONTINUAR COMPRAR</button>

                                    <Image src="/symbols/nav-arrow-right.svg" alt="Continuar" width={20} height={20} />
                                </div>
                            </div>
                                
                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}
