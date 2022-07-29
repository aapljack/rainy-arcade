import React, { useState } from 'react';
import AudioPlayer from './audioPlayer';
import DropdownMenu from './dropdownMenu';
import arcade81 from '../audio/arcade.mp3';
import arcade83 from '../audio/arcade83.mp3';
import arcade86 from '../audio/arcade86.mp3';
import arcade92 from '../audio/arcade92.mp3';
import rain from '../audio/main-thunder.mp4';

function ArcadeAudio() {
  const arcadeList = [
    { title: '1981', audioSrc: arcade81 },
    { title: '1983', audioSrc: arcade83 },
    { title: '1986', audioSrc: arcade86 },
    { title: '1992', audioSrc: arcade92 }
  ];
  const [list, setList] = useState(arcadeList);
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState(arcade81);

  function updateAudio(audio) {
    console.log('Update Audio:', audio);
    setAudio(audio);
  }

  function playAudio() {
    setPlay(m => !m);
  }

  function callbackFunction(childData) {
    updateAudio(childData);
    console.log(`Callback function called from child: ${childData}`);
  }

  return (
    <>
      <div>
        <h1>Rainy Arcade</h1>
        <button
          onClick={(e) => playAudio()}> {play ? "Stop" : "Play"}</button>
        <h2>Pick an Era</h2>
        <DropdownMenu title="Select Era" list={list} parentCallback={callbackFunction} />
        <select
          name="arcade_year"
          value={audio}
          onChange={(e) => updateAudio(e.target.value)}
        >
          <option value={arcade81}>1981</option>
          <option value={arcade83}>1983</option>
          <option value={arcade86}>1986</option>
          <option value={arcade92}>1992</option>
        </select>
      </div>
      <AudioPlayer audioSrc={audio} audioTitle="Listen to the arcade:" audioName="arcade" playAudio={play} />
      <AudioPlayer audioSrc={rain} audioTitle="Listen to the rain:" audioName="rain" playAudio={play} />
    </>
  )
};

export default ArcadeAudio;