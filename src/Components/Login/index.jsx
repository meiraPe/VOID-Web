"use client";

import { useState } from "react";
import styles from "./Login.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [popup, setPopup] = useState({ show: false, message: "", success: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3333/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Resposta da API de login:", data);

      if (res.ok) {
        // Monta objeto completo do usuário com token
        const usuario = {
          id: data.id,
          nome: data.nome,
          email: data.email,
          token: data.token,
        };

        // Salva no localStorage
        localStorage.setItem("usuario", JSON.stringify(usuario));

        // Mostra popup de sucesso
        setPopup({
          show: true,
          message: "Login realizado com sucesso!",
          success: true,
        });

        // Fecha popup e redireciona
        setTimeout(() => {
          setPopup({ ...popup, show: false });
          router.push("/");
        }, 1000);
      } else {
        setPopup({
          show: true,
          message: data.error || "Email ou senha incorretos.",
          success: false,
        });
        setTimeout(() => setPopup({ ...popup, show: false }), 3000);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setPopup({
        show: true,
        message: "Erro de conexão com o servidor.",
        success: false,
      });
      setTimeout(() => setPopup({ ...popup, show: false }), 3000);
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
            <span className={styles.title}>Login</span>
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
          <h1 className={styles.title}>Login</h1>
        </div>

        {/* Formulário */}
        <section className={styles.section}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <p className={styles.subtitle}>Logue com sua conta:</p>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.termsBox}>
              <div className={styles.terms}>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  Você concorda com os <b>Termos de Uso</b> e{" "}
                  <b>Políticas de privacidade</b> da Void?
                </label>
              </div>
            </div>

            <div className={styles.captcha}>
              <input type="checkbox" id="captcha" />
              <label htmlFor="captcha">Não sou um robô</label>
              <div className={styles.captchaLogo}>
                <Image
                  src="/symbols/recaptcha.png"
                  alt="captcha"
                  width={40}
                  height={40}
                />
              </div>
            </div>

            <button type="submit" className={styles.loginBtn}>
              Entrar
            </button>
          </form>

          <Link href="/signin" className={styles.haveAccount}>
            Ainda não tenho cadastro
          </Link>
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
