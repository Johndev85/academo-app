import styles from "../styles/login.module.scss"

const Login = () => {
    return (
        <article className={styles.container}>
            <header className={styles.container__headerLogin}>
                <h1>academo</h1>
                <h2>Inicia sesión</h2>
            </header>
            <form
                action=""
                method="get"
                className={styles.container__formLogin}
            >
                <label htmlFor="">Usuario</label>
                <input type="text" />
                <label htmlFor="">Contraseña</label>
                <input type="text" />
                <span>¿Olvidaste la contraseña?</span>
                <div className={styles.container__formLogin__button}>
                    <button>Ingresar</button>
                </div>
            </form>
            <footer className={styles.container__footerLogin}>
                <span>¿No tienes cuenta?</span>
                <a href="http://">Regístrate</a>
            </footer>
        </article>
    )
}

export default Login
