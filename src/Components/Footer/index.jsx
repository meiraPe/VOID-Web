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
            <Image className={styles.img1} 
            src="/placeholders/googleplay.png" 
            alt="Google Play"
            width={120}  
            height={60} 
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>

            <Image className={styles.img1} 
            src="/placeholders/appstore.png" 
            alt="App Store"
            width={120}  
            height={60}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>
          </div>
        </div>

        {/* Grupo 2 - Ajuda */}
        <div className={styles.group2}>
          <h2>AJUDA</h2>
          <p>Dúvidas Gerais</p>
          <p>Atendimento e Suporte</p>
          <p>Trocas e Devoluções</p>
          <p>Termos de Uso</p>
          <Image className={styles.img2}
          src="logos/ReclameAQUI.png"
          alt="reclameAQUI"
          width={120}  
          height={60}
          priority
          style={{ objectFit: "contain" }} 
          unoptimized/>
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
            <Image className={styles.img4} 
            src="#" 
            alt="Instagram" 
            width={120}  
            height={60}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>

            <Image className={styles.img4} 
            src="symbols/facebook.png" 
            alt="Facebook" 
            width={120}  
            height={60}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>

            <Image className={styles.img4} 
            src="#" 
            alt="Twitter" 
            width={120}  
            height={60}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>

            <Image className={styles.img4} 
            src="#" 
            alt="Tiktok" 
            width={120}  
            height={60}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>

          </div>

          <h2>FORMAS DE PAGAMENTO</h2>
          <div className={styles.payments}>
            <Image className={styles.img5} 
            src="#" 
            alt="Visa" 
            width={30}  
            height={30}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>
            
            <Image className={styles.img5} 
            src="#" 
            alt="MasterCard"
            width={30}  
            height={30}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>
            
            <Image className={styles.img5} 
            src="#" 
            alt="Elo"
            width={30}  
            height={30}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>
            
            <Image className={styles.img5}
            src="#" 
            alt="Amex"
            width={30}  
            height={30}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>
            
            <Image className={styles.img5} 
            src="#" 
            alt="Pix"
            width={30}  
            height={30}
            priority
            style={{ objectFit: "contain" }} 
            unoptimized/>

          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className={styles.bottom}>
        <div className={styles.lang}>
          <Image 
          src="#" 
          alt="Português - BR" 
          width={60}  
          height={60}
          priority
          style={{ objectFit: "contain" }} 
          unoptimized/>
          
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


