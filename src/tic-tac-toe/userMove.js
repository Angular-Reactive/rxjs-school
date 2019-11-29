/**
 * El movimiento del usuario comienza con un click del mouse sobre el canvas. 
 */
import { canvas, CELL_SIZE } from './draw';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// Creacion del Observable click$ a partir de los clicks sobre el canvas y mapear el evento
const click$ = fromEvent(canvas, 'click').pipe(
    map(val => { return {
        x: Math.floor( val.offsetX / CELL_SIZE),
        y: Math.floor( val.offsetY / CELL_SIZE)
    }})
);


// Onservable con los movimientos @limpios@ del usuario
export const userMove$ = click$.pipe(
    // filter valid moves
);