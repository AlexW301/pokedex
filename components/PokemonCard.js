import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PokemonCard.module.css"

const PokemonCard = ({ pokemon }) => {
  const splitUrl = pokemon.url.split("/");
  const pokeNum = splitUrl[6];
  return (
    <Link href={`/pokemon/${pokeNum}`}>
    <div className={styles.container}>
    <p className={styles.pokeNum}>#{pokeNum}</p>
    <div className={styles.imageContainer}>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`}
        alt="pokemon"
        height={200}
        width={200}
      />
      </div>
      <h2 className={styles.name}>{pokemon.name}</h2>
    </div>
    </Link>
  );
};
export default PokemonCard;
