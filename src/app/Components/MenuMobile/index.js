import Styles from './MenuMobile.module.css';
import Link  from 'react-router-dom';
import Image from 'next/image';

export default function HeaderMob() {
    return (
        <header className={Styles.header}>
            <nav className={Styles.nav}>
                <Link href="#">
                    <Image
                        className={Styles.img}
                        src="/symbols/roupas.svg"
                        alt="Produtos"
                        width={40}   
                        height={40}
                        priority    
                    />
                </Link>

                <Link href="#">
                    <Image
                        className={Styles.img}
                        src="/symbols/Pasta.svg"
                        alt="Categorias"
                        width={40}
                        height={40}
                    />
                </Link>

                <Link href="#">
                    <Image
                        className={Styles.img}
                        src="/symbols/Sacola.svg"
                        alt="Sacola"
                        width={40}
                        height={40}
                    />
                </Link>

                <Link href="#">
                    <Image
                        className={Styles.img}
                        src="/symbols/Profile.svg"
                        alt="Profile"
                        width={40}
                        height={40}
                    />
                </Link>
            </nav>
        </header>
    );
}
