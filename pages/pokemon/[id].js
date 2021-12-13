import Image from "next/image";

const Pokemon = ({data}) => {
    console.log(data)
    return (
        <div>
            {data.name}
            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} height={200} width={200} alt="pokemon" />
        </div>
    )
}

export default Pokemon;


export async function getServerSideProps({query: {id}}) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()
    return {
        props: {
            data
        }
    }
}
