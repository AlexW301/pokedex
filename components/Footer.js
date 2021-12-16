import styles from "../styles/Footer.module.css"
import Link from "next/link"

const Footer = () => {
    return (
        <div className={styles.container}>
            <Link href={`https://github.com/AlexW301`} passHref>
            <p className={styles.developer}>Created By: Alex Waller</p>
            </Link>
            <Link href={`https://pokeapi.co/`} passHref>
            <p className={styles.poweredBy}>Powered By: The Poke Api</p>
            </Link>
        </div>
    )
}

export default Footer;