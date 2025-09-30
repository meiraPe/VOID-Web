import Signin from "../../Components/Signin";
import MenuMob from "../../Components/MenuMobile";
import HeaderDesk from "../../Components/HeaderDesk";
import styles from './SigninPage.module.css'
import Footer from "@/Components/Footer";

export default function Page() {
  return (
    <>
      <div className={styles.mobile}>
        <MenuMob />

        <Signin />
      </div>

      <div className={styles.desktop}>
        <HeaderDesk />

        <Signin />

        <Footer/>
      </div>
    </>
  );
}
