import EditPerfil from "@/Components/EditPerfil";
import MenuMob from "../../Components/MenuMobile";
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer"
import styles from "./EditPerfilPage.module.css"

export default function Page() {
  return (
    <>
     <div className={styles.mobile}>
        <MenuMob />

        <EditPerfil />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />

        <EditPerfil />

        <Footer/>
      </div>
    </>
  );
}
