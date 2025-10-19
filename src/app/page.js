import MenuMob from "../Components/MenuMobile";
import HeaderDesk from "../Components/HeaderDesk";
import styles from "./page.module.css";
import Home from "../Components/Homepage";
import Footer from "../Components/Footer";

export default function Page() {
  return (
    <>
      <div className={styles.mobile}>
        <Home />
        <MenuMob />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />
        <Home />
        <Footer />
      </div>
    </>
  );
}
