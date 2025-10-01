import Comprar from '@/Components/Comprar';
import MenuMob from '../../../Components/MenuMobile';
import HeaderDesk from '../../../Components/HeaderDesk';
import styles from './ComprarPage.module.css';
import Footer from '@/Components/Footer';

export default function Page({ params }) {
  const { slug } = params;

  return (
    <>
      <div className={styles.mobile}>
        <MenuMob />
      </div>

      <Comprar slug={slug} />

      <div className={styles.desktop}>
        <HeaderDesk />
        <Footer />
      </div>
    </>
  );
}
