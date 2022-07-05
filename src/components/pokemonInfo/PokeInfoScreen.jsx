import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const typeImages = new URL('../../media', import.meta.url).href

const PokeInfoScreen = ({}) => {
  const [pokemonInfo, setPokemonInfo] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => setPokemonInfo(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <div className='pokedex-container'>
        <img 
        src={`${typeImages}/logo.gif`} 
        className='pokedex-logo-2'
        alt='logo'
        />
        <div className="pokedex-circle">
          
        </div>
      </div>
      <img
        src={pokemonInfo?.sprites.other["official-artwork"].front_default}
        alt=""
      />
      <h1>{pokemonInfo?.name}</h1>

      {pokemonInfo?.stats.map((stats) => (
        <div key={stats.stat.name}>
          <p>
            <span>{stats.stat.name}: </span>
            {stats.base_stat}
          </p>
        </div>
      ))}
      <hr />
      {pokemonInfo?.types.map((type) => (
        <div key={type.type.url} className='container-icons' >
        
            <img 
            src={`${typeImages}/${type.type.name}.svg`} 
            className={`icon ${type.type.name}`} 
            alt={type.type.name} />
          
        
            <span>{type.type.name}</span>
          
        </div>
      ))}
      
      <hr />

      {pokemonInfo?.abilities.map((e) => (
        <div key={e.ability.url}>
          <span>{e.ability.name}</span>
        </div>
      ))}
    </section>
  );
};

export default PokeInfoScreen;
