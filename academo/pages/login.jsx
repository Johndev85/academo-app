import Head from "next/head"
import styles from "../styles/login.module.scss"
import Link from "next/link"
import * as Yup from "yup"
import { Formik, Field, Form, ErrorMessage } from "formik"
import cookie from "js-cookie"
import { useRouter } from "next/router"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const formSchema = Yup.object().shape({
    username: Yup.string()
        .required("Campo requerido")
        .max(25, "Maximum 25 characters"),
    password: Yup.string()
        .required("Campo requerido")
        .min(5, "Mínimo  5 caracteres"),
})

const Login = () => {
    const router = useRouter()
    function handleSubmit(form) {
        fetch("./api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
            }),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data && data.error) {
                    toast.error(data.message, {
                        autoClose: 2000,
                    })
                }
                if (data && data.token) {
                    //asignamos la cookie
                    cookie.set("token", data.token, { expires: 2 })
                    toast.success("Sesión iniciada", {
                        autoClose: 1500,
                    })
                    setTimeout(() => {
                        router.push("/")
                    }, 2000)
                }
            })
    }

    return (
        <>
            <Head>
                <title>Academo - Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <article className={styles.container}>
                <header className={styles.container__headerLogin}>
                    <h1>Academo</h1>
                    <h2>Inicia sesión</h2>
                </header>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        handleSubmit(values)
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
                            className={
                                styles.container__formLogin__messageError
                            }
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
                            className={
                                styles.container__formLogin__messageError
                            }
                        />
                        <span>¿Olvidaste la contraseña?</span>
                        <div className={styles.container__formLogin__button}>
                            <button type="submit">Ingresar</button>
                        </div>
                        <ToastContainer />
                    </Form>
                </Formik>
                <footer className={styles.container__footerLogin}>
                    <span>¿No tienes cuenta?</span>
                    <Link href="/register">
                        <a>Regístrate</a>
                    </Link>
                </footer>
            </article>
        </>
    )
}

export default Login
