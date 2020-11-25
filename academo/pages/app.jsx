import Footer from "../components/Footer"
import ReactPlayer from "react-player/youtube"

import styles from "../styles/app.module.scss"

const App = () => {
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
            </article>

            <Footer />
        </>
    )
}

export default App
