import React, { useState, useEffect, useRef } from 'react';

function AudioPlayer(props) {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const audioPlayerRef = useRef();


  useEffect(() => {
    if (props.playAudio === true) {
      audioPlayerRef.current.click();
      audioPlayerRef.current.play();
    } else {
      audioPlayerRef.current.pause();
    }
  });

  function changeVolume(e) {
    setVolume(e.target.valueAsNumber)
    audioPlayerRef.current.volume = volume;
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
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
        className={iOS() === true ? "hide" : ""}
        type="range"
        min={0}
        max={1}
        step={0.02}
        value={iOS() === true && props.audioName === "arcade" ? 0.5 : volume}
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