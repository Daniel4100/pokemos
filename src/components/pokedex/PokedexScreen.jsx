import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pagination from '../Paginatcion/Pagination'
import Form from './Form'
import PokeCard from './PokeCard'


const typeImages = new URL('../../media', import.meta.url).href

const PokedexScreen = () => {

  const nameUser = useSelector(state => state.nameUser)

  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [filterPokemon, setFilterPokemon] = useState()
  const [typeList, setTypeList] = useState()
  const [filterType, setFilterType] = useState('All Pokemons')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if(filterType === 'All Pokemons'){
      // Todos los pokemons
      const URL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1120'
      axios.get(URL_POKEMONS)
        .then(res => {
          setPokemons(res.data.results)
        })
        .catch(err => console.log(err))
    } else {
      // Pokemons por tipo
      console.log(filterType)
      const URL = `https://pokeapi.co/api/v2/type/${filterType}/`
      axios.get(URL)
        .then(res => {
          const array = res.data.pokemon.map(e => e.pokemon)
          console.log(array)
          setPokemons(array)
        })
        .catch(err => console.log(err))
    }
  }, [filterType])

  let arrayPivot 
  if(filterPokemon){
    arrayPivot = filterPokemon
  } else {
    arrayPivot = pokemons
  }

  let arrayPokemons = []
  const pokemonsPerPage = 6
  if (arrayPivot?.length < pokemonsPerPage) {
    arrayPokemons = [...arrayPivot]
  }else{
    const lastResident = currentPage * pokemonsPerPage
    arrayPokemons = arrayPivot?.slice(lastResident - pokemonsPerPage, lastResident)
  }

  // let arrayPokemons = []
  // const pokemonsPerPage = 6
  // if (pokemons?.length < pokemonsPerPage) {
  //   arrayPokemons = [...pokemons]
  // }else{
  //   const lastResident = currentPage * pokemonsPerPage
  //   arrayPokemons = pokemons?.slice(lastResident - pokemonsPerPage, lastResident)
  // }

  // let arrayPokemons2 = []
  // const pokemonsPerPage2 = 6
  // if (filterPokemon?.length < pokemonsPerPage2) {
  //   arrayPokemons2 = [...filterPokemon]
  // }else{
  //   const lastResident2 = currentPage * pokemonsPerPage2
  //   arrayPokemons2 = filterPokemon?.slice(lastResident2 - pokemonsPerPage2, lastResident2)
  // }

  let arrayPages = []
  let quantityPages = Math.ceil(arrayPivot?.length / pokemonsPerPage)
  const pagesPerBlock = 5
  let currentBlock = Math.ceil(currentPage / pagesPerBlock)
  if(currentBlock * pagesPerBlock >= quantityPages) {
    for(let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= quantityPages ;i++) {
      arrayPages.push(i)
    }
  } else{
    for(let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= currentBlock * pagesPerBlock;i++){
      arrayPages.push(i)
    }
  }
  



  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type/'
    axios.get(URL)
      .then(res => setTypeList(res.data.results))
      .catch(err => console.log(err))
  }, [])
  
  useEffect(() => {
    console.log(pokemons?.filter(e => e.name.includes(pokeSearch?.toLowerCase())))
    setFilterPokemon(pokemons?.filter(e => e.name.includes(pokeSearch?.toLowerCase())))
  }, [pokeSearch])


  return (
    <div>
      <div className='pokedex-container'>
        <img 
        src={`${typeImages}/pokedex.png`} 
        className='pokedex-logo'
        alt='logo'
        />
        <div className="pokedex-circle">
          
        </div>
      </div>
      
      <h2>Hola <span>{nameUser}</span>, bienvenido a la pokedex. </h2>
      <div className='form-container'>
        <Form 
        setPokeSearch={setPokeSearch}
        typeList={typeList}
        setFilterType={setFilterType}
      />
      </div>
      <Pagination 
        arrayPages={arrayPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        quantityPages={quantityPages} />
      
      <div className='card-container'>
        {
          // arrayPokemons2 ?
          //   arrayPokemons2?.map(pokemon => (
          //     <PokeCard 
          //       key={pokemon.url}
          //       url={pokemon.url}
          //     />
          //   ))
          // :
          //   arrayPokemons?.map(pokemon => (
          //     <PokeCard 
          //       key={pokemon.url}
          //       url={pokemon.url}
          //     />
          //   ))
          arrayPokemons?.map(pokemon => (
            <PokeCard 
              key={pokemon.url}
              url={pokemon.url}
            />
          ))
        }
      </div>
    </div>
  )
}

export default PokedexScreen