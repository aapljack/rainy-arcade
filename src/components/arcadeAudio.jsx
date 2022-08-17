import React, { useState } from 'react';
import AudioPlayer from './audioPlayer';
import DropdownMenu from './dropdownMenu';
import arcade81 from '../audio/arcade.mp3';
import arcade83 from '../audio/arcade83.mp3';
import arcade86 from '../audio/arcade86.mp3';
import arcade92 from '../audio/arcade92.mp3';
import rainAudioSrc from '../audio/main-thunder.mp4';

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

  // function callbackFunction() {
  //   setArcadeAudioTitle('Robo');
  //   console.log(`arcadeAudioTitle: ${arcadeAudioTitle}`);
  // }

  const resetThenSet = (id, key) => {
    const temp = arcadeList;

    temp.forEach((item) => item.selected = false);
    temp[id].selected = true;
    setArcadeAudioSrc(temp[id].audioSrc);

    setArcadeList(temp);

  }

  return (
    <>
      <div>
        <h1>Rainy Arcade</h1>
        <button
          onClick={(e) => playAudio()}> {play ? "Stop" : "Play"}</button>
        <h2>Pick an Era</h2>
        <DropdownMenu title="1981" list={arcadeList} resetThenSet={resetThenSet} />
      </div>
      <AudioPlayer
        audioSrc={arcadeAudioSrc}
        audioTitle="Listen to the arcade:"
        audioName="arcade"
        playAudio={play}
      />
      <AudioPlayer
        audioSrc={rainAudioSrc}
        audioTitle="Listen to the rain:"
        audioName="rain"
        playAudio={play}
      />
    </>
  )
};

export default ArcadeAudio;