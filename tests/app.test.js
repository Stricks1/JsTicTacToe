import {
  gameBoard, aiLogics, gamePlayer, buttonModel, setListeners,
} from '../src/app';

beforeEach(() => {
  gameBoard.putMarker(1, 'X', false);
});

afterEach(() => {
  gameBoard.boardReset();
});

test('return reversed string test 1', () => {
  expect(gameBoard.board[1]).toBe('O');
});


test('return reversed string test 1', () => {
  expect(gameBoard.validMove(1)).toBe('error');
});