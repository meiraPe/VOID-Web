import Notificacao from "../../Components/Notificacao";
import MenuMob from "../../Components/MenuMobile";
import HeaderDesk from "../../Components/HeaderDesk";
import Footer from "@/Components/Footer";
import styles from './NotificacaoPage.module.css';


export default function Page() {
  return (
    <div className={styles.pageContainer}> {/* Ensure the page container takes full height */}
      <div className={styles.mobile}>
        <MenuMob />

        <Notificacao/>
      </div>

      <div className={styles.desktop}> {/* Wrap desktop content in a flex container */}
        <HeaderDesk />

        <div className={styles.content}> {/* Ensure content pushes footer to the bottom */}
          <Notificacao />
        </div>

        <Footer/>
      </div>
    </div>
  );
}