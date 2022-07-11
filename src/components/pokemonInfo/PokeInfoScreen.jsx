import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Waves from "./Waves";

const typeImages = new URL("../../media", import.meta.url).href;

const PokeInfoScreen = () => {
  const [pokemonInfo, setPokemonInfo] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => setPokemonInfo(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(pokemonInfo);

  return (
    <section className="bg">
      <div className="pokedex-container">
        <img
          src={`${typeImages}/logo.gif`}
          className="pokedex-logo-2"
          alt="logo"
        />
        <div className="pokedex-circle"></div>
      </div>
      <div className="pokeinfo">
        <div className="pokeinfo-skills">
          <h3>Abilities:</h3>
          {pokemonInfo?.abilities.map((e) => (
            <div key={e.ability.url}>
              <span>{e.ability.name}</span>
            </div>
          ))}
        </div>
        <div className="pokeinfo-image">
          <img
            src={pokemonInfo?.sprites.other["official-artwork"].front_default}
            alt="image"
          />
          <h1>{pokemonInfo?.name}</h1>
        </div>
        <div className="pokeinfo-stats">
          <h3>Stats:</h3>
          {pokemonInfo?.stats.map((stats) => (
            <div key={stats.stat.name}>
              <p>
                <span>{stats.stat.name}: </span>
                {stats.base_stat}
              </p>
            </div>
          ))}
          <div className="container-icons__padre">
          {pokemonInfo?.types.map((type) => (
            <div key={type.type.url} className="container-icons">
              <img
                src={`${typeImages}/${type.type.name}.svg`}
                className={`icon ${type.type.name}`}
                alt={type.type.name}
              />

              <span>{type.type.name}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
      <Waves />
      <div className="new">
        <div>
          <article>
            <img src={pokemonInfo?.sprites.front_default} alt="" />
            <p>front default</p>
          </article>
          <article>
            <img src={pokemonInfo?.sprites.back_default} alt="" />
            <p>back default</p>
          </article>
        </div>
        <article>
          <img src={pokemonInfo?.sprites.other.dream_world.front_default} alt="" />
          <p className="margin-top">dream world</p>
        </article>
        <div>
          <article>
            <img src={pokemonInfo?.sprites.front_shiny} alt="" />
            <p>front default shiny</p>
          </article>
          <article>
            <img src={pokemonInfo?.sprites.back_shiny} alt="" />
            <p>front back shiny</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PokeInfoScreen;
