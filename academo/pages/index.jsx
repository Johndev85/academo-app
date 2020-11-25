import Head from "next/head"
import styles from "../styles/home.module.scss"
import Header from "../components/Header"
import Login from "../pages/login"
import fetch from "isomorphic-unfetch"
import useSWR from "swr"
import App from "./app"
import Loader from "../components/Loader"

export default function Home() {
    let loggedIn
    const { data, revalidate } = useSWR("/api/me", async function (args) {
        const res = await fetch(args)
        return res.json()
    })
    try {
        if (!data)
            return (
                <div className={styles.loader}>
                    <Loader />
                </div>
            )
        loggedIn = false
        if (data.username) {
            loggedIn = true
        }
    } catch (error) {
        console.log(error)
    }
    return (
        <>
            {loggedIn && (
                <div className={styles.container}>
                    <Head>
                        <title>Academo - Home</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <main className={styles.main}>
                        <Header data={data} revalidate={revalidate} />
                        <App />
                    </main>
                </div>
            )}
            {!loggedIn && <Login />}
        </>
    )
}
