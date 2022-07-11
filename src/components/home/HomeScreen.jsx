import React from 'react'
import InputHome from './InputHome'

const typeImages = new URL('../../media', import.meta.url).href

const HomeScreen = () => {
  return (
    <div className='container-input__home'>
      
      <InputHome />
    </div>
  )
}

export default HomeScreen