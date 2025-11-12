import Favoritos from "@/Components/Favoritos";
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer";
import MenuMob from "@/Components/MenuMobile";
import styles from "./FavoritosPage.module.css";

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mobile}>
        <MenuMob />
        <Favoritos />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />
        <Favoritos />
        <Footer />
      </div>
    </div>
  );
}
