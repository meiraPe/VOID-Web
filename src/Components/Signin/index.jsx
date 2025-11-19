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

  const [openModal, setOpenModal] = useState(null); // "terms", "privacy" ou null

  const closeModal = () => setOpenModal(null);

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
          className={`${styles.popup} ${popup.success ? styles.success : styles.error
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

            <div className={styles.wrapper}>
              <div className={styles.termsContainer}>
                <div className={styles.termsBox}>

                  <input type="checkbox" id="terms" required />
                  
                  <label htmlFor="terms">
                    Você concorda com os

                    <button
                      type="button"
                      className={styles.link}
                      onClick={() => setOpenModal("terms")}>
                      Termos de Uso
                    </button>

                    e

                    <button
                      type="button"
                      className={styles.link}
                      onClick={() => setOpenModal("privacy")}>
                      Políticas de Privacidade
                    </button>

                    da Void?

                  </label>
                  
                </div>
              </div>


              {openModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                  <div
                    className={styles.modalContent}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className={styles.modalTitle}>
                      {openModal === "terms" ? "Termos de Uso" : "Políticas de Privacidade"}
                    </h2>


                    <div className={styles.modalText}>
                      {openModal === "terms" && (
                        <p> <b>Última atualização: 2025</b><br /><br />

                          Bem-vindo à Void! Ao utilizar nossos serviços, você concorda com estes Termos de Uso. Leia atentamente antes de prosseguir.<br /><br />

                          <b>1. Aceitação dos Termos:</b><br />
                          Ao acessar, cadastrar-se ou utilizar qualquer funcionalidade da Void, você declara ter lido, compreendido e aceitado integralmente estes Termos de Uso.<br /><br />

                          <b>2. Definições:</b><br />
                          Usuário: pessoa que acessa ou utiliza a plataforma.<br />
                          Serviços: funcionalidades, conteúdos e produtos da Void.<br />
                          Conta: cadastro criado para utilização dos serviços.<br /><br />

                          <b>3. Uso da Plataforma:</b><br />
                          O usuário compromete-se a utilizar a plataforma de maneira ética e legal.<br />
                          É proibido:<br />
                          • Usar a plataforma para fins ilícitos;<br />
                          • Tentar burlar sistemas de segurança;<br />
                          • Reproduzir, copiar ou distribuir conteúdos sem autorização.<br /><br />

                          <b>4. Cadastro e Responsabilidades:</b><br />
                          O usuário é responsável por fornecer informações verdadeiras, manter seus dados atualizados e proteger suas credenciais de acesso.<br /><br />

                          <b>5. Propriedade Intelectual:</b><br />
                          Todos os logotipos, marcas, códigos, textos e conteúdos pertencem à Void e são protegidos por lei.<br /><br />

                          <b>6. Modificações:</b><br />
                          A Void pode alterar estes Termos a qualquer momento, com vigência imediata após publicação.<br /><br />

                          <b>7. Limitação de Responsabilidade:</b><br />
                          A Void não se responsabiliza por indisponibilidades temporárias, conteúdos enviados por usuários ou uso inadequado dos serviços.<br /><br />

                          <b>8. Encerramento de Conta:</b><br />
                          A Void pode encerrar contas que violem estes Termos.<br /><br />

                          <b>9. Contato:</b><br />
                          Para dúvidas, entre em contato com o suporte oficial da Void.</p>
                      )}


                      {openModal === "privacy" && (
                        <p>
                          <b>Última atualização: 2025</b><br /><br />

                          Esta Política explica como a Void coleta, usa e protege seus dados pessoais.<br /><br />

                          <b>1. Informações Coletadas:</b><br />
                          <u>Informações fornecidas pelo usuário:</u><br />
                          • Nome<br />
                          • E-mail<br />
                          • Telefone<br />
                          • Dados de cadastro<br /><br />

                          <u>Coletadas automaticamente:</u><br />
                          • Endereço IP<br />
                          • Tipo de dispositivo<br />
                          • Cookies<br />
                          • Dados de navegação<br /><br />

                          <b>2. Uso das Informações:</b><br />
                          Os dados podem ser utilizados para:<br />
                          • Criar e gerenciar contas;<br />
                          • Melhorar a experiência do usuário;<br />
                          • Garantir segurança;<br />
                          • Cumprir obrigações legais.<br /><br />

                          <b>3. Compartilhamento:</b><br />
                          Não vendemos dados pessoais.<br />
                          Podemos compartilhar com:<br />
                          • Parceiros de operação;<br />
                          • Autoridades legais;<br />
                          • Serviços de segurança e análise.<br /><br />

                          <b>4. Armazenamento e Segurança:</b><br />
                          Adotamos medidas de proteção, mas nenhum sistema é totalmente seguro. O usuário também deve proteger suas credenciais.<br /><br />

                          <b>5. Direitos do Usuário:</b><br />
                          Você pode solicitar:<br />
                          • Acesso aos dados;<br />
                          • Correção;<br />
                          • Exclusão;<br />
                          • Revogação de consentimento;<br />
                          • Portabilidade.<br /><br />

                          <b>6. Cookies:</b><br />
                          Utilizamos cookies para melhorar a experiência. Você pode gerenciar isso no navegador.<br /><br />

                          <b>7. Alterações da Política:</b><br />
                          A Política pode ser atualizada a qualquer momento.<br /><br />

                          <b>8. Contato:</b><br />
                          Para dúvidas sobre privacidade, contate o suporte oficial da Void.
                        </p>
                      )}
                    </div>


                    <button className={styles.closeButton} onClick={closeModal}>
                      Fechar
                    </button>
                  </div>
                </div>
              )}
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
