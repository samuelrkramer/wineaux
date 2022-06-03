import React from "react";
import { NavLink } from 'react-router-dom';
import { getOneWine } from '../../store/wines';


import './MainWineFeed.css'

const MainWineFeed = ({ wines }) => {

  const setCurrentWine = (e) => {
    
    getOneWine(e.target.id)
  }

  return (
    <div id='main_wine_container'>
      <div id='mini_wine_container'>
        {wines.map((wine) => {
          return (
            <button onClick={setCurrentWine}>
            <div className='mini_one_wine' key={wine.id} style={{
              backgroundImage: `url(${wine.image_url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
              }}>
              <div className='mini_wine_text'>{wine.name}</div>
              <div className='mini_wine_text'>{wine.color}</div>
            </div>
            </button>
          )
        })}
      </div>
      <div id='wine_detail_container'>

      </div>
    </div>
  )
}

export default MainWineFeed
