
const displayMessage = function(message){

    document.querySelector("#Results").innerHTML = message;


};
const Gameboard = (function(){
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    for (let i=0;i<rows;i++){
        gameboard[i]=[];
        for(let j=0;j<columns;j++){
            gameboard[i].push(" ");
        }
    }

    const render = function (){
        let boardHTML = "";
        gameboard.forEach(function (row, rowIndex){
            row.forEach(function(square,columnIndex){
                boardHTML += `<div class="square" id="square-${rowIndex}-${columnIndex}">${square}</div>`;
            })
            boardHTML += `<br>`;  // Adding a break to separate rows
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;

        const squares = document.querySelectorAll(".square");
        
        squares.forEach(function (square) {
                square.addEventListener("click", Game.handleClick);
        });
     }

     return {
        render,
        gameboard
     }

    })();

const createPlayer = function(name, mark){

    return {
        name,
        mark
    }
}


const Game = (function(){


    let players = [];
    let currentPlayerIndex;
    let gameOver

    const start = function(){
        players = [
        createPlayer(document.querySelector("#player1").value, "X"),
        createPlayer(document.querySelector("#player2").value, "O")];

        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const handleClick = function (event){

        if(gameOver){
            return;
        }

        let [_, rowIndex, columnIndex] = (event.target.id.split("-"));
        if (Gameboard.gameboard[rowIndex][columnIndex]!==" "){
            return;
        }
        update(rowIndex,columnIndex,players[currentPlayerIndex].mark);
       

        if(checkWin(players[currentPlayerIndex].mark)){
            gameOver = true;
            displayMessage(players[currentPlayerIndex].name + " won!");
            Gameboard.render();
            return;
        } else if(checkTie(Gameboard.gameboard)){
            gameOver = true;
            Gameboard.render();
            displayMessage("It's a tie folks");
        }

        Gameboard.render(); // Re-render the gameboard to reflect the update

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

        

    }

    const checkTie = function(board){

        return board.flat().every(cell => cell !==" ");

    }

    const checkWin = function (mark){

        for(let i=0;i<3;i++){
            if (Gameboard.gameboard[i][0] == mark &&
                Gameboard.gameboard[i][1] == mark &&
                Gameboard.gameboard[i][2] == mark){
                    return true;
                }
        }

        for(let j=0;j<3;j++){
            if (Gameboard.gameboard[0][j] == mark &&
                Gameboard.gameboard[1][j] == mark &&
                Gameboard.gameboard[2][j] == mark){
                    return true;
                }
        }

        
            if (Gameboard.gameboard[0][0] == mark &&
                Gameboard.gameboard[1][1] == mark &&
                Gameboard.gameboard[2][2] == mark){
                    return true;
                }
        

        
            if (Gameboard.gameboard[2][0] == mark &&
                Gameboard.gameboard[1][1] == mark &&
                Gameboard.gameboard[0][2] == mark){
                    return true;
                }
        
        
        return false;
    }

    const update = function(rowIndex, columnIndex, value){

        Gameboard.gameboard[rowIndex][columnIndex] = value;
    }

    const restart = function(){
        const rows = 3;
        const columns = 3;

        for (let i=0;i<rows;i++){
            Gameboard.gameboard[i]=[];
            for(let j=0;j<columns;j++){
                Gameboard.gameboard[i].push(" ");
            }
        }

        displayMessage(" ");
        Gameboard.render();
        gameOver=false;
    }

    return {
        start,
        handleClick,
        restart
    }
})();

const startButton = document.querySelector("#start_button");
startButton.addEventListener("click", function(){
    Game.start();
})

const restartButton = document.querySelector("#restart_button");
restartButton.addEventListener("click", function(){
    Game.restart();
})

