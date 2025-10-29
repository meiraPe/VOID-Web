import Perfil from "@/Components/Perfil";
import MenuMob from "../../Components/MenuMobile";
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer"
import styles from "./PerfilPage.module.css"

export default function Page() {
  return (
    <>
     <div className={styles.mobile}>
        <MenuMob />

        <Perfil />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />

        <Perfil />

        <Footer/>
      </div>
    </>
  );
}
