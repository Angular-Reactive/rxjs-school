/**
 * "fromEvent":
 * - Permite asociar un Observable ad un event target concreto para emitir los eventos generados por este. 
 *   Con esta funcion se pueden canalizar determinados eventos de un elemento del DOM, o de events emitters de Node.
 */
import { displayLog } from './utils';
import { fromEvent } from 'rxjs';

export default () => {
    /** start coding */
    const actionBtn = document.getElementById('action-btn');
    const source$ = fromEvent(actionBtn, 'click');

    source$.subscribe(evt => {
        displayLog(`Click event at position (${evt.x}, ${evt.y})`);
    });

    fromEvent(document, 'mousemove').subscribe(evt => {
        console.log(evt);
    });


    /** end coding */
}