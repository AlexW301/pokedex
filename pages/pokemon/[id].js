import Image from "next/image";
import styles from "../../styles/PokemonPage.module.css"

const Pokemon = ({data, speciesData, evolutionData}) => {
    console.log(evolutionData)
    if(evolutionData.chain.evolves_to[0]) {
        console.log(evolutionData.chain.evolves_to[0].species.name)
    }
    if(evolutionData.chain.evolves_to[0].evolves_to[0]) {
        console.log(evolutionData.chain.evolves_to[0].evolves_to[0].species.name)
    }
    const types = data.types.map((el) => el.type.name)
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} height={400} width={400} alt="pokemon" />
                <h2 className={styles.name}>{data.name}</h2>
            </div>

            <div className={styles.info}>
                <h1 className={styles.title}>{data.name}</h1>
                {types.map((el) => (
                    <p key={el}>{el}   </p>
                ))}
                {evolutionData.chain.evolves_to[0] && (
                    <p>{evolutionData.chain.evolves_to[0].species.name}</p>
                )}
                {evolutionData.chain.evolves_to[0].evolves_to[0] && (
                    <p>{evolutionData.chain.evolves_to[0].evolves_to[0].species.name}</p>
                )}
            </div>
            
        </div>
    )
}

export default Pokemon;


export async function getServerSideProps({query: {id}}) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()

    const species = data.species.url

    const resSpecices = await fetch(`${species}`)
    const speciesData = await resSpecices.json()


    const resEvolution = await fetch(`${speciesData.evolution_chain.url}`)
    const evolutionData = await resEvolution.json()

    console.log(evolutionData)
    
    return {
        props: {
            data,
            speciesData,
            evolutionData
        }
    }
}
