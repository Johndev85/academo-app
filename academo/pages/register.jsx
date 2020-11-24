import styles from "../styles/register.module.scss"
import Link from "next/link"

const Login = () => {
    return (
        <article className={styles.container}>
            <header className={styles.container__headerLogin}>
                <h1>academo</h1>
                <h2>Nuevo Registro</h2>
            </header>
            <form
                action=""
                method="get"
                className={styles.container__formLogin}
            >
                <label placeholder="Digite un usuario">Usuario</label>
                <input type="text" />
                <label placeholder="Digite una contraseña">Contraseña</label>
                <input type="text" />
                <div className={styles.container__formLogin__button}>
                    <button>Crear Usuario</button>
                </div>
            </form>
            <footer className={styles.container__footerLogin}>
                <span>¿Ya tienes cuenta?</span>
                <Link href="/login">
                    <a>Inicia Sesión</a>
                </Link>
            </footer>
        </article>
    )
}

export default Login
