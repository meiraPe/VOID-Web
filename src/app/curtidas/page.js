import Curtidas from "@/Components/Favoritos";
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer";
import MenuMob from "@/Components/MenuMobile";
import styles from "./FavoitosPage.module.css";

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mobile}>
        <MenuMob />
        <Curtidas />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />
        <Curtidas />
        <Footer />
      </div>
    </div>
  );
}
