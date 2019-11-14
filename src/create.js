/**
 * El mecanismo esencial para crear un Observable es a traves del metodo create() de la clase Observable.
 */
import { displayLog } from './utils';
import { Observable } from 'rxjs';

export default () => {
    /** start coding */
    const hello = Observable.create(function(observer) {
        // next() es el metodo con el cual se ejecuta il push de valores desde el Observable hacia el observer
        observer.next("Hello");

        setTimeout(() => {
            observer.next("World");     
        }, 2000);
        
    });

    const subscribe = hello.subscribe(evt => displayLog(evt));


    /** end coding */
}