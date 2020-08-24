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

  const putMarker = (index, marker, ai) => {
    board[index] = marker;
    if (ai) {
      setTimeout(render, 1000);
    } else {
      render();
    }
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
    gameBoard.board = board;
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

const aiLogics = (() => {
  let aiPos = 0;
  let levelAi = 1;

  function aiPosition(playerPosition) {
    aiPos = playerPosition;
  }

  function getAiPos() {
    return aiPos;
  }

  function aiLevel(level) {
    levelAi = level;
  }

  function makeMove(p1, p2) {
    const combinations = [
      [gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]],
      [gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]],
      [gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]],
      [gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]],
      [gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]],
      [gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]],
      [gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]],
      [gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]],
    ];
    const markerAi = (aiPos === 1) ? 'X' : 'O';
    const markerPlayer = (aiPos === 1) ? 'O' : 'X';
    let playWin = null;
    let playStopWin = null;
    let played = false;

    function checkBlank(pos) {
      return pos === '';
    }

    function checkO(pos) {
      return pos === 'O';
    }

    function checkX(pos) {
      return pos === 'X';
    }

    function returnPositionPlay(i, indexF) {
      switch (i) {
        case 0:
          switch (indexF) {
            case 0:
              return 0;
            case 1:
              return 1;
            case 2:
              return 2;
            default:
              return '';
          }
        case 1:
          switch (indexF) {
            case 0:
              return 3;
            case 1:
              return 4;
            case 2:
              return 5;
            default:
              return '';
          }
        case 2:
          switch (indexF) {
            case 0:
              return 6;
            case 1:
              return 7;
            case 2:
              return 8;
            default:
              return '';
          }
        case 3:
          switch (indexF) {
            case 0:
              return 0;
            case 1:
              return 3;
            case 2:
              return 6;
            default:
              return '';
          }
        case 4:
          switch (indexF) {
            case 0:
              return 1;
            case 1:
              return 4;
            case 2:
              return 7;
            default:
              return '';
          }
        case 5:
          switch (indexF) {
            case 0:
              return 2;
            case 1:
              return 5;
            case 2:
              return 8;
            default:
              return '';
          }
        case 6:
          switch (indexF) {
            case 0:
              return 0;
            case 1:
              return 4;
            case 2:
              return 8;
            default:
              return '';
          }
        case 7:
          switch (indexF) {
            case 0:
              return 2;
            case 1:
              return 4;
            case 2:
              return 6;
            default:
              return '';
          }
        default:
          return '';
      }
    }

    if (levelAi > 1) {
      for (let i = 0; i < combinations.length; i += 1) {
        const results = combinations[i].filter(x => x.includes(markerAi));
        if (results && results.length === 2) {
          const indexF = combinations[i].findIndex(checkBlank);
          if (indexF !== -1) {
            playWin = returnPositionPlay(i, indexF);
            // eslint-disable-next-line no-use-before-define
            gamePlayer.turns(p1, p2, playWin, true);
            played = true;
            i = combinations.length;
          }
        }
      }
    }

    if (!played && levelAi > 1) {
      for (let i = 0; i < combinations.length; i += 1) {
        const results = combinations[i].filter(x => x.includes(markerPlayer));
        if (results && results.length === 2) {
          const indexF = combinations[i].findIndex(checkBlank);
          if (indexF !== -1) {
            playStopWin = returnPositionPlay(i, indexF);
            // eslint-disable-next-line no-use-before-define
            gamePlayer.turns(p1, p2, playStopWin, true);
            played = true;
            i = combinations.length;
          }
        }
      }
    }

    let moves = gameBoard.board.filter(x => x.includes(markerAi)).length;
    moves += gameBoard.board.filter(x => x.includes(markerPlayer)).length;

    if (moves === 0 && levelAi > 2) {
      const possiblePlay = [0, 2, 6, 8];
      const position = possiblePlay[Math.floor(Math.random() * possiblePlay.length)];
      // eslint-disable-next-line no-use-before-define
      gamePlayer.turns(p1, p2, position, true);
      played = true;
    } else if (moves === 1) {
      if (gameBoard.board[4] === '') {
        // eslint-disable-next-line no-use-before-define
        gamePlayer.turns(p1, p2, 4, true);
        played = true;
      } else {
        const possiblePlay = [0, 2, 6, 8];
        const position = possiblePlay[Math.floor(Math.random() * possiblePlay.length)];
        // eslint-disable-next-line no-use-before-define
        gamePlayer.turns(p1, p2, position, true);
        played = true;
      }
    }

    if (aiPos === 1 && moves === 2 && levelAi > 2) {
      const plFMove = gameBoard.board.findIndex(checkO);
      const aiFMove = gameBoard.board.findIndex(checkX);
      if (plFMove === 4) {
        switch (aiFMove) {
          case 0:
            // eslint-disable-next-line no-use-before-define
            gamePlayer.turns(p1, p2, 8, true);
            played = true;
            break;
          case 2:
            // eslint-disable-next-line no-use-before-define
            gamePlayer.turns(p1, p2, 6, true);
            played = true;
            break;
          case 6:
            // eslint-disable-next-line no-use-before-define
            gamePlayer.turns(p1, p2, 2, true);
            played = true;
            break;
          case 8:
            // eslint-disable-next-line no-use-before-define
            gamePlayer.turns(p1, p2, 0, true);
            played = true;
            break;
          default:
            break;
        }
      } else {
        switch (plFMove) {
          case 0:
            switch (aiFMove) {
              case 2:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 6, true);
                played = true;
                break;
              case 6:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 2, true);
                played = true;
                break;
              case 8:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 2, true);
                played = true;
                break;
              default:
                break;
            }
            break;
          case 1:
            switch (aiFMove) {
              case 0:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 6, true);
                played = true;
                break;
              case 2:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 8, true);
                played = true;
                break;
              case 6:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 8, true);
                played = true;
                break;
              case 8:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 6, true);
                played = true;
                break;
              default:
                break;
            }
            break;
          case 2:
            switch (aiFMove) {
              case 0:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 8, true);
                played = true;
                break;
              case 6:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 0, true);
                played = true;
                break;
              case 8:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 0, true);
                played = true;
                break;
              default:
                break;
            }
            break;
          case 3:
            switch (aiFMove) {
              case 0:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 2, true);
                played = true;
                break;
              case 2:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 8, true);
                played = true;
                break;
              case 6:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 8, true);
                played = true;
                break;
              case 8:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 2, true);
                played = true;
                break;
              default:
                break;
            }
            break;
          case 5:
            switch (aiFMove) {
              case 0:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 6, true);
                played = true;
                break;
              case 2:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 0, true);
                played = true;
                break;
              case 6:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 0, true);
                played = true;
                break;
              case 8:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 6, true);
                played = true;
                break;
              default:
                break;
            }
            break;
          case 6:
            switch (aiFMove) {
              case 0:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 8, true);
                played = true;
                break;
              case 2:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 0, true);
                played = true;
                break;
              case 8:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 0, true);
                played = true;
                break;
              default:
                break;
            }
            break;
          case 7:
            switch (aiFMove) {
              case 0:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 2, true);
                played = true;
                break;
              case 2:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 0, true);
                played = true;
                break;
              case 6:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 0, true);
                played = true;
                break;
              case 8:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 2, true);
                played = true;
                break;
              default:
                break;
            }
            break;
          case 8:
            switch (aiFMove) {
              case 0:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 2, true);
                played = true;
                break;
              case 2:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 6, true);
                played = true;
                break;
              case 6:
                // eslint-disable-next-line no-use-before-define
                gamePlayer.turns(p1, p2, 2, true);
                played = true;
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      }
    }

    if (!played && levelAi > 2) {
      if (aiPos === 2 && moves === 3) {
        if (gameBoard.board[4] === 'X') {
          const corners = [];
          corners.push(gameBoard.board[0]);
          corners.push(gameBoard.board[2]);
          corners.push(gameBoard.board[6]);
          corners.push(gameBoard.board[8]);
          let playPosition = corners.findIndex(checkBlank);
          switch (playPosition) {
            case 0:
              playPosition = 0;
              break;
            case 1:
              playPosition = 2;
              break;
            case 2:
              playPosition = 6;
              break;
            case 3:
              playPosition = 8;
              break;
            default:
              break;
          }
          // eslint-disable-next-line no-use-before-define
          gamePlayer.turns(p1, p2, playPosition, true);
          played = true;
        } else if (gameBoard.board[1] === 'X' || gameBoard.board[3] === 'X' || gameBoard.board[5] === 'X' || gameBoard.board[7] === 'X') {
          const corners = [];
          if (gameBoard.board[5] === 'X' || gameBoard.board[7] === 'X') {
            corners.push(gameBoard.board[6]);
            corners.push(gameBoard.board[8]);
            let playPosition = corners.findIndex(checkBlank);
            if (playPosition === 0) {
              playPosition = 6;
            } else {
              playPosition = 8;
            }
            // eslint-disable-next-line no-use-before-define
            gamePlayer.turns(p1, p2, playPosition, true);
            played = true;
          } else {
            corners.push(gameBoard.board[0]);
            corners.push(gameBoard.board[2]);
            let playPosition = corners.findIndex(checkBlank);
            if (playPosition === 0) {
              playPosition = 0;
            } else {
              playPosition = 2;
            }
            // eslint-disable-next-line no-use-before-define
            gamePlayer.turns(p1, p2, playPosition, true);
            played = true;
          }
        } else {
          const middle = [];
          middle.push(gameBoard.board[1]);
          middle.push(gameBoard.board[3]);
          middle.push(gameBoard.board[5]);
          middle.push(gameBoard.board[7]);
          let playPosition = middle.findIndex(checkBlank);
          switch (playPosition) {
            case 0:
              playPosition = 1;
              break;
            case 1:
              playPosition = 3;
              break;
            case 2:
              playPosition = 5;
              break;
            case 3:
              playPosition = 7;
              break;
            default:
              break;
          }
          // eslint-disable-next-line no-use-before-define
          gamePlayer.turns(p1, p2, playPosition, true);
          played = true;
        }
      }
    }

    if (!played && levelAi > 2) {
      if (aiPos === 1 && moves === 4) {
        const corners = [];
        corners.push(gameBoard.board[0]);
        corners.push(gameBoard.board[2]);
        corners.push(gameBoard.board[6]);
        corners.push(gameBoard.board[8]);
        let playPosition = corners.findIndex(checkBlank);
        switch (playPosition) {
          case 0:
            playPosition = 0;
            break;
          case 1:
            playPosition = 2;
            break;
          case 2:
            playPosition = 6;
            break;
          case 3:
            playPosition = 8;
            break;
          default:
            break;
        }
        if (corners.findIndex(checkO) >= 0) {
          // eslint-disable-next-line no-use-before-define
          gamePlayer.turns(p1, p2, playPosition, true);
          played = true;
        } else {
          // eslint-disable-next-line no-use-before-define
          gamePlayer.turns(p1, p2, 4, true);
          played = true;
        }
      }
    }

    function getAllIndexes(arr, val) {
      const indexes = [];
      arr.forEach((element, index) => {
        if (element === val) {
          indexes.push(index);
        }
      });
      return indexes;
    }

    if (!played) {
      const possiblePlay = getAllIndexes(gameBoard.board, '');
      const position = possiblePlay[Math.floor(Math.random() * possiblePlay.length)];
      // eslint-disable-next-line no-use-before-define
      gamePlayer.turns(p1, p2, position, true);
      played = true;
    }
  }

  return {
    aiPosition,
    makeMove,
    aiLevel,
    getAiPos,
  };
})();


