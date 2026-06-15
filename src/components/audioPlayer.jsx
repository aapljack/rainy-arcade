import React, { useState, useEffect, useRef } from 'react';

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

function AudioPlayer(props) {
  const initialVolume = iOS() && props.audioName === "arcade" ? 0.5 : 1;
  const [volume, setVolume] = useState(initialVolume);
  const [muted, setMuted] = useState(false);
  const audioPlayerRef = useRef();
  const audioContextRef = useRef();
  const gainNodeRef = useRef();
  const initializedRef = useRef(false);

  // Wire the audio element through a Web Audio gain node. iOS Safari ignores
  // HTMLMediaElement.volume, but it honors GainNode.gain — so route through
  // the graph and adjust gain instead of the media element's volume property.
  // The init guard is required because createMediaElementSource() can only be
  // called once per element (spec), and StrictMode double-invokes effects in dev.
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    const source = ctx.createMediaElementSource(audioPlayerRef.current);
    const gain = ctx.createGain();
    source.connect(gain);
    gain.connect(ctx.destination);
    audioContextRef.current = ctx;
    gainNodeRef.current = gain;
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = muted ? 0 : volume;
    }
  }, [volume, muted]);

  useEffect(() => {
    if (props.playAudio === true) {
      // iOS suspends the context until a user gesture resumes it.
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      // Re-run on audioSrc change so switching tracks mid-play resumes playback
      // (changing src pauses the element).
      audioPlayerRef.current.play();
    } else {
      audioPlayerRef.current.pause();
    }
  }, [props.playAudio, props.audioSrc]);

  function changeVolume(e) {
    setVolume(e.target.valueAsNumber);
  }

  return (
    <div className="audio-player">
      <img src={props.icon} alt="Rain Icon" className="audio-player__icon" />
      <h3 className="sound-head">{props.audioTitle}</h3>
      <audio ref={audioPlayerRef} src={props.audioSrc} id={props.audioName} loop>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <input
        type="range"
        min={0}
        max={1}
        step={0.02}
        value={volume}
        onChange={changeVolume}
        />
      <button onClick={() => setMuted(m => !m)} className="btn-glossy btn-glossy--tertiary">
        {muted ? "Resume" : "Silence"}
      </button>
    </div>
  )
}


export default AudioPlayer;
