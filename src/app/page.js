import Signin from "./Components/Signin";
import MenuMob from "./Components/MenuMobile";
import HeaderDesk from "./Components/HeaderDesk";
import styles from './page.module.css';

export default function Page() {
  return (
    <>  
      <div className={styles.mobile}>
        <MenuMob/>  
        
      </div>

      <div className={styles.desktop}>
        <HeaderDesk/>
      </div>

      <Signin/>
      
    </>
  );
}
