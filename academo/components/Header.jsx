import styles from "./styles/header.module.scss"
import cookie from "js-cookie"

const Header = ({ data, revalidate }) => {
    return (
        <header className={styles.header}>
            <h1>Academo</h1>
            <nav className={styles.header__user}>
                <ul>
                    <li>
                        <h4>{data.username}</h4>
                    </li>
                </ul>
                <button
                    onClick={() => {
                        cookie.remove("token")
                        revalidate()
                    }}
                >
                    Cerrar sesión
                </button>
            </nav>
        </header>
    )
}

export default Header
