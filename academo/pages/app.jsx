import Footer from "../components/Footer"
import ReactPlayer from "react-player/youtube"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import cookie from "js-cookie"

import styles from "../styles/app.module.scss"

const App = () => {
    const welcome = () => {
        if (cookie.get("token")) {
            toast.success("Welcome!", {
                autoClose: 1500,
            })
        }
    }
    welcome()

    return (
        <>
            <article className={styles.container}>
                <section className={styles.container__video}>
                    <h1>the heretic</h1>
                    <ReactPlayer
                        url={"https://www.youtube.com/watch?v=iQZobAhgayA"}
                        width={600}
                        controls={true}
                    />
                    <section className={styles.container__video__comments}>
                        <h2>Comentarios</h2>
                    </section>
                </section>
                <form className={styles.container__formComments}>
                    <label>Comentarios:</label>
                    <input type="text" />
                    <div className={styles.container__formComments__btn}>
                        <button href="#">Enviar</button>
                    </div>
                </form>
                <ToastContainer position="top-center" />
            </article>

            <Footer />
        </>
    )
}

export default App
