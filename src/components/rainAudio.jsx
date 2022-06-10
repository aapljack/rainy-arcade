import React from 'react';
import rain from '../audio/rain.wav';

export default class ArcadeAudio extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     audio: rain,
  //   }
  // }

  // updateAudio(audio) {
  //   this.setState({
  //     audio: audio,
  //   });
  // }

  render() {
    return (
      <>
        <h2>Start Rain</h2>
        <figure>
          <figcaption>Listen to the Rain:</figcaption>
          <audio
              controls
              src={this.props.audio}>
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>
        </figure>
      </>
    )
  }
};