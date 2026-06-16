// jsdom (the DOM environment Jest uses) does not implement Web Audio or
// HTMLMediaElement.play/pause. AudioPlayer wires its <audio> element through
// a GainNode, so without these stubs every test that mounts the component
// throws on mount.

const createdGainNodes = [];

class MockGainNode {
  constructor() {
    this.gain = { value: 1 };
    createdGainNodes.push(this);
  }
  connect() {}
}

class MockAudioContext {
  constructor() {
    this.state = 'running';
    this.destination = {};
  }
  createMediaElementSource() {
    return { connect: () => {} };
  }
  createGain() {
    return new MockGainNode();
  }
  resume() {
    this.state = 'running';
    return Promise.resolve();
  }
}

window.AudioContext = MockAudioContext;
window.webkitAudioContext = MockAudioContext;

window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => {};

export const latestGainNode = () => createdGainNodes[createdGainNodes.length - 1];
export const resetGainNodes = () => { createdGainNodes.length = 0; };
