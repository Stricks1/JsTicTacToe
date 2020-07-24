const gameBoard = (() => {
  const board = ['','','','','','','','','']
  const render = () => {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = board[i];
    }
    
  }

  const putMarker = (index, marker) => {
    board[index] = marker
    render()
  }

  const validMove = (cell) => {
    if (board[cell] == ''){
      return true
    } else {
      return false
    }
  }

  return {
    board,
    render,
    putMarker,
    validMove
  };
})();


const gamePlayer = (() => {
  let currentPlayer = 1
  const turns = (player1, player2, index) => {
    if(gameBoard.validMove(index)) {
      gameBoard.putMarker(index)
      currentPlayer = (currentPlayer == 1) ? 2 : 1
    }
  } 
})();

gameBoard.render();

const playerFactory = (name, marker) => {
  return { name, marker };
};

const player1 = playerFactory('jeff', 'X');
const player2 = playerFactory('whatever', 'O');

function clickingCell( index ) {
  gameBoard.putMarker( index, player1.marker )
}

