const Gameboard = (()=>{
    let _gameboard = new Array(9);

    function resetBoard(){
        _gameboard = new Array(9);
    }

    function setMarker(i, marker){
        _gameboard[i] = marker;
    }

    function getMarker(i){
        return _gameboard[i];
    }

    return {_gameboard, resetBoard, setMarker, getMarker}
})();

const Player = (name, marker)=>{
    return {name, marker}
}

const GameController = (() =>{

    const board = document.querySelector('.gameboard');
    const modal = document.querySelector('.modal');
    const winP1Window = document.querySelector('.winP1');
    const winP2Window = document.querySelector('.winP2');
    const draw = document.querySelector('.draw');

    player1 = Player('Bill', 'x');
    player2 = Player('Willy', 'o');

    let activePlayer = player1;

    function winP1(){
        modal.classList.add('show');
        modal.classList.add('hide');
        winP1Window.classList.add('show');
        winP1Window.classList.remove('hide');
    }

    function winP2(){
        modal.classList.add('show');
        modal.classList.add('hide');
        winP2Window.classList.add('show');
        winP2Window.classList.remove('hide');
    }

    function checkRows (board){
        for (let i = 0; i < 3; i++) {
            let row = []
            for (let j = i * 3; j < i * 3 + 3; j++) {
                row.push(board.getMarker(j));
            }

            if (row.every(field => field == 'x')) winP1()
            else if (row.every(field => field == 'o')) winP2();
        }
    }

    function checkСolumns (board){
        for (let i = 0; i < 3; i++) {
            let column = []
            for (let j = i; j <= i+6; j+=3) {
                column.push(board.getMarker(j));
            }
            if (column.every(field => field == 'x')) winP1()
            else if (column.every(field => field == 'o')) winP2();
        }
        
    }

    function checkDraw(board){
        let gameBoard = []

        for (let i =0; i< 9; i++){
            gameBoard.push(board.getMarker(i));
        }

        if (gameBoard.every(field => field)){
            modal.classList.add('show');
            modal.classList.add('hide');
            draw.classList.add('show');
            draw.classList.remove('hide');
        }
    }

    function checkDiagonals(board){
        let diagonal1 = [board.getMarker(0), board.getMarker(4), board.getMarker(8)];
        let diagonal2 = [board.getMarker(2), board.getMarker(4), board.getMarker(6)];

        if (diagonal1.every(field => field == 'x')) winP1()
        else if (diagonal1.every(field => field == 'o')) winP2();

        if (diagonal2.every(field => field == 'x')) winP1()
        else if (diagonal2.every(field => field == 'o')) winP2();
    }

    board.addEventListener('click', (e)=>{
        const target = e.target;
        if (target.className === 'gameblock'){
            Array.from(board.children).forEach((elem, i)=>{
                if (elem === target) {
                    if (!target.innerText) {
                        Gameboard.setMarker(i, activePlayer.marker);
                        target.innerText = activePlayer.marker;
                        activePlayer = activePlayer == player1 ? player2 : player1;
                        checkRows(Gameboard);
                        checkСolumns(Gameboard);
                        checkDiagonals(Gameboard);
                        checkDraw(Gameboard);
                    }
                }
            })
        }
    });
})();




