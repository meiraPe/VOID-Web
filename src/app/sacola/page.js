import Sacola from "@/Components/Sacola";
import MenuMob from "../../Components/MenuMobile";
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer"
import styles from "./SacolaPage.module.css"

export default function Page() {
  return (
    <>
     <div className={styles.mobile}>
        <MenuMob />

        <Sacola />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />

        <Sacola />

        <Footer/>
      </div>
    </>
  );
}
