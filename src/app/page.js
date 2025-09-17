import Signin from "./Components/Signin";
import MenuMob from "./Components/MenuMobile";
import HeaderDesk from "./Components/HeaderDesk";
import styles from './page.module.css';
import Sacola from "./Components/Sacola";
import Home from "./Components/Homepage"

export default function Page() {
  return (
    <>  
      <div className={styles.mobile}>
        <MenuMob/>  
        
      </div>

      <div className={styles.desktop}>
        <HeaderDesk/>
      </div>

      <Home/>

      <Signin/>

      <Sacola/>
      
    </>
  );
}

