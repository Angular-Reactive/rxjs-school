/**
 * Operador "tap":
 * - Ejecuta un efecto colateral para cada valor emitido por el Observable, pero no puede modificar en ningun modo el stream de datos del Observable. 
 *   O sea, lo que recibe es lo que emite.
 */
import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        tap(val => console.log('Before map: ', val)),
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        tap(val => console.log(`After map: ${val}`)),
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}