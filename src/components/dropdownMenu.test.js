import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from './dropdownMenu';

const list = [
  { id: 0, key: 'arcadeAudio', title: '1981', selected: true },
  { id: 1, key: 'arcadeAudio', title: '1983', selected: false },
];

test('renders the title in the header button', () => {
  render(<DropdownMenu title="1981" list={list} updateArcadeList={() => {}} />);
  expect(screen.getByRole('button', { name: /1981/i })).toBeInTheDocument();
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

test('toggles the list open and closed when the header is clicked', () => {
  render(<DropdownMenu title="1981" list={list} updateArcadeList={() => {}} />);
  const header = screen.getByRole('button', { name: /1981/i });

  userEvent.click(header);
  expect(screen.getByRole('list')).toBeInTheDocument();

  userEvent.click(header);
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

test('selecting an item calls updateArcadeList with id and key and closes the list', () => {
  const updateArcadeList = jest.fn();
  render(<DropdownMenu title="1981" list={list} updateArcadeList={updateArcadeList} />);

  userEvent.click(screen.getByRole('button', { name: /1981/i }));
  userEvent.click(screen.getByRole('button', { name: /1983/i }));

  expect(updateArcadeList).toHaveBeenCalledWith(1, 'arcadeAudio');
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});
