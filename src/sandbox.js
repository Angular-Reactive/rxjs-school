import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, concatMap, catchError, retry } from 'rxjs/operators';

export default () => {
    /** start coding */
    
    const button = document.getElementById('btn');

    /** get comments on button click */
    fromEvent(button, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        concatMap(id => api.getComment(id).pipe(
            // catchError((err, src$) => {console.log('Catch!'); return src$;}),
            retry(3)
        )),
        map(JSON.stringify),
        tap(console.log),
    ).subscribe(displayLog, err => console.log('Error', err.message));

    /** end coding */
}