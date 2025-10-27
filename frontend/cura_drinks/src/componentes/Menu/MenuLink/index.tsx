import react from "react"
import styles from './MenuLink.module.css'
import { NavLink } from "react-router-dom"


interface MenuLinkProps {
    to: string;
    children: React.ReactNode;
}

export default function MenuLink({ children, to }: MenuLinkProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.LinkHighlighted}` : styles.link
            }>

            {children}

        </NavLink>
    )
}