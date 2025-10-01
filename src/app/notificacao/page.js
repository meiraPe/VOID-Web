import Notificacao from "../../Components/Notificacao";
import MenuMob from "../../Components/MenuMobile";
import HeaderDesk from "../../Components/HeaderDesk";
import Footer from "@/Components/Footer";
import styles from './NotificacaoPage.module.css'


export default function Page() {
  return (
    <>
      <div className={styles.mobile}>
        <MenuMob />

        <Notificacao/>
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />

        <Notificacao />

        <Footer/>
      </div>
    </>
  );
}