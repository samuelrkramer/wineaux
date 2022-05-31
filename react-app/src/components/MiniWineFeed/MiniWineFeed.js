import React from "react";

import './MiniWineFeed.css'

const MiniWineFeed = (wines) => {
  return (
    <div id='mini_wine_container'>
      {wines.map((wine) => {
        return (
          <div className='mini_one_wine' style={{
            backgroundImage: `url(${wine.image_url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
            }}>
            <div className='mini_wine_text'></div>
          </div>
        )
      })}
    </div>
  )
}

export default MiniWineFeed
