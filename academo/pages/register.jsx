import Head from "next/head"
import styles from "../styles/register.module.scss"
import Link from "next/link"
import * as Yup from "yup"
import { Formik, Field, Form, ErrorMessage } from "formik"
import cookie from "js-cookie"
import Router from "next/router"
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

const Register = () => {
    function handleSubmit(form) {
        fetch("./api/users", {
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
                        Router.push("/")
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
                <header className={styles.container__headerRegister}>
                    <h1>Academo</h1>
                    <h2>Nuevo Registro</h2>
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
                        <label>Nuevo Usuario</label>
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
                        <label>Contraseña</label>
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
                        <div className={styles.container__formLogin__button}>
                            <button>Crear Usuario</button>
                        </div>
                        <ToastContainer />
                    </Form>
                </Formik>

                <footer className={styles.container__footerLogin}>
                    <span>¿Ya tienes cuenta?</span>
                    <Link href="/login">
                        <a>Inicia Sesión</a>
                    </Link>
                </footer>
            </article>
        </>
    )
}

export default Register
