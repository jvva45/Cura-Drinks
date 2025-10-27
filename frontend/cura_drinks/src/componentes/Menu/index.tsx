// Menu.jsx
import styles from "./Menu.module.css";
import MenuLink from "@/componentes/Menu/MenuLink";


export default function Menu() {
  return (
    <aside className={styles.menu}>
      <nav>

        <div className={styles.meunuTitulo}>
          <h2>Gestão de Produtos </h2>
          <li> <MenuLink to="/dashboard/produtos">Produtos</MenuLink></li>
        </div>

        <div className={styles.meunuTitulo}>
          <h3>Planner</h3>
          <ul>
            <li><MenuLink to="/dashboard/categorias">Categorias</MenuLink></li>
            <li><MenuLink to="/dashboard/categoria">Unidade De Medidas</MenuLink></li>
          </ul>

        </div>


        <ul>


          {/* Renderização condicional: só aparece se showDetailsLink for true */}

        </ul>

        <div className={styles.logout}>
          <button>Sair</button>
        </div>
      </nav>
    </aside>
  );
}
