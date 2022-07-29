import React, { useState, useEffect, useRef } from 'react';

function AudioPlayer(props) {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const myRef = useRef();

  useEffect(() => {
    setAudioPlayer(document.getElementById(props.audioName));
    if (props.playAudio === true) {
      myRef.current.click();
      myRef.current.play();
    } else {
      myRef.current.pause();
    }
  }, [props.audioName, props.playAudio]);

  function changeVolume(e) {
    setVolume(e.target.valueAsNumber)
    audioPlayer.volume = volume;
    console.log('Volume:', volume);
  }

  return (
    <>
      <h3>{props.audioTitle}</h3>
      <audio ref={myRef} src={props.audioSrc} id={props.audioName} muted={muted} loop>
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