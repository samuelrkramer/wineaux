import React, { useState, useEffect } from 'react';
import github_icon from '../../images/githubIcon.svg';
import linkedin_icon from '../../images/linkedInIcon.png';
import background from '../../images/grapes-background.png';


import './AboutPage.css'

const AboutPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [thisBackground, setThisBackground] = useState(background)

  useEffect(() => {
    setThisBackground(background)
    if(thisBackground) {
      setLoaded(true)
    }
  },[background])

  if (!loaded) {
    return (
    <div className='loaderr'>
        <h1>Loading...</h1>
    </div>
    )
}

  return (
    <>
         <div id='about_background'style={{
                backgroundImage: `url(${thisBackground})`,
              }}></div>
      <div id='built_by_container'>
        <div>Wineaux was built by:</div>
        <div id='dev_list_container'>
          <div className='creator_container'>
            <div className='creator_name'>David Forster</div>
            <div className='git_link_container'>
              <a href='https://github.com/da5idf' target="_blank">
                <img src={github_icon} height="32px" alt='github_icon'></img>
              </a>
              <a href='https://www.linkedin.com/in/david-forster-70b44673/' target="_blank">
                <img src={linkedin_icon} height="32px" alt='linkedin_icon'></img>
              </a>
            </div>
          </div>
          <div className='creator_container'>
            <div className='creator_name'>Sam Kramer</div>
            <div className='git_link_container'>
              <a href='https://github.com/samuelrkramer' target="_blank">
                <img src={github_icon} height="32px" alt='github_icon'></img>
              </a>
              <a href='https://github.com/samuelrkramer' target="_blank">
                <img src={linkedin_icon} height="32px" alt='linkedin_icon'></img>
              </a>
            </div>
          </div>
          <div className='creator_container'>
            <div className='creator_name'>Jonathon Tufts</div>
            <div className='git_link_container'>
              <a href='https://github.com/jonathontufts' target="_blank">
                <img src={github_icon} height="32px" alt='github_icon'></img>
              </a>
              <a href='https://www.linkedin.com/in/aaron-tufts-010759219/' target="_blank">
                <img src={linkedin_icon} height="32px" alt='linkedin_icon'></img>
              </a>
            </div>
          </div>
          <div className='creator_container'>
            <div className='creator_name'>Jon Halquist</div>
            <div className='git_link_container'>
              <a href='https://github.com/halquist' target="_blank">
                <img src={github_icon} height="32px" alt='github_icon'></img>
              </a>
              <a href='https://www.linkedin.com/in/jonathan-halquist-24380681/' target="_blank">
                <img src={linkedin_icon} height="32px" alt='linkedin_icon'></img>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id='built_with_icons'>
        <div>Wineaux was built with:</div>
        <div id='icon_container'>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' height='40' alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' height='40'alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg' height='40'alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' height='40'alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' height='40'alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' height='40'alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' height='40'alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' height='40'alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' height='40'alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' height='40'alt='use_icon'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg' height='60'alt='use_icon'/>
        </div>
        <a href='https://github.com/samuelrkramer/wineaux' target="_blank" id='git_link'>Site Github Link</a>
      </div>
      <div id='wine_lady_container'>
        <a href='https://youtu.be/Nvxwf1jxdaM?t=56' id='youtube_link' target="_blank">Meet a veteran Wineaux user!</a>
      </div>
    </>
  )
}

export default AboutPage
