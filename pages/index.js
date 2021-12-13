import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {FaSortAmountUpAlt, FaSortAmountDownAlt, FaRandom, FaRedo} from 'react-icons/fa'
import PokemonCard from '../components/PokemonCard'
import { useEffect, useState } from 'react'

export default function Home({data, test}) {
  const [pokemon, setPokemon] = useState(data)
  const [offset, setOffset] = useState(0)
  
  useEffect(() => {
      async function getPokemon(offset) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
        const data = await res.json()
        setPokemon(data)
      }
      getPokemon(offset)
      window.scrollTo(0, 0)
  },[offset])

  const next = () => {
    setOffset(offset + 20)
  }

  const prev = () => {
      setOffset(offset - 20)
  }

  const shuffle = () => {
    setOffset(Math.floor(Math.random() * data.count))
  }

  const reset = () => {
    setOffset(0)
  }

  return (
    <div className={styles.container}>
        <div className={styles.topBar}>
           <h1>Pokedex</h1>
           <div className={styles.topBtns}>
           <button onClick={reset} className={styles.redoBtn}>
              <FaRedo className={styles.icon}/>
           </button>
           <button onClick={shuffle} className={styles.shuffleBtn}>
              <FaRandom className={styles.icon}/>
           </button>
           </div>
        </div>
        <div className={styles.pokemonContainer}>
          {pokemon.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <div className={styles.loadMore}>
          {offset >= 20 && (
              <button onClick={prev}>Previous</button>
          )}
            <button onClick={next}>Next</button>
        </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}