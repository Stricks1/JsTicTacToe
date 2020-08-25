import {
  gameBoard,
} from '../src/app';


describe('gameBoard Model', () => {
  beforeEach(() => {
    gameBoard.putMarker(1, 'X', false);
  });

  afterEach(() => {
    gameBoard.boardReset();
  });

  test('it returns proper marker placed inside board', () => {
    gameBoard.putMarker(0, 'X', false);
    expect(gameBoard.board[0]).toBe('X');
  });

  test('it returns proper marker placed inside board', () => {
    gameBoard.putMarker(2, 'O', false);
    expect(gameBoard.board[2]).toBe('O');
  });

  test('it returns false if cell not empty', () => {
    expect(gameBoard.validMove(1)).toBe(false);
  });

  test('it returns true if cell is empty', () => {
    expect(gameBoard.validMove(0)).toBe(true);
  });

  describe('checkEnd for winning combinations', () => {
    test("it returns 1 if there's a winning combo", () => {
      gameBoard.putMarker(0, 'X', false);
      gameBoard.putMarker(2, 'X', false);
      expect(gameBoard.checkEnd()).toBe(1);
    });

    test('it returns 2 if the board is full', () => {
      gameBoard.putMarker(0, 'X', false);
      gameBoard.putMarker(2, 'O', false);
      gameBoard.putMarker(3, 'O', false);
      gameBoard.putMarker(4, 'O', false);
      gameBoard.putMarker(5, 'X', false);
      gameBoard.putMarker(6, 'X', false);
      gameBoard.putMarker(7, 'O', false);
      gameBoard.putMarker(8, 'X', false);

      expect(gameBoard.checkEnd()).toBe(2);
    });

    test("it returns '' if there's no wining condition and a free cell to play", () => {
      expect(gameBoard.checkEnd()).toBe('');
    });
  });

  test('it cleans the board', () => {
    gameBoard.boardReset();
    expect(gameBoard.board).toEqual(['', '', '', '', '', '', '', '', '']);
  });
});
