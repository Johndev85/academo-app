import styles from "./styles/header.module.scss"

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>academo</h1>
            <div className={styles.header__user}>
                <h2>user</h2>
                <a href="">Cerrar sesión</a>
            </div>
        </header>
    )
}

export default Header
