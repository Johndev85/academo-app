import styles from "../styles/login.module.scss"
import Link from "next/link"
import * as Yup from "yup"
import { Formik, Field, Form, ErrorMessage } from "formik"

const formSchema = Yup.object().shape({
    username: Yup.string()
        .required("Campo requerido")
        .max(25, "Maximum 25 characters"),
    password: Yup.string()
        .required("Campo requerido")
        .min(5, "Mínimo  5 caracteres"),
})

const Login = () => {
    return (
        <article className={styles.container}>
            <header className={styles.container__headerLogin}>
                <h1>academo</h1>
                <h2>Inicia sesión</h2>
            </header>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                <Form className={styles.container__formLogin}>
                    <label htmlFor="">Usuario</label>
                    <Field
                        type="text"
                        name="username"
                        aria-label="name"
                        placeholder="Nombre"
                        className={styles.container__formLogin__input}
                    />
                    <ErrorMessage
                        name="username"
                        component="span"
                        className={styles.register__form__messageError}
                    />

                    <label htmlFor="">Contraseña</label>
                    <Field
                        type="password"
                        name="password"
                        aria-label="password"
                        placeholder="Contraseña"
                        className={styles.container__formLogin__input}
                    />
                    <ErrorMessage
                        name="password"
                        component="span"
                        className={styles.register__form__messageError}
                    />
                    <span>¿Olvidaste la contraseña?</span>
                    <div className={styles.container__formLogin__button}>
                        <button type="submit">Ingresar</button>
                    </div>
                </Form>
            </Formik>
            <footer className={styles.container__footerLogin}>
                <span>¿No tienes cuenta?</span>
                <Link href="/register">
                    <a>Regístrate</a>
                </Link>
            </footer>
        </article>
    )
}

export default Login
