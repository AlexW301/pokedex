import styles from "../styles/Header.module.css"
import Link from "next/link";
import Image from "next/image"
import SearchBar from '../components/SearchBar'


const Header = () => {
    return (
        <>
        <div className={styles.container}>
        <Link href={`/`}>
            <div className={styles.logo}>
            <div className={styles.pictureContainer}>
            <Image src="/images/pokeball.png" height='30px' width='30px' alt="logo" />
            </div>
            <h1 className={styles.header}>Pòkedex</h1>
            </div>
        </Link>
        </div>
        <SearchBar />
        </>
    )
}

export default Header;