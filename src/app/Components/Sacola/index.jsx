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

                <Image 
                    className={styles.logo} 
                    src="/logos/pngPRETO.png" 
                    alt="Void Logo" 
                    width={110} 
                    height={40} 
                />
            </header>

            {/* Sacola */}
            <section className={styles.sacola}>

                {/* Compras Pendentes */}
                <div className={styles.pendente}>
                    <div className={styles.info}>
                        <div className={styles.line}></div>
                        <h1>COMPRAS PENDENTES</h1>
                        <div className={styles.line}></div>
                    </div>

                    <div className={styles.produtos}>
                        <div className={styles.card}>
                            <Image 
                                src="/produtos/CamisaBranca.png" 
                                alt="Camisa Branca" 
                                width={130} 
                                height={130} 
                            />   

                            <div className={styles.detalhes}>
                                <h2>Camiseta Cold Blanks<br />Heavy Oversized Off</h2>
                                <p>Cor: Bege</p>
                                <div className={styles.size}>
                                    <span>P</span>
                                </div>
                            </div>

                            <div className={styles.payment}>
                                <div className={styles.infopay}>
                                    <h3>INICIADO</h3>
                                </div>

                                <div className={styles.price}>
                                    <p>R$</p>
                                    <h2>89,00</h2>
                                </div> 

                                <p className={styles.pedido}>PEDIDO #00001</p>

                                <div className={styles.actions}>
                                    <button className={styles.cancelBtn}>CONTINUAR COMPRA</button>
                                    <Link href="/checkout">
                                        <Image src="/symbols/nav-arrow-right.svg" alt="Continuar" width={20} height={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compras Pagas */}
                <div className={styles.finalizado}>
                    <div className={styles.info}>
                        <div className={styles.line}></div>
                        <h1>COMPRAS PAGAS</h1>
                        <div className={styles.line}></div>
                    </div>

                    <div className={styles.produtos}>
                        <div className={styles.card}>
                            <Image 
                                src="/produtos/CamisaPreta.png" 
                                alt="Camisa Preta" 
                                width={130} 
                                height={130} 
                            />   

                            <div className={styles.detalhes}>
                                <h2>Camiseta Cold Blanks<br />Heavy Oversized Off</h2>
                                <p>Cor: Preto</p>
                                <div className={styles.size}>
                                    <span>GG</span>
                                </div>
                            </div>

                            <div className={styles.payment}>
                                <div className={styles.infopaid}>
                                    <h3>PAGO</h3>
                                </div>

                                <div className={styles.price}>
                                    <p>R$</p>
                                    <h2>89,00</h2>
                                </div>

                                <p className={styles.pedido}>PEDIDO #00002</p>

                                <div className={styles.actions}>
                                    <button className={styles.cancelBtn}>CONTINUAR COMPRA</button>
                                    <Link href="/checkout">
                                        <Image src="/symbols/nav-arrow-right.svg" alt="Continuar" width={20} height={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
