import React from 'react';
import AudioPlayer from './audioPlayer';
import ErrorBoundary from './errorBoundary';
import arcade81 from '../audio/arcade.mp3';
import arcade83 from '../audio/arcade83.mp3';
import arcade86 from '../audio/arcade86.mp3';
import arcade92 from '../audio/arcade92.mp3';
import rain from '../audio/main-thunder.mp4';

export default class ArcadeAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: arcade81,
      play: false
    }
  }

  updateAudio(audio) {
    console.log('Update Audio:', audio);
    this.setState({
      audio: audio,
    });
  }

  playAudio() {
    this.setState({
      play: true
    });
    if (this.state.play === true) {
      this.setState({
        play: false
      });
    }
  }

  render() {
    return (
      <>
        <div>
          <h1>Rainy Arcade</h1>
          <button
            onClick={(e) => this.playAudio()}>Play</button>
          <h2>Pick an Era</h2>
          <select
            name="arcade_year"
            value={this.state.audio}
            onChange={(e) => this.updateAudio(e.target.value)}
          >
            <option value={arcade81}>1981</option>
            <option value={arcade83}>1983</option>
            <option value={arcade86}>1986</option>
            <option value={arcade92}>1992</option>
          </select>
        </div>
        <ErrorBoundary>
          <AudioPlayer audioSrc={this.state.audio} audioTitle="Listen to the arcade:" audioName="arcade" playAudio={this.state.play} />
        </ErrorBoundary>
        <ErrorBoundary>
          <AudioPlayer audioSrc={rain} audioTitle="Listen to the rain:" audioName="rain" playAudio={this.state.play} />
        </ErrorBoundary>
      </>
    )
  }
};