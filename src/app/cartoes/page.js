import Cartoes from "@/Components/Cartoes";
import HeaderDesk from "@/Components/HeaderDesk";
import Footer from "@/Components/Footer";
import styles from "./CartoesPage.module.css";

export default function Page() {
  return (
    <>
      <HeaderDesk />
      <Cartoes />
      <Footer />
    </>
  );
}