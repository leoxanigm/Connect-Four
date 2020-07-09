document.addEventListener('DOMContentLoaded', () => {
  const gameEl = document.getElementById('game');
  const blocks = document.getElementsByClassName('block');
  const turnEl = document.getElementById('turn');
  const winnderContainer = document.getElementById('winner-container');
  const winnderEl = document.getElementById('winner');
  const replyBtn = document.getElementById('reply-btn');

  let player = 1;

  //fill game element with 100 div blocks
  for (let i = 0; i < 100; i++) {
    let block = document.createElement('div');
    block.classList.add('block');
    block.setAttribute('data-position', i);
    gameEl.appendChild(block);
  }

  gameEl.addEventListener('click', placeDisk); // add event listener to the main container
  replyBtn.addEventListener('click', () => {
    location.reload();
  });

  function placeDisk(e) {
    let nextBlock =
      blocks[parseInt(e.target.getAttribute('data-position')) + 10];

    if (!nextBlock || nextBlock.classList.contains('disk')) {
      e.target.classList.add('disk', 'player' + player);

      checkWinner(player, e.target);

      player === 1 ? (player = 2) : (player = 1);
      turnEl.textContent = player;
    }
  }

  function checkWinner(player, el) {
    // This function checkes a winner by assuming the clicked element as starting coordinate
    // and checking 8 combination of consecutive addition or subtraction from the
    // starting coordinate. For example [0, -10, -20, -30] will be one of the winning
    // coordinates. Here, winningArrayProto is the increasint/decreasing factor of
    // each 8 array combinations.

    let winningArrayProto = [11, 10, 9, 1, -1, -9, -10, -11];
    let foundWinner = false;

    for (let i = 0; i < winningArrayProto.length; i++) {
      let count = 0;
      let checkArr = [false, false, false, false];
      for (let j = 0; j < 4; j++) {
        let currentCheckBlock =
          blocks[parseInt(el.getAttribute('data-position')) + count];

        if (!currentCheckBlock) break;
        if (
          ['disk', 'player' + player].every(v =>
            currentCheckBlock.classList.contains(v)
          )
        ) {
          checkArr[j] = true;
        }
        count += winningArrayProto[i];
      }
      if (checkArr.every(item => item)) {
        foundWinner = true;
        break;
      }
    }

    if (foundWinner) {
      winnderContainer.style.display = 'block';
      winnderEl.textContent = player;
      gameEl.removeEventListener('click', placeDisk);
    }
  }
});
