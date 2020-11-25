import styles from "./styles/header.module.scss"
import cookie from "js-cookie"

const Header = ({ data, revalidate }) => {
    return (
        <header className={styles.header}>
            <h1>academo</h1>
            <nav className={styles.header__user}>
                <ul>
                    <li>
                        <p>{data.username}</p>
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
