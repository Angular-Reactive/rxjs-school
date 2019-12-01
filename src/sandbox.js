/**
 * HAy tres flujos de datos que son importantes>
 * 
 * 1) Los movimientos del usuario.
 * 2) Los movimientos del ordernador.
 * 3) El estado de la partida.
 * 
 * La unica interaccion posible es a traves de los clicks del usuario.
 */
import { game$ } from './tic-tac-toe/game';
import { drawGame, writeMessage } from './tic-tac-toe/draw'; 
import { timer } from 'rxjs';


export default () => {
    /** start coding */
     
    game$.subscribe(gameState => {
        drawGame(gameState);
        if(gameState.winner) {
            timer(500).subscribe(()=> writeMessage(gameState.winner == 1 ? 'YOU WIN' : 'YOU LOSE'));
        }
        else if(gameState.finished) {
            timer(500).subscribe(()=> writeMessage('DRAWS'));
        }
    }, 
    err => console.log("error: ", err), 
    data => console.log("COMPLETE"));
    /** end coding */
}