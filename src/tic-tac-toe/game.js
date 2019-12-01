import { Observable , merge} from 'rxjs';
import { computerMove$, simulateComputerTurnFn } from './computerMove';
import { userMove$ } from './userMove';
import { scan, startWith, tap, takeWhile } from 'rxjs/operators';
import { gameState$ } from './gameState';

//pure function to find out empty cells
export const getEmptyCells = (board) =>{
    const emptyCells = [];
    //detect empty cells
    for(let x = 0; x < board.length; x++){
        for(let y=0; y < board[0].length; y++){
            if(board[y][x] == 0){
                emptyCells.push({x, y})
            }
        }
    };
    return emptyCells;        
}

//pure function to find out which player have won (if any)
const findOutWinner = board =>{
    //check rows and cols
    for (let i=0;i<3;i++){
        if( (board[i][0] && board[i][0] == board[i][1] && board[i][1] == board[i][2]) ){
            return board[i][0];
        }
        else if ( (board[0][i] && board[0][i] == board[1][i] && board[1][i] == board[2][i]) ){
                return board[0][i];
        }
    }
    //check diagonals 
    if( (board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) || 
        (board[2][0] && board[2][0] == board[1][1] && board[1][1] == board[0][2]) ){
        return board[1][1];
    }

    return null;  
}

// This pure function returns the updated state
const updateGameStateFn = (gameState, move) => {
    if(!move){
        return gameState;
    }

    // cloning with array destructuring and spread operator
    let updatedBoard = [...gameState.board];
    updatedBoard[move.y][move.x] = gameState.nextPlayer;
    const haveEmptyCells = getEmptyCells(updatedBoard).length == 0 ? false : true;
    let finished = !haveEmptyCells;
    const winner = findOutWinner(updatedBoard);

    if(winner) {
        finished = true;
    }

    return {
        board: updatedBoard,
        nextPlayer: gameState.nextPlayer == 1 ? 2 : 1,
        finished: finished,
        winner: winner 
    }

}
    

// Este es el stream principal de datos que se crea a partir de los movimientos del usuario
// y del sistema.
// Se utiliza el operador "scan" para inicializar y devolver el estado actualizado de la partida
// en funcion de los movimientos.
// Cuando le toca al sistema, se ha anadido un efecto colateral para simular su movimiento,
// y se completa la partida cuando cuando la variable "finished" es true.
//
// Comoe "userMove$" necesita conocer el estado y tenia una dependencia circular con "game$" que
// es donde esta el estado, se ha tenido que crear un Subject intermedio a modo de proxy.
// Este Subject ha emitido el estado de la partida a cada cambio gracias al primer "tap" presente
// en el flujo "game$"
export const game$ = merge(userMove$, computerMove$).pipe(
    startWith(null),
    // receiving the update accumulated state and emiting through the gameState$ proxy
    scan(updateGameStateFn, gameState$.value),
    // gameState$ will emit the same previous value
    tap(state => gameState$.next(state)),
    tap(state => {
        if(state.nextPlayer == 2 && !state.finished) {
            simulateComputerTurnFn(getEmptyCells(state.board));
        }
    }),
    takeWhile(({finished}) => finished == false, true)
);