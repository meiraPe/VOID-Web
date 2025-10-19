"use client";

import { useState } from "react";
import styles from "./Signin.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();

  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [popup, setPopup] = useState({ show: false, message: "", success: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3333/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setPopup({
          show: true,
          message: "Usuário cadastrado com sucesso!",
          success: true,
        });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setPopup({
          show: true,
          message: data.erro || "Erro ao cadastrar usuário.",
          success: false,
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        message: "Erro de conexão com o servidor.",
        success: false,
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Popup */}
      {popup.show && (
        <div
          className={`${styles.popup} ${
            popup.success ? styles.success : styles.error
          }`}
        >
          {popup.message}
        </div>
      )}

      {/* Coluna esquerda - Área de cadastro */}
      <div className={styles.loginArea}>
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

        <section className={styles.section}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <p className={styles.subtitle}>Preencha todos os campos:</p>

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

            <div className={styles.termsBox}>
              <div className={styles.terms}>
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  Você concorda com os <b>Termos de Uso</b> e{" "}
                  <b>Políticas de privacidade</b> da Void?
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

      <div className={styles.banner}>
        <Image
          src="/placeholders/bannerSignin.jpg"
          alt="Banner Signin"
          width={400}
          height={400}
          priority
        />
      </div>

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
