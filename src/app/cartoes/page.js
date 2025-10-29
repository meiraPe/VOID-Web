import Cartoes from "@/Components/Cartoes";
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer";
import MenuMob from "@/Components/MenuMobile";
import styles from "./CartoesPage.module.css";

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mobile}>
        <MenuMob />
        <Cartoes />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />
        <Cartoes />
        <Footer />
      </div>
    </div>
  );
}
