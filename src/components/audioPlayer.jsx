import React, { useState, useEffect } from 'react';

function AudioPlayer(props) {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const audioPlayer = document.getElementById(props.audioName);
  // const audioPlayer = new Audio(props.audioSrc);

  useEffect(() => {
  console.log('audioPlayer:', audioPlayer);

    if (props.playAudio === true) {
      audioPlayer.play();
      console.log('Playing:', props.playAudio);
    } else {
      // audioPlayer.pause();
      console.log('Playing:', props.playAudio);
    }
  });


  function changeVolume(e) {
    setVolume(e.target.valueAsNumber)
    audioPlayer.volume = volume;
    console.log('Volume:', volume);
  }

  // audioPlayer.addEventListener("canplaythrough", () => {
  //   /* the audio is now playable; play it if permissions allow */
  //   console.log('Can Play Through');
  //   audioPlayer.play();
  // });

  return (
    <>
      <h3>{props.audioTitle}</h3>
      <audio controls src={props.audioSrc} id={props.audioName} muted={muted}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <input
        type="range"
        min={0}
        max={1}
        step={0.02}
        value={volume}
        onChange={event => {
          changeVolume(event)
        }}
        />
      <button onClick={() => setMuted(m => !m)}>
        {muted ? "muted" : "unmuted"}
      </button>
    </>
  )
}


export default AudioPlayer;