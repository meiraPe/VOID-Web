"use client"

import styles from './Footer.module.css';
import Link  from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter();

    return (
        <div className={styles.Footer}>
            <div className={styles.container}>
                <div className={styles.group1}>
                    <div>
                        <h2>ENTRE EM CONTATO</h2>
                        <p>void.app@gamil.com</p>
                        <p>instagram:@Void.Brasil</p>
                    </div>

                    <div>
                        <h2>BAIXE O APP VØID</h2>
                        <img className={styles.img1} src="#" alt="#" />
                        <img className={styles.img1} src="#" alt="#" />
                    </div>
                </div>

                <div className={styles.group2}>
                    <h2>AJUDA</h2>
                    <p>Dúvidas Gerais</p>
                    <p>Atendimento e Suporte</p>
                    <p>Trocas e Devoluções</p>
                    <p>Termos de Uso</p>
                    <img className={styles.img2} src="#" alt="#" />
                </div>

                <div className={styles.group3}>
                    <h2>SOBRE A VØID</h2>
                    <p>Os Produtos São Originais?</p>
                    <p>Sobre Nós</p>
                    <p>Política da Loja</p>
                    <p>VØID Concept Store</p>
                </div>

                <div className={styles.group4}>
                    <h2>SOCIAL</h2>
                    <img className={styles.img4} src="#" alt="#" />
                    <img className={styles.img4} src="#" alt="#" />
                    <img className={styles.img4} src="#" alt="#" />
                    <img className={styles.img4} src="#" alt="#" />
                    <h2>FORMAS DE PAGAMENTO</h2>
                </div>

                <div className={styles.group5}>
                    <img className={styles.img5} src="#" alt="#" />


                </div>
            </div>
        </div>
    );
}

