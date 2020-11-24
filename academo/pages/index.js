import Head from "next/head"
import styles from "../styles/home.module.scss"

import App from "../pages/app"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Academo</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <App />
            </main>
        </div>
    )
}
