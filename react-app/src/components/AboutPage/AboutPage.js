import React from 'react';
import line_break from '../../images/line_break.png';
import github_icon from '../../images/githubIcon.svg';
import linkedin_icon from '../../images/linkedInIcon.png';
import background from '../../images/grapes-background.png';


import './AboutPage.css'

const AboutPage = () => {
  return (
    <>
         <div id='about_background'style={{
                backgroundImage: `url(${background})`,
              }}></div>
      <div id='built_by_container'>
        <div>Wineax was built by:</div>
        <div id='dev_list_container'>
          <div className='creator_container'>
            <div className='creator_name'>David Forster</div>
            <div className='git_link_container'>
              <a href='https://github.com/da5idf' target="_blank">
                <img src={github_icon} height="32px"></img>
              </a>
              <a href='https://github.com/halquist' target="_blank">
                <img src={linkedin_icon} height="32px"></img>
              </a>
            </div>
          </div>
          <div className='creator_container'>
            <div className='creator_name'>Sam Kramer</div>
            <div className='git_link_container'>
              <a href='https://github.com/samuelrkramer' target="_blank">
                <img src={github_icon} height="32px"></img>
              </a>
              <a href='https://github.com/halquist' target="_blank">
                <img src={linkedin_icon} height="32px"></img>
              </a>
            </div>
          </div>
          <div className='creator_container'>
            <div className='creator_name'>Jonathon Tufts</div>
            <div className='git_link_container'>
              <a href='https://github.com/jonathontufts' target="_blank">
                <img src={github_icon} height="32px"></img>
              </a>
              <a href='https://www.linkedin.com/in/aaron-tufts-010759219/' target="_blank">
                <img src={linkedin_icon} height="32px"></img>
              </a>
            </div>
          </div>
          <div className='creator_container'>
            <div className='creator_name'>Jon Halquist</div>
            <div className='git_link_container'>
              <a href='https://github.com/halquist' target="_blank">
                <img src={github_icon} height="32px"></img>
              </a>
              <a href='https://www.linkedin.com/in/jonathan-halquist-24380681/' target="_blank">
                <img src={linkedin_icon} height="32px"></img>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id='built_with_icons'>
        <div>Wineaux was built with:</div>
        <div id='icon_container'>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' height='40'/>
          <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg' height='60'/>
        </div>
        <a href='https://github.com/samuelrkramer/wineaux' target="_blank" id='git_link'>Site Github Link</a>
      </div>
      <div id='wine_lady_container'>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Nvxwf1jxdaM?start=56" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </>
  )
}

export default AboutPage
