const gameBoard = (() => {
  const board = ['','','','','','','','','']
  const render = () => {
    let cells = document.getElementsByClassName('cell');
    console.log(cells);
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = board[i];
    }
    
  }
  return {
    board,
    render
  };
})();

gameBoard.render();