const gamePlayer = (() => {
  let currentPlayer = 1;

  function resetPlayer() {
    currentPlayer = 1;
    gamePlayer.currentPlayer = currentPlayer;
  }

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

  const turns = (player1, player2, index, ai) => {
    if (gameBoard.validMove(index)) {
      gameBoard.putMarker(index, currentPlayer === 1 ? player1.marker : player2.marker, ai);
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
      if (!ai && !state && aiLogics.getAiPos() !== 0) {
        aiLogics.makeMove(player1, player2);
      }
    }
  };

  function addButtons(p1, p2) {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].addEventListener('click', () => {
        turns(p1, p2, i, false);
      });
    }
  }

  return {
    turns,
    addButtons,
    changeColors,
    currentPlayer,
    resetPlayer,
  };
})();

gameBoard.render();

const playerFactory = (name, marker) => ({ name, marker });

const buttonModel = (() => {
  let p1 = '';
  let p2 = '';

  function checkLevel() {
    if (document.getElementById('junior').checked) {
      aiLogics.aiLevel(1);
    }
    if (document.getElementById('mid').checked) {
      aiLogics.aiLevel(2);
    }
    if (document.getElementById('senior').checked) {
      aiLogics.aiLevel(3);
    }
  }

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
    aiLogics.aiPosition(0);
    checkLevel();

    if (document.getElementById('ai1').checked) {
      aiLogics.aiPosition(1);
      aiLogics.makeMove(p1, p2);
    }
    if (document.getElementById('ai2').checked) {
      aiLogics.aiPosition(2);
    }
  }

  function reset() {
    gameBoard.boardReset();
    gamePlayer.resetPlayer();
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

  function checkAi() {
    if (document.getElementById('ai1').checked && document.getElementById('ai2').checked) {
      document.getElementById('ai1').checked = false;
      document.getElementById('ai2').checked = false;
      this.checked = true;
      document.getElementById('player1').value = '';
      document.getElementById('player2').value = '';
    }

    if (this === document.getElementById('ai1')) {
      document.getElementById('player1').value = '';
    } else if (this === document.getElementById('ai2')) {
      document.getElementById('player2').value = '';
    }

    document.getElementById('player1').disabled = false;
    document.getElementById('player2').disabled = false;

    if (document.getElementById('ai1').checked) {
      document.getElementById('player1').value = 'AI';
      document.getElementById('player1').disabled = true;
    }

    if (document.getElementById('ai2').checked) {
      document.getElementById('player2').value = 'AI';
      document.getElementById('player2').disabled = true;
    }
  }

  return {
    getPlayerName,
    reset,
    checkAi,
    checkLevel,
  };
})();

function setListeners() {
  const bottom = document.getElementById('bottomelements');
  bottom.classList.add('d-none');

  const btnStart = document.getElementById('startgame');
  btnStart.addEventListener('click', buttonModel.getPlayerName);

  const playAgain = document.getElementById('playagain');
  playAgain.addEventListener('click', buttonModel.reset);

  const checkAi1 = document.getElementById('ai1');
  checkAi1.addEventListener('click', buttonModel.checkAi);

  const checkAi2 = document.getElementById('ai2');
  checkAi2.addEventListener('click', buttonModel.checkAi);

  const checkJunior = document.getElementById('junior');
  checkJunior.addEventListener('click', buttonModel.checkLevel);

  const checkMid = document.getElementById('mid');
  checkMid.addEventListener('click', buttonModel.checkLevel);

  const checkSenior = document.getElementById('senior');
  checkSenior.addEventListener('click', buttonModel.checkLevel);
}

export {
  gameBoard, setListeners,
};