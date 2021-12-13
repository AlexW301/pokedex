import styles from "../styles/SearchBar.module.css"

const SearchBar = () => {
    return (
        <div className={styles.container}>
            <form>
                <input placeholder="Search Pokemon" type='text' id='search' className={styles.search} />
            </form>
        </div>
    )
}

export default SearchBar;