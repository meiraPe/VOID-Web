"use client";

import { useState } from "react";
import styles from "./Signin.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmar: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastro enviado:", form);
  };

  return (
    <div className={styles.container}>
      {/* Coluna esquerda - Área de cadastro */}
      <div className={styles.loginArea}>
        {/* Header Mobile */}
        <header className={styles.headerMobile}>
          <div className={styles.leftGroup}>
            <button className={styles.backBtn} onClick={() => router.back()}>
              <Image
                src="/symbols/nav-arrow-left.svg"
                alt="Voltar"
                width={20}
                height={20}
              />
            </button>
            <span className={styles.title}>Sign-in</span>
          </div>
          <Image
            className={styles.logo}
            src="/logos/pngPRETO.png"
            alt="Void Logo"
            width={110}
            height={40}
          />
        </header>

        {/* Header Desktop */}
        <div className={styles.headerDesktop}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <Image
              src="/symbols/nav-arrow-left.svg"
              alt="Voltar"
              width={20}
              height={20}
            />
          </button>
          <h1 className={styles.title}>Sign-in</h1>
        </div>

        {/* Formulário */}
        <section className={styles.section}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <p className={styles.subtitle}>
              Preencha todos os campos:
            </p>


            
            <div className={styles.inputGroup}>
              <label htmlFor="nome">Nome completo</label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                name="senha"
                type="password"
                value={form.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmar">Confirmar senha</label>
              <input
                id="confirmar"
                name="confirmar"
                type="password"
                value={form.confirmar}
                onChange={handleChange}
                required
              />
            </div>

            {/* Termos */}
            <div className={styles.termsBox}>
              <div className={styles.terms}>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  Você concorda com os <b>Termos de Uso</b> e <b>Políticas de privacidade</b> da Void?
                </label>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Criar Conta
            </button>
          </form>

          <p className={styles.switch}>
            Já tem conta? <Link href="/login">Entrar</Link>
          </p>
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
          <Link href="#">
            <Image
              src="/placeholders/googleplay.png"
              alt="Google Play"
              width={140}
              height={42}
            />
          </Link>
          <Link href="#">
            <Image
              src="/placeholders/appstore.png"
              alt="Apple Store"
              width={140}
              height={42}
            />
          </Link>
        </div>
        <div className={styles.mockups}>
          <Image
            src="/placeholders/mockup1.png"
            alt="App Mockup 1"
            width={300}
            height={190}
            priority
          />
        </div>
      </footer>
    </div>
  );
}
