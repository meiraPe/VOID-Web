import MenuMob from "../../Components/MenuMobile";
import HeaderDesk from "../../Components/HeaderDesk"
import MarcasSection from "../../Components/MarcasSection"
import Footer from "../../Components/Footer"
import styles from "./MarcasPage.module.css"

export default function Page() {
  return (
    <>
      <div className={styles.mobile}>
        <MenuMob />

        <MarcasSection/>
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />

        <MarcasSection />

        <Footer/>
      </div>
    </>
  );
}
