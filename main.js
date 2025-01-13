function CreateUser(name, marker){
    return {name, marker}
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
    }

    return {getBoard, setCell, resetBoard, drawBoard}
}


function CreateGame() {
    const gameBoard = CreateBoard()
    let gameOVer = false
    const players = []
    let currenPlayerIndex = 0


    function getPlayer() {
        const player1name = prompt("Enter player 1 name:")
        const player2name = prompt("Enter player 2 name:")

        const player1 = CreateUser(player1name, "X")
        const player2 = CreateUser(player2name, "O")

        players.push(player1)
        players.push(player2)

        return players
    }

    function handleUserInput(index) {
        if(gameBoard.getBoard()[index] === ""){
            gameBoard.setCell(index, players[currenPlayerIndex].marker)
            currenPlayerIndex = 1 - currenPlayerIndex
            gameBoard.drawBoard()
            return
        }
        console.log("invalid move, try again")
        return
        
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

    function gameLoop(){
        getPlayer()
        while(!gameOVer){
            if(checkWin()){
                console.log(`${players[1-currenPlayerIndex].name} win`)
                gameOVer = true
            }
            else if(checkDraw()){
                console.log("draw!")
                gameOVer = true
            }
            else{
                let index = prompt(`${players[currenPlayerIndex].name} move:`)
                handleUserInput(index)
            }
        }
        if(gameOVer){
            const choice = prompt("Do you want to play again (Y/N)?: ")
            if(choice === "y"){
                gameRestart()
            }
            else{
                return
            }
            return
        }
    }

    function gameRestart(){
        gameOVer = false
        currenPlayerIndex = 0
        gameBoard.resetBoard()
        gameLoop()
    }

    return{getPlayer, players, handleUserInput, gameLoop}
}



