import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const typeImages = new URL('../../media', import.meta.url).href

const PokeCard = ({url}) => {

  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [])

  const navigate = useNavigate()

  const clickCard = () => navigate(`/pokemon/${pokemon.id}`)


  return (
    <div onClick={clickCard} className="container">
      <div className="card">
        <div className={`card-head bg${pokemon?.types[0].type.name}`}>
          <span className="product-id"> #<b>{pokemon?.id}</b> </span>
          <img src={pokemon?.sprites.other['official-artwork'].front_default} className='product-img' alt="logo" />
          
        </div>
        <div className="card-body">
          <div className="product-desc">
            <span className="product-title">
              <b>{pokemon?.name}</b>
            </span>
          </div>
          <div className="product-properties">
            <span className="product-stats">
              <h4>stats</h4>
              <div>
                <div className="card__stats">
                  <p className="card__number">{pokemon?.stats[0].base_stat}</p>
                  <p className="card__text">HP</p>
                </div>
                <div className="card__stats">
                  <p className="card__number">{pokemon?.stats[1].base_stat}</p>
                  <p className="card__text">ATK</p>
                </div>
                <div className="card__stats">
                  <p className="card__number">{pokemon?.stats[2].base_stat}</p>
                  <p className="card__text">DFS</p>
                </div>
              </div>
            </span>
            
          </div>
          <div className='container-icons__padre'>
            {pokemon?.types.map((type) => (
              <div key={type.type.url} className='container-icons' >
              
                  <img 
                  src={`${typeImages}/${type.type.name}.svg`} 
                  className={`icon ${type.type.name}`} 
                  alt={type.type.name} />
                
              
                  <span>{type.type.name}</span>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokeCard