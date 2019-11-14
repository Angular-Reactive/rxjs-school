/**
 * Pasando un observador al netodo subscribe() de un Observable,
 * tanto en su forma reducida como con la estructura completa.
 * 
 * Finalizando el flujo de datos desde el propio Observable a 
 * traves del metodo observer.complete(), y como cancellar la 
 * subscripcion desde fuera con el metodo unsubscribe de la subscripcion.
 */
import { displayLog } from './utils';
import { Observable } from 'rxjs';

export default () => {
    /** start coding */
    const hello = Observable.create(function(observer) {
        observer.next('Hello');
        setTimeout(()=>{
            observer.next('World');
            observer.complete();
        }, 2000);
    });

    const observer = {
        next: evt => displayLog(evt),
        error: err => console.err('[ERR] -', err),
        complete: () => displayLog('[DONE]')
    }
    
    const subscribe = hello.subscribe(observer);
    const subscribe2  = hello.subscribe(observer);
    subscribe.unsubscribe();

    /** end coding */
}