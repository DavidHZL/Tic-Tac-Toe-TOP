const intro = document.querySelector('.intro');
const introTitle = document.querySelector('.intro-title');
const controlBox = document.querySelector('.controlBox');
const gameScreen = document.querySelector('.gameScreen');

const Player = (marker) => {
    
    const getSign = () => {return marker;};

    return {getSign: getSign};
}

const gameBoard = (() => {
    var board = ['', '', '', '', '', '', '', '', ''];

    const setField = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    };

    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
        board[i] = "";
        }
    };

    return {setField, getField, reset};
})();

const displayController = (() => {
    const messageElement = document.getElementById('message');
    const resetButton = document.getElementById('reset');

    const startUp = function() {
        gameScreen.style.display = 'none';
    
        introTitle.textContent = 'Tic Tac Toe';
        var newBtn = document.createElement('input');
    
        newBtn.type = 'button';
        newBtn.classList.add('controlBoxBtn');
        newBtn.setAttribute('id', 'start-game');
        newBtn.onclick = function() {
            intro.style.display = 'none';
            gameScreen.style.display = 'grid';
            buildBoard();
        };
        newBtn.value = 'Start Game';
    
        controlBox.append(newBtn);
    } 

    const buildBoard = () => {
        var gBoard = document.getElementById('gBoard');

        for(let i = 0; i < 9; i++){
            var newDiv = document.createElement('div');
            newDiv.classList.add('tile');
            newDiv.setAttribute('id', 'tile');
            newDiv.dataset.index = i;
            newDiv.addEventListener("click", (e) => {
                if (gameController.getIsOver() || e.target.textContent != '') return;
                gameController.playRound(parseInt(e.target.dataset.index));
                updateGameBoard();
            })
            gBoard.append(newDiv);
        }
    }

    resetButton.addEventListener("click", (e) => {
        gameBoard.reset();
        gameController.reset();
        updateGameBoard();
        setMessageElement("Player X's turn");
    })

    
    const updateGameBoard = () => {
        let tileElements = document.querySelectorAll('#tile');
        console.log(tileElements);
        for(let i = 0; i < tileElements.length; i++){
            tileElements[i].textContent = gameBoard.getField(i);
        }
    };

    const setResultMessage = (winner) => {
        if (winner === "Draw") {
          setMessageElement("It's a draw!");
        } else {
          setMessageElement(`Player ${winner} has won!`);
        }
      };
    
    const setMessageElement = (message) => {
        messageElement.textContent = message;
    };
    
    return { setResultMessage, setMessageElement, startUp };
})();

const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayController.setMessageElement(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9) {
            displayController.setResultMessage("Draw");
            isOver = true;
            return;
        }
        round++;
        displayController.setMessageElement(
            `Player ${getCurrentPlayerSign()}'s Turn`
        );
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
      };

    const checkWinner = (fieldIndex) => {
        const winConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
    
        return winConditions
          .filter((combination) => combination.includes(fieldIndex))
          .some((possibleCombination) =>
            possibleCombination.every(
              (index) => gameBoard.getField(index) === getCurrentPlayerSign()
            )
          );
    };

    const getIsOver = () => {
        return isOver;
    }

    const reset = () => {
        round = 1;
        isOver = false;
    }

    
    return { playRound, getIsOver, reset };
})();

displayController.startUp();