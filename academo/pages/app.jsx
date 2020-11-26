import Footer from "../components/Footer"
import ReactPlayer from "react-player/youtube"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import cookie from "js-cookie"

import styles from "../styles/app.module.scss"
import { useState } from "react"

const App = () => {
    const [comment, setComment] = useState("")

    const messageComment = () => {
        toast.info("Pendiente por implementar - Guardar comentarios", {
            autoClose: 5000,
        })
        toast.success("Gracias", {
            autoClose: 5000,
        })
    }

    function handler(e) {
        e.preventDefault()
        console.log(comment)
        messageComment()
    }

    return (
        <>
            <article className={styles.container}>
                <section className={styles.container__video}>
                    <h1>the heretic</h1>
                    <h3>
                        Unity’s High Definition Rendering Pipeline, features
                        advanced effects created with the VFX Graph
                    </h3>
                    <div className={styles.container__video__playerWrapper}>
                        <ReactPlayer
                            className={
                                styles.container__video__playerWrapper__reactPlayer
                            }
                            url={"https://www.youtube.com/watch?v=iQZobAhgayA"}
                            width="100%"
                            height="100%"
                            controls={true}
                        />
                    </div>
                    <section className={styles.container__video__comments}>
                        <h2>Comentarios</h2>
                    </section>
                </section>
                <form className={styles.container__formComments}>
                    <label>Deja tu comentario:</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setComment(e.target.value)
                        }}
                    />
                    <div className={styles.container__formComments__btn}>
                        <button onClick={handler}>Enviar</button>
                    </div>
                </form>
                <ToastContainer position="top-center" />
            </article>

            <Footer />
        </>
    )
}

export default App
