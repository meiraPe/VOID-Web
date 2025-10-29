import Cartoes from "@/Components/Cartoes";
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer";
import MenuMob from "@/Components/MenuMobile"; // Import missing component
import styles from "./CartoesPage.module.css";

export default function Page() {
  return (
    <div className={styles.pageContainer}> {/* Wrap content in a main container */}
      <div className={styles.mobile}>
        <MenuMob />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />
        <Cartoes />
        <Footer />
      </div>
    </div>
  );
}