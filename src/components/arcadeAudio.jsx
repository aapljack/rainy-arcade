import React, { useState } from 'react';
import AudioPlayer from './audioPlayer';
import DropdownMenu from './dropdownMenu';
import arcade81 from '../audio/arcade.mp3';
import arcade83 from '../audio/arcade83.mp3';
import arcade86 from '../audio/arcade86.mp3';
import arcade92 from '../audio/arcade92.mp3';
import rainAudioSrc from '../audio/main-thunder.mp4';
import rainIcon from '../images/rain.svg';
import arcadeIcon from '../images/arcade.svg';
import raLogo from '../images/ra_logo.svg';

function ArcadeAudio() {
  const [play, setPlay] = useState(false);
  const [arcadeAudioSrc, setArcadeAudioSrc] = useState(arcade81);
  const [arcadeList, setArcadeList] = useState([
    { id: 0, key: 'arcadeAudio', title: '1981', audioSrc: arcade81, selected: true },
    { id: 1, key: 'arcadeAudio', title: '1983', audioSrc: arcade83, selected: false },
    { id: 2, key: 'arcadeAudio', title: '1986', audioSrc: arcade86, selected: false },
    { id: 3, key: 'arcadeAudio', title: '1992', audioSrc: arcade92, selected: false }
  ]);

  function playAudio() {
    setPlay(m => !m);
  }

  const updateArcadeList = (id, key) => {
    const temp = arcadeList;

    temp.forEach((item) => item.selected = false);
    temp[id].selected = true;
    setArcadeAudioSrc(temp[id].audioSrc);

    setArcadeList(temp);

  }

  return (
    <>
      <header>
        <img src={raLogo} alt="Rainy Arcade" className="site-logo" />
        <p className="description">A simple noise generator to take you back to the rainy days spent in the arcade.</p>
        <button href="#" className="btn-glossy main-control" onClick={(e) => playAudio()}>{play ? "Stop" : "Play"}</button>
        <h2 className="subhead">Pick an Arcade Era</h2>
        <DropdownMenu title="1981" list={arcadeList} updateArcadeList={updateArcadeList} />
      </header>
      <main className="audio-grid">
        <AudioPlayer
          audioSrc={arcadeAudioSrc}
          audioTitle="Arcade"
          audioName="arcade"
          playAudio={play}
          icon={arcadeIcon}
        />
        {/* <AudioPlayer
          audioSrc={rainAudioSrc}
          audioTitle="Rain"
          audioName="rain"
          playAudio={play}
          icon={rainIcon}
        /> */}
      </main>
      <footer>
        <p>This site uses audio files from the <a href="http://arcade.hofle.com/" target="_blank" rel="noreferrer">Arcade Ambience Project</a> created by Andy Hofle and the <a href="https://simplebits.com/collections/fonts/products/cartridge-font" target="_blank" rel="noreferrer">Cartridge</a> font created by <a href="https://simplebits.com/" target="_blank" rel="noreferrer">Dan Cederholm</a>.</p>
      </footer>
    </>
  )
};

export default ArcadeAudio;