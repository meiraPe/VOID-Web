"use client";

import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className={styles.Footer}>
      <div className={styles.container}>
        {/* Grupo 1 - Contato e App */}
        <div className={styles.group1}>
          <div>
            <h2>ENTRE EM CONTATO</h2>
            <p>void.app@gmail.com</p>
            <p>instagram: @Void.Brasil</p>
          </div>

          <div className={styles.download}>
            <h2>BAIXE O APP VØID</h2>
            <img className={styles.img1} src="/placeholders/googleplay.png" alt="Google Play" />
            <img className={styles.img1} src="/placeholders/appstore.png" alt="App Store" />
          </div>
        </div>

        {/* Grupo 2 - Ajuda */}
        <div className={styles.group2}>
          <h2>AJUDA</h2>
          <p>Dúvidas Gerais</p>
          <p>Atendimento e Suporte</p>
          <p>Trocas e Devoluções</p>
          <p>Termos de Uso</p>
          <img className={styles.img2} src="/reclameaqui.png" alt="Reclame Aqui" />
        </div>

        {/* Grupo 3 - Sobre */}
        <div className={styles.group3}>
          <h2>SOBRE A VØID</h2>
          <p>Os Produtos São Originais?</p>
          <p>Sobre Nós</p>
          <p>Política da Loja</p>
          <p>VØID Concept Store</p>
        </div>

        {/* Grupo 4 - Social e Pagamento */}
        <div className={styles.group4}>
          <h2>SOCIAL</h2>
          <div className={styles.socialIcons}>
            <img className={styles.img4} src="/instagram.png" alt="Instagram" />
            <img className={styles.img4} src="/facebook.png" alt="Facebook" />
            <img className={styles.img4} src="/twitter.png" alt="Twitter" />
            <img className={styles.img4} src="/tiktok.png" alt="TikTok" />
          </div>

          <h2>FORMAS DE PAGAMENTO</h2>
          <div className={styles.payments}>
            <img className={styles.img5} src="/visa.png" alt="Visa" />
            <img className={styles.img5} src="/mastercard.png" alt="MasterCard" />
            <img className={styles.img5} src="/elo.png" alt="Elo" />
            <img className={styles.img5} src="/amex.png" alt="Amex" />
            <img className={styles.img5} src="/pix.png" alt="Pix" />
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className={styles.bottom}>
        <div className={styles.lang}>
          <img src="/brasil.png" alt="Português - BR" />
          <span>Português - BR</span>
        </div>
        <p>
          2025 © Droper Tecnologia e Serviços LTDA CNPJ 41.385.557/0001-75 <br />
          Av. Magalhães de Castro, 12.000, Loja 11, Terceiro Piso - Cidade Jardim, São Paulo - SP, 05502-001
        </p>
      </div>
    </footer>
  );
}


