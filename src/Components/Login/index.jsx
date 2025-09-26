"use client";

import styles from './Login.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      
      {/* Coluna esquerda - Área de login */}
      <div className={styles.loginArea}>

        {/* Header (aparece só no mobile) */}
        <header className={styles.headerMobile}>
          <div className={styles.leftGroup}>
            <button className={styles.backBtn} onClick={() => router.back()}>
              <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
            </button>
            <span className={styles.title}>Login</span>
          </div>
          <Image className={styles.logo} src="/logos/pngPRETO.png" alt="Void Logo" width={110} height={40} />
        </header>

        {/* Header para desktop */}
        <div className={styles.headerDesktop}>
        <button className={styles.backBtn} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
        </button>
        <h1 className={styles.title}>Login</h1>
        </div>

        {/* Opções de Login */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Logue com sua conta:</h2>

          {/* Inputs de login */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Digite seu email" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" className={styles.input} />
          </div>

          {/* Termos */}
          <div className={styles.terms}>
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              Você concorda com os <b>Termos de Uso</b> e <b>Políticas de privacidade</b> da Void?
            </label>
          </div>

          {/* Captcha fake */}
          <div className={styles.captcha}>
            <input type="checkbox" id="captcha" />
            <label htmlFor="captcha">Não sou um robô</label>
            <div className={styles.captchaLogo}>
              <Image src="/symbols/recaptcha.png" alt="captcha" width={40} height={40} />
            </div>
          </div>

          <button className={styles.loginBtn}>
            Entrar
          </button>

          <Link href="/signin" className={styles.haveAccount}>Ainda não tenho cadastro</Link>
        </section>
      </div>

      {/* Coluna direita - Banner */}
      <div className={styles.banner}>
        <Image
          src="/placeholders/bannerSignin.jpg"
          alt="Banner Signin"
          width={400}
          height={400}
          priority
        />
      </div>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <h2>COMPRE E VENDA COM MAIOR COMODIDADE</h2>
        <div className={styles.stores}>
          <Link href="#"><Image src="/placeholders/googleplay.png" alt="Google Play" width={140} height={42} /></Link>
          <Link href="#"><Image src="/placeholders/appstore.png" alt="Apple Store" width={140} height={42} /></Link>
        </div>

        <div className={styles.mockups}>
          <Image src="/placeholders/mockup1.png" alt="App Mockup 1" width={300} height={190} priority />
        </div>
      </footer>
    </div>
  );
}
