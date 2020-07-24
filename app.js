const gameBoard = (() => {
  const board = ['','X','','X','O','O','O','X','']
  const render = () => {
    let cells = document.getElementsByClassName('cell');
    console.log(cells);
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = board[i];
      console.log(cells[i]); //second console output
    }
    
  }
  return {
    board,
    render
  };
})();

gameBoard.render();
