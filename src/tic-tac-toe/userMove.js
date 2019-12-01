/**
 * El movimiento del usuario comienza con un click del mouse sobre el canvas. 
 */
import { canvas, CELL_SIZE } from './draw';
import { fromEvent } from 'rxjs';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { gameState$ } from './gameState';

// Stream para detectar las casillas clicadas.
const click$ = fromEvent(canvas, 'click').pipe(
    map(val => { return {
        x: Math.floor( val.offsetX / CELL_SIZE),
        y: Math.floor( val.offsetY / CELL_SIZE)
    }})
);


// Luego, se coge este stream como origen y a cada click se ha recibido
// el estado actual de la partida para filtrar solo aquellos clicks validos:
// Los que son del jugador 1, que es el propio jugador y que ademas esas casillas
// esten vacias.
export const userMove$ = click$.pipe(
    // filter valid moves
    withLatestFrom(gameState$),
    filter(([click, state]) => state.nextPlayer == 1), // letting pass the events if the player is 1
    filter(([click, state]) => state.board[click.y][click.x] == 0), //  letting pass events for cells with 0 values
    map(([click, state]) => click)
);