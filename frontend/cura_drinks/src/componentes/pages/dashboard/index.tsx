import Header from "@/componentes/Header";
import Menu from "@/componentes/Menu";
import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
export default function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <main className={styles.dashboardMain}>
        {/* O Menu agora é o primeiro filho direto */}
        <Menu />

        {/* O Outlet é o segundo filho direto */}
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}