import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AudioPlayer from './audioPlayer';
import { latestGainNode, resetGainNodes } from '../testUtils/mockAudioContext';

const defaultProps = {
  audioSrc: 'test.mp3',
  audioTitle: 'Test',
  audioName: 'test',
  playAudio: false,
  icon: 'test.svg',
};

beforeEach(() => {
  resetGainNodes();
});

test('slider changes update the gain node value', () => {
  render(<AudioPlayer {...defaultProps} />);
  const gain = latestGainNode();
  expect(gain.gain.value).toBe(1);

  fireEvent.change(screen.getByRole('slider'), {
    target: { value: '0.5', valueAsNumber: 0.5 },
  });

  expect(gain.gain.value).toBe(0.5);
});

test('mute button sets gain to 0 and unmute restores the slider value', () => {
  render(<AudioPlayer {...defaultProps} />);
  const gain = latestGainNode();

  fireEvent.change(screen.getByRole('slider'), {
    target: { value: '0.7', valueAsNumber: 0.7 },
  });
  expect(gain.gain.value).toBe(0.7);

  userEvent.click(screen.getByRole('button', { name: /silence/i }));
  expect(gain.gain.value).toBe(0);

  userEvent.click(screen.getByRole('button', { name: /resume/i }));
  expect(gain.gain.value).toBe(0.7);
});
