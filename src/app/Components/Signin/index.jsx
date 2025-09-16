"use client";

import styles from './Signin.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signin() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>

                <div className={styles.leftGroup}>
                    <button className={styles.backBtn} onClick={() => router.back()}>
                        <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
                    </button>
                <span className={styles.title}>SIGN IN</span>
                </div>

                <Image className={styles.logo} src="/logos/pngPRETO.png" alt="Void Logo" width={110} height={40} />
            </header>

            {/* Opções de Login */}
            <section className={styles.section}>
                <h2 className={styles.subtitle}>Entre usando as seguintes opções:</h2>

                <button className={`${styles.option} ${styles.emailCode}`}>
                    <span className={styles.icon}>@</span>
                    <span className={styles.optionTitle}>Receber código no e-mail</span>
                </button>

                <button className={`${styles.option} ${styles.apple}`}>
                    <Image src="/symbols/apple.png" alt="Apple" width={24} height={24} />
                    <span className={styles.optionTitle}>Entrar com a Apple</span>
                </button>

                <button className={`${styles.option} ${styles.facebook}`}>
                    <Image src="/symbols/facebook.png" alt="Facebook" width={24} height={24} />
                    <span className={styles.optionTitle}>Entrar com Facebook</span>
                </button>

                <button className={`${styles.option} ${styles.google}`}>
                    <Image src="/symbols/google.png" alt="Google" width={24} height={24} />
                    <span className={styles.optionTitle}>Fazer login com o Google</span>
                </button>

                {/* Termos */}
                <div className={styles.terms}>
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        Você concorda com os <b>Termos de Uso</b> e <b>Políticas de privacidade</b> da Void?
                    </label>
                </div>

                <h3 className={styles.haveAccount}>Já tenho cadastro</h3>

                <button className={`${styles.option} ${styles.enterEmail}`}>
                    <Image src="/symbols/email.png" alt="Email" width={24} height={24} />
                    Entrar com e-mail
                </button>
            </section>

            {/* Rodapé */}
            <footer className={styles.footer}>
                <h2>COMPRE E VENDA COM MAIS COMODIDADE</h2>
                <div className={styles.stores}>
                    <Link href="#"><Image src="/placeholders/googleplay.png" alt="Google Play" width={140} height={42} /></Link>
                    <Link href="#"><Image src="/placeholders/appstore.png" alt="Apple Store" width={140} height={42} /></Link>
                </div>

                <div className={styles.mockups}>
                    <Image src="/placeholders/mockup1.png" alt="App Mockup 1" width={300} height={190} priority/>
                </div>
            </footer>
        </div>
    );
}
