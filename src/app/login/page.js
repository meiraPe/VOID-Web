import Login from '@/Components/Login';
import MenuMob from '../../Components/MenuMobile';
import HeaderDesk from '../../Components/HeaderDesk';
import styles from './LoginPage.module.css';
import Footer from '@/Components/Footer';


export default function Page() {
  return (
    <>
      <div className={styles.mobile}>
      <MenuMob />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />
      </div>
      
      <Login />
      
      <Footer/>
    </>
  );
}