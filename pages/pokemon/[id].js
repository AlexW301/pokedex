import Image from "next/image";
import styles from "../../styles/PokemonPage.module.css";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import Link from "next/link";

const Pokemon = ({ data, speciesData, evolutionData, evOne }) => {
  const id = data.id
  const pokemoneDescription = speciesData.flavor_text_entries[0].flavor_text;

  // Evolutions
  const [formOne, setFormOne] = useState(null);
  const [formTwo, setFormTwo] = useState(null);
  const [formThree, setFormThree] = useState(null);

  // Level Ups
  const [levelUpOne, setLevelUpOne] = useState(null);
  const [triggerOne, setTriggerOne] = useState(null);

  const [levelUpTwo, setLevelUpTwo] = useState(null);
  const [triggerTwo, setTriggerTwo] = useState(null);

  useEffect(() => {
    const getEvolutionOne = async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await res.json();
      setFormOne(data);
    };

    const getEvolutionTwo = async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await res.json();
      setFormTwo(data);
    };

    const getEvolutionThree = async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await res.json();
      setFormThree(data);
    };

    if (evolutionData.chain.species.url) {
      getEvolutionOne(evolutionData.chain.species.url.split("/")[6]);
    }
    if (evolutionData.chain.evolves_to[0]) {
      getEvolutionTwo(
        evolutionData.chain.evolves_to[0].species.url.split("/")[6]
      );
      //
      //Get evolution requirments
      const evoDetails = evolutionData.chain.evolves_to[0].evolution_details[0];
      //filter through evo requirments for a true value
      Object.keys(evoDetails).forEach((key) => {
        if (evoDetails[key]) {
          if (key !== "trigger") {
            //console.log(key, evoDetails[key])
            setLevelUpOne([key, evoDetails[key]]);
          }
          if (key === "trigger") {
            //console.log(key, evoDetails[key])
            setTriggerOne(evoDetails[key]);
          }
        }
      });
      // console.log(levelUpOne, triggerOne);
      //
      if (evolutionData.chain.evolves_to[0].evolves_to[0]) {
        getEvolutionThree(
          evolutionData.chain.evolves_to[0].evolves_to[0].species.url.split(
            "/"
          )[6]
        );
        //
        //Get evolution requirments
        const evoDetails =
          evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0];
        //filter through evo requirments for a true value
        Object.keys(evoDetails).forEach((key) => {
          if (evoDetails[key]) {
            if (key !== "trigger") {
              //console.log(key, evoDetails[key])
              setLevelUpTwo([key, evoDetails[key]]);
            }
            if (key === "trigger") {
              //console.log(key, evoDetails[key])
              setTriggerTwo(evoDetails[key]);
            }
          }
        });
        // console.log(levelUpTwo, triggerTwo);
        //
      }
    }
  }, []);

  const types = data.types.map((el) => el.type.name);
  return (
    <div className={styles.container}>
      <p className={styles.id}>#{id}</p>
      <div className={styles.card}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          height={400}
          width={400}
          alt="pokemon"
        />
        <h2 className={styles.name}>{data.name}</h2>
      </div>

      <div className={styles.info}>
        <div className={styles.infoDetails}>
          <h1 className={styles.title}>{data.name}</h1>
          <div className={styles.tagContainer}>
          {types.map((el) => (
            <p className={styles.typeTag} key={el}>{el} </p>
          ))}
          </div>
          <p className={styles.pokeText}>{pokemoneDescription.split('')}</p>
        </div>

        {/**************** EVOLUTION CONTAINER **********************/}
        <h2 className={styles.evolutionTree}>Evolution Tree</h2>
        <div className={styles.evolutionSection}>
          <div className={styles.evSlotOne}>
            {formOne && (
              <>
                <Link href={`/pokemon/${formOne.id}`}>
                  <Image
                    src={`${formOne.sprites.front_default}`}
                    height={150}
                    width={150}
                    alt="evolution"
                    className={styles.sprite}
                  />
                </Link>
                <div className={styles.evDetails}>
                  <h3>{formOne.name}</h3>
                  {triggerOne && <p>Trigger: {triggerOne.name}</p>}
                  {/* if levelupone contains an object Ex. held item, Onix */}
                  {levelUpOne && typeof levelUpOne !== "number" && (
                    <>
                      <p>{levelUpOne[0]}</p>
                      <p>{levelUpOne[1].name}</p>
                    </>
                  )}
                  {/* check type of number!!! */}
                  {levelUpOne && typeof levelUpOne[1] === "number" && (
                    <>
                      <p>{levelUpOne[1]}</p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={styles.evSlotTwo}>
            {formTwo && (
              <>
                <FaAngleDoubleRight className={styles.rightArrow} />
                <Link href={`/pokemon/${formTwo.id}`}>
                  <Image
                    src={`${formTwo.sprites.front_default}`}
                    height={150}
                    width={150}
                    alt="evolution"
                    className={styles.sprite}
                  />
                </Link>
                <h3 className={styles.formTwoName}>{formTwo.name}</h3>
                <div className={styles.evDetails}>
                  {triggerTwo && <p>Trigger: {triggerTwo.name}</p>}
                  {/* if levelupone contains an object Ex. held item, Onix */}
                  {levelUpTwo && typeof levelUpTwo[1] !== "number" && (
                    <>
                      <p>{levelUpTwo[0]}</p>
                      <p>{levelUpTwo[1].name}</p>
                    </>
                  )}
                  {levelUpTwo && typeof levelUpTwo[1] === "number" && (
                    <>
                      <p>{levelUpTwo[1]}</p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={styles.evSlotThree}>
            {formThree && (
              <>
                <FaAngleDoubleRight className={styles.rightArrow} />
                <Link href={`/pokemon/${formThree.id}`}>
                  <Image
                    src={`${formThree.sprites.front_default}`}
                    height={150}
                    width={150}
                    alt="evolution"
                    className={styles.sprite}
                  />
                </Link>
                <div className={styles.evDetails}>
                  <h3>{formThree.name}</h3>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Evolutions */}
      </div>
    </div>
  );
};

export default Pokemon;

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();

  const species = data.species.url;

  const resSpecices = await fetch(`${species}`);
  const speciesData = await resSpecices.json();

  const resEvolution = await fetch(`${speciesData.evolution_chain.url}`);
  const evolutionData = await resEvolution.json();

  return {
    props: {
      data,
      speciesData,
      evolutionData,
    },
  };
}
