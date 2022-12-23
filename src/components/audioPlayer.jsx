import React, { useState, useEffect, useRef } from 'react';

function AudioPlayer(props) {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const audioPlayerRef = useRef();
  const [track, setTrack] = useState(null);



  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  useEffect(() => {
    if (window !== undefined) {
      const src = audioContext.createMediaElementSource(audioPlayerRef.current);
      setTrack(src);
      console.log('Create audio context.');
    }
    if (props.playAudio === true) {
      audioContext.play();
      // audioPlayerRef.current.click();
      // audioPlayerRef.current.play();
    } else {
      audioContext.resume();
      // audioPlayerRef.current.pause();
    }
  }, []);

  function playCurrentAudio(e) {
    audioContext.resume();
    audioPlayerRef.current.play();
    console.log('audioContext', audioContext);
    console.log('track', track);
    console.log(props.playAudio);
    if(audioContext.state === 'suspended') {
      console.log('audioContext.resume()');
    }
    if (props.playAudio === false) {
    // if track is playing pause it
    } else if (props.playAudio === 'true') {
        audioPlayerRef.current.pause();
        console.log('audioPlayerRef.current.pause()');
      }
    }



    function changeVolume(e) {
      setVolume(e.target.valueAsNumber)
      audioPlayerRef.current.volume = volume;
      console.log("volume");
    }

        if(track !== null) {
      console.log('track', track);
      // track.connect(audioContext.destination);
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
      <button onClick={() => playCurrentAudio()}>Play</button>
    </div>
  )
}


export default AudioPlayer;