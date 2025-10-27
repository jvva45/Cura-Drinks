import styles from "@/componentes/Header/Header.module.css";


export default function Header() {
    return (
<header className={styles.header}>
  {/* Div da esquerda (vazia, para empurrar o centro) */}
  <div /> 

  {/* Div central */}
  <div className={styles.center}>
    <h1>Cura Drinks</h1>

  </div>

  {/* Div da direita */}
  <div className={styles.user}>
    <h1>Usuário</h1>
   
  </div>
</header>

    )
}