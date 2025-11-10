This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:
aaaaaaaaaaaaaaaaaaaaaaaaaaa
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


"use client";

import styles from './notificacao.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Notificacao() {
  const router = useRouter();

  return (
    <>
    <div className={styles.container}>

      {/* Header Mobile */}
      <header className={styles.headerMobile}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
          </button>
          <span className={styles.headerTitle}>Notificação</span>
        </div>
        <Image className={styles.logo} src="/logos/pngPRETO.png" alt="Void Logo" width={110} height={40} />
      </header>

      {/* Header Desktop */}
      <div className={styles.headerDesktop}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
        </button>
        <h1 className={styles.headerTitle}>Notificação</h1>
      </div>


        <div className={styles.notcontainer}>
            <div className={styles.semmsg}>
                <Image src="/symbols/usuario/notifications2.svg" alt='Notificação' width={50} height={50} />
                <h1>Você não tem notificações</h1>
            </div>
        </div>

        <div className={styles.notcards}>
            <div className={styles.card}>
                <Image src="/produtos/CamisaPreta.png" alt="CamisaPreta" width={30} height={30} />
                <h2>Compra Realizada com sucesso</h2>

                <a href="#" onClick={(e) => { e.preventDefault(); setShowBox(!showBox); }} style={{ color: "blue", cursor: "pointer" }}>
                    <Image src="/symbols/usuario/list.svg" alt='Png' width={30} height={30} />
                </a>

                <div
                style={{
                    padding: "1rem",
                    borderRadius: "0 20px 20px 20px",
                    width: "200px",
                    backgroundColor: " #FFF ",
                    opacity: showBox ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    pointerEvents: showBox ? "auto" : "none",
                    color: "black",
                }}>
                {showBox && (
                    <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                        <li><input type="checkbox"/>  Marcar como lido</li>
                        <li>Ver mais</li>
                        </ul> 
                )}
                </div>

            </div>
        </div>


    </div>
    </>

    )
}