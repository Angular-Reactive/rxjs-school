/**
 * Operador "mapTo"
 * - Para cada evento que entra, transforma la salida devolviendo siempre  el mismo valor.
 */
import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { mapTo, map, filter } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');

    const gridClicks$ = fromEvent(grid, 'click').pipe(
        map(val => [Math.floor(val.offsetY/50), Math.floor(val.offsetX/50)]),
        filter(([row, col]) => (row + col) % 2 != 0 )
        // mapTo('CLICK')
    );

    const subscription = gridClicks$.subscribe(data => displayLog(data));

    /** end coding */
}