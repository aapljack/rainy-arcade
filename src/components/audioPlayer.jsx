import React, { useState, useEffect } from 'react';

function AudioPlayer(props) {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const audioPlayer = document.getElementById(props.audioName);

  function changeVolume(e) {
    setVolume(e.target.valueAsNumber)
    audioPlayer.volume = volume;
  }

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