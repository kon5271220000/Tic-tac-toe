function CreateUser(name, marker){
    let player_score = 0
    
    function increase_score() {
        player_score++
    }

    function getPlayerScore(){
        return player_score
    }

    return {name, marker, getPlayerScore, increase_score}
}

function CreateBoard(){
    let board = ["", "", "", "", "", "", "", "", ""]

    function getBoard() {
        return board
    }

    function setCell(index, marker){
        if(board[index] !== ""){
            console.log('invalid move, try again')
           return 
        }
        board[index] = marker
        return
    }
    function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""]
        return board
    }

    function drawBoard(){
        console.log(`
            ${board[0] || "_"} | ${board[1] || "_"} | ${board[2] || "_"}
            ----------
            ${board[3] || "_"} | ${board[4] || "_"} | ${board[5] || "_"}
            ----------
            ${board[6] || "_"} | ${board[7] || "_"} | ${board[8] || "_"}
            `)

            const htmlboard = document.getElementById("board")
            htmlboard.innerHTML = ""
            

            board.forEach((cell, index) => {
                const cellBoard = document.createElement("div")
                cellBoard.classList.add("cell") 
                cellBoard.textContent = cell || ""
                cellBoard.dataset.index = index
                htmlboard.appendChild(cellBoard)   
            });
            
    }

    return {getBoard, setCell, resetBoard, drawBoard}
}


function CreateGame() {
    const gameBoard = CreateBoard()
    let gameOVer = false
    let players = []
    let currenPlayerIndex = 0


    function getPlayer() {
        const player1name = prompt("Enter player 1 name:")
        const player2name = prompt("Enter player 2 name:")

        const player1 = CreateUser(player1name, "X")
        const player2 = CreateUser(player2name, "O")

        players.push(player1)
        players.push(player2)

        document.getElementById("player_1").textContent = player1name
        document.getElementById("player_2").textContent = player2name
        return players
    }

    function handleUserInput(index) {
        if(gameBoard.getBoard()[index] === "" && !gameOVer){
            gameBoard.setCell(index, players[currenPlayerIndex].marker)
            gameBoard.drawBoard()

            if(checkWin()){
                players[currenPlayerIndex].increase_score()
                showScore()
                document.getElementById("anouncement").textContent = `${players[currenPlayerIndex].name} win`
                gameOVer = true
            }
            else if(checkDraw()){
                document.getElementById("anouncement").textContent = "Draw!"
                gameOVer = true
            }
            else{
                currenPlayerIndex = 1 - currenPlayerIndex
                document.getElementById("anouncement").textContent = `${players[currenPlayerIndex].name} turn!`
            }
        }
        else{
            console.log("invalid move, try again")
        }
    }

    function clickBoard(){
        const htmlboard = document.getElementById("board")
        htmlboard.addEventListener("click", (event) => {
            const target = event.target

            if(target.classList.contains("cell")){
                const index = parseInt(target.dataset.index, 10)
                handleUserInput(index)
            }
        })
    }

    function checkWin(){
        const currentBoard = gameBoard.getBoard()

        if(
            (currentBoard[0] && currentBoard[0] == currentBoard[1] && currentBoard[0] == currentBoard[2]) ||
            (currentBoard[3] && currentBoard[3] == currentBoard[4] && currentBoard[3] == currentBoard[5]) ||
            (currentBoard[6] && currentBoard[6] == currentBoard[7] && currentBoard[6] == currentBoard[8]) ||
            (currentBoard[0] && currentBoard[0] == currentBoard[3] && currentBoard[0] == currentBoard[6]) ||
            (currentBoard[1] && currentBoard[1] == currentBoard[4] && currentBoard[1] == currentBoard[7]) ||
            (currentBoard[2] && currentBoard[2] == currentBoard[5] && currentBoard[2] == currentBoard[8]) ||
            (currentBoard[0] && currentBoard[0] == currentBoard[4] && currentBoard[0] == currentBoard[8]) ||
            (currentBoard[2] && currentBoard[2] == currentBoard[4] && currentBoard[2] == currentBoard[6])
        ){
            return true
        }
        return false
    }

    function checkDraw(){
        const currentBoard = gameBoard.getBoard()
        let sumMarker = 0
        for(let i = 0; i < currentBoard.length; i++){
            if(currentBoard[i] !== ""){
                sumMarker++
            }
        }
        if(sumMarker == 9){
            return true
        }
        return false
    }

    function gameRestart(){
        gameOVer = false
        currenPlayerIndex = 0
        document.getElementById("anouncement").textContent = ""
        gameBoard.resetBoard()
        gameBoard.drawBoard()
    }

    function newGame(){
        players = []
        getPlayer()
        showScore()
        gameRestart()
    }

    function showScore(){
        document.getElementById("score_1").textContent = players[0].getPlayerScore()
        document.getElementById("score_2").textContent = players[1].getPlayerScore()
    }

    return{gameBoard, getPlayer, players, handleUserInput, clickBoard, gameRestart, newGame, showScore}
}



document.addEventListener("DOMContentLoaded", () => {
    const game = CreateGame()
    game.getPlayer()
    game.gameBoard.resetBoard()
    game.gameBoard.drawBoard()

    game.clickBoard()
    

    document.getElementById("restart").addEventListener('click', () => {
        game.gameRestart()
    })

    document.getElementById("newGame").addEventListener('click', () => {
        game.newGame()
    })

    document.getElementById("score_1").textContent = game.players[0].player_score
    document.getElementById("score_2").textContent = game.players[1].player_score
});