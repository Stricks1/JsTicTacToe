const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const render = () => {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = board[i];
    }
  };

  const putMarker = (index, marker) => {
    board[index] = marker;
    render();
  };

  const validMove = (cell) => {
    if (board[cell] === '') {
      return true;
    }
    return false;
  };

  const checkEnd = () => {
    if ((board[0] === board[1] && board[1] === board[2] && board[2] !== '')
     || (board[3] === board[4] && board[4] === board[5] && board[5] !== '')
     || (board[6] === board[7] && board[7] === board[8] && board[8] !== '')
     || (board[0] === board[3] && board[3] === board[6] && board[6] !== '')
     || (board[1] === board[4] && board[4] === board[7] && board[7] !== '')
     || (board[2] === board[5] && board[5] === board[8] && board[8] !== '')
     || (board[0] === board[4] && board[4] === board[8] && board[8] !== '')
     || (board[2] === board[4] && board[4] === board[6] && board[6] !== '')) {
      return 1;
    }
    if (board.find(element => element === '') === '') {
      return false;
    }
    return 2;
  };

  return {
    board,
    render,
    putMarker,
    validMove,
    checkEnd,
  };
})();


const gamePlayer = (() => {
  let currentPlayer = 1;

  function clearButtons() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].onclick = '';
    }
  }

  const turns = (player1, player2, index) => {
    if (gameBoard.validMove(index)) {
      gameBoard.putMarker(index, currentPlayer === 1 ? player1.marker : player2.marker);
      let state = gameBoard.checkEnd();
      if (state) {
        clearButtons();
        if (state === 2) {
          alert('draw')
        } else {
          alert( currentPlayer === 1 ? player1.name : player2.name )
        }
      }
      currentPlayer = (currentPlayer === 1) ? 2 : 1;
    }
  };

  return {
    turns,
  };
})();

gameBoard.render();

const playerFactory = (name, marker) => {
  return { name, marker };
};

const player1 = playerFactory('jeff', 'X');
const player2 = playerFactory('whatever', 'O');

function clickingCell(index) {
  gamePlayer.turns(player1, player2, index);
}
