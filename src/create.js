/**
 * La funcion "from" sirve para crear Observables a partir de arrays,
 * y tambien a partir de promises e Iterables.
 */
import { displayLog } from './utils';
import { from } from 'rxjs';

export default () => {
    /** start coding */

    const myArray = [1,2,3,4,5];
    const myString = 'Hello World';
    const myPromise = new Promise(resolve => setTimeout(() => {
        resolve('Hello World');
    }, 2000));

    const observable = from(myPromise);

    const subscription = observable.subscribe(data => displayLog(data));
    // subscription.unsubscribe();

    /** end coding */
}