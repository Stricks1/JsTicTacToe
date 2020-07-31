const gameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const render = () => {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].innerHTML = board[i];
      if (board[i] === 'X') {
        cells[i].classList.add('x-class');
      } else if (board[i] === 'O') {
        cells[i].classList.add('o-class');
      }
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
      return '';
    }
    return 2;
  };

  const boardReset = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    render();
  };

  return {
    board,
    render,
    putMarker,
    validMove,
    checkEnd,
    boardReset,
  };
})();

const gamePlayer = (() => {
  let currentPlayer = 1;

  function clearButtons() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i += 1) {
      const clone = cells[i].cloneNode(true);
      cells[i].replaceWith(clone);
    }
  }

  function changeColors(element, player) {
    if (player === 1) {
      element.classList.add('x-class');
      element.classList.remove('o-class');
    } else if (player === 2) {
      element.classList.add('o-class');
      element.classList.remove('x-class');
    } else {
      element.classList.remove('x-class');
      element.classList.remove('o-class');
    }
  }

  const turns = (player1, player2, index) => {
    if (gameBoard.validMove(index)) {
      gameBoard.putMarker(index, currentPlayer === 1 ? player1.marker : player2.marker);
      const state = gameBoard.checkEnd();
      if (state) {
        clearButtons();
        if (state === 2) {
          document.getElementById('message').innerHTML = "It's a Draw!";
          changeColors(document.getElementById('message'), 3);
        } else {
          document.getElementById('message').innerHTML = `${currentPlayer === 1 ? player1.name : player2.name} Won!`;
          changeColors(document.getElementById('message'), currentPlayer);
        }
      } else {
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
        document.getElementById('message').innerHTML = `It's ${currentPlayer === 1 ? player1.name : player2.name} turn!`;
        changeColors(document.getElementById('message'), currentPlayer);
      }
    }
  };

  function addButtons(p1, p2) {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].addEventListener('click', () => {
        turns(p1, p2, i);
      });
    }
  }

  return {
    turns,
    addButtons,
    changeColors,
  };
})();

gameBoard.render();

const playerFactory = (name, marker) => ({ name, marker });

const buttonModel = (() => {
  let p1 = '';
  let p2 = '';

  function getPlayerName() {
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const ep1 = document.getElementById('ep1');
    const ep2 = document.getElementById('ep2');

    ep1.classList.remove('d-inline');
    ep2.classList.remove('d-inline');

    ep1.classList.add('d-none');
    ep2.classList.add('d-none');

    if (player1.value.trim() === '') {
      player1.value = '';
      ep1.classList.add('d-inline');
      player1.focus();
    }

    if (player2.value.trim() === '') {
      player2.value = '';
      ep2.classList.add('d-inline');
      player2.focus();
    }

    if (player1.value.trim() === '' || player2.value.trim() === '') {
      return;
    }

    p1 = playerFactory(player1.value, 'X');
    p2 = playerFactory(player2.value, 'O');
    gamePlayer.addButtons(p1, p2);
    gamePlayer.currentPlayer = 1;
    gamePlayer.changeColors(document.getElementById('message'), 1);
    document.getElementById('message').innerHTML = `It's ${p1.name} turn!`;

    const bottom = document.getElementById('bottomelements');
    bottom.classList.add('d-inline');
    bottom.classList.remove('d-none');

    const top = document.getElementById('topelements');
    top.classList.add('d-none');
    top.classList.remove('d-inline');
  }

  function reset() {
    gameBoard.boardReset();
    const bottom = document.getElementById('bottomelements');
    bottom.classList.add('d-none');
    bottom.classList.remove('d-inline');

    const top = document.getElementById('topelements');
    top.classList.add('d-inline');
    top.classList.remove('d-none');

    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].classList.remove('x-class', 'o-class');
    }
  }

  return {
    getPlayerName,
    reset,
  };
})();

const bottom = document.getElementById('bottomelements');
bottom.classList.add('d-none');

const btnStart = document.getElementById('startgame');
btnStart.addEventListener('click', buttonModel.getPlayerName);

const playAgain = document.getElementById('playagain');
playAgain.addEventListener('click', buttonModel.reset);
