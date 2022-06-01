import React from "react";

import './MiniWineFeed.css'

const MiniWineFeed = (wines) => {
  return (
    <div id='mini_wine_container'>
      {wines.wines.map((wine) => {
        return (
          <div className='mini_one_wine' key={wine.id} style={{
            backgroundImage: `url(${wine.image_url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
            }}>
            <div className='mini_wine_text'>{wine.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default MiniWineFeed
