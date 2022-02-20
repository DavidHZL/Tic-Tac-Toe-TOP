const gameBoard = (() => {
    var board = [];

    function startGame() {
        var gBoard = document.getElementById('gBoard');
        
        for (let i = 0; i < 9; i++) {
            var li = document.createElement('li');
            li.classList.add('tile');
            li.textContent = board[i];
            gBoard.append(li);
        }
    }

    document.getElementById('gBoard').onclick = function(event) {
        var target = getEventTarget(event);
        board.push(david.prototype.getMarker());
        target.textContent = david.prototype.getMarker();
        console.log(board);
    }

    return {
        startGame: startGame 
    };
})();

const Player = (marker) => {
    
    const getMarker = () => {return marker;};

    const setMarker = (newMarker) => {marker = newMarker};

    return {getMarker: getMarker,
            setMarker: setMarker};
}

const newHuman = (marker) => {
    const prototype = Player(marker);

    return {prototype}
}

const newComputer = (marker) => {
    const prototype = Player(marker);

    return {prototype};
}

const david = newHuman('X');
const comp = newComputer('O');

gameBoard.startGame();

console.log(david.prototype.getMarker());


function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}