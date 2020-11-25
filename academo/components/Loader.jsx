import styles from "./styles/loader.module.scss"

export default function Loader() {
    return (
        <div className={styles.lds_grid}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}
