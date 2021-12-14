import styles from "../styles/SearchBar.module.css";
import {useRouter} from "next/router";
import { useState, useContext } from "react";
import { OffsetContext } from './Layout'

const SearchBar = () => {
    const [search, setSearch] = useState('')
    const {offset, setOffset} = useContext(OffsetContext)

    const router = useRouter()

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     // console.log(search)
    //     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
    //     if(res.ok) {
    //         const data = await res.json()
    //         const id = await data.id
    //         router.push(`/pokemon/${id}`)
    //     } else {
    //         console.log('undefined')
    //     }
    // }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1118`)
        const data = await res.json()
        const pokemon = data.results
        const result = pokemon.find(el => el.name.includes(capitalizeFirstLetter(search)))
        if (result) {
            const split = result.url.split("/");
            const id = split[6]
            // router.push(`/pokemon/${id}`)
            setOffset(id-1)
            router.push(`/`)
        } else {
            router.push('/')
        }
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Pokemon" type='text' id='search' className={styles.search} />
            </form>
        </div>
    )
}

export default SearchBar;