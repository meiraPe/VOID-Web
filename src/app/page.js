import Image from "next/image";
import styles from "./page.module.css";
import Signin from "./Components/Signin";

export default function Home() {
  return (
    <div className={styles.page}>
      <Signin/>
    </div>
  );
}
