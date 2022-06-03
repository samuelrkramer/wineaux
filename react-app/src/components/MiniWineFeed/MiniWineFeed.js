import React from "react";
import { NavLink } from 'react-router-dom';

import './MiniWineFeed.css'

const MiniWineFeed = ({ wines }) => {

  return (
    <div id='mini_wine_container'>
      {wines.map((wine) => {
        return (
          <NavLink to={`/wines/${wine.id}`} className='navLinkk'>
          <div className='mini_one_wine' key={wine.id} style={{
            backgroundImage: `url(${wine.image_url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
            }}>
            <div className='mini_wine_text'>{wine.name}</div>
            <div className='mini_wine_text'>{wine.color}</div>
          </div>
          </NavLink >
        )
      })}
    </div>
  )
}

export default MiniWineFeed
