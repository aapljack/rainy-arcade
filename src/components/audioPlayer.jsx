import React, { useState, useEffect, useRef } from 'react';

function AudioPlayer(props) {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const audioPlayerRef = useRef();

  useEffect(() => {
    if (props.playAudio === true) {
      audioPlayerRef.current.play();
    }
  });

  useEffect(() => {
    setAudioPlayer(document.getElementById(props.audioName));
    if (props.playAudio === true) {
      audioPlayerRef.current.click();
      audioPlayerRef.current.play();
    } else {
      audioPlayerRef.current.pause();
    }
  }, [props.audioName, props.playAudio]);


  function changeVolume(e) {
    setVolume(e.target.valueAsNumber)
    audioPlayer.volume = volume;
    console.log('Volume:', volume);
  }

  return (
    <div className="audio-player">
      <img src={props.icon} alt="Rain Icon" className="audio-player__icon" />
      <h3 className="sound-head">{props.audioTitle}</h3>
      <audio ref={audioPlayerRef} src={props.audioSrc} id={props.audioName} muted={muted} loop>
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
      <button onClick={() => setMuted(m => !m)} className="btn-glossy btn-glossy--tertiary">
        {muted ? "Resume" : "Silence"}
      </button>
    </div>
  )
}


export default AudioPlayer;