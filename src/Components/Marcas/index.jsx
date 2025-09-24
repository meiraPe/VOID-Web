import Image from "next/image";
import styles from "./Marcas.module.css";

export default function Marcas({imagemUrl}) {
  return(
        <div className={styles.brands}>

         <div className={styles.brandItem}> 
            <Image src={imagemUrl} 
            alt="Marcas" 
            width={180} 
            height={80} 
            className={styles.brandLogo}
            />
          </div>

        </div>
  )
}
