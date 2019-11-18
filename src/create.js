/**
 * "interval"
 * - Esta funcion permite crear sequencias de Observables a partir de eventos que se repiten cada cierto tiempo.
 *   La sequencia que devuelve no acaba nunca, por lo que el fin de subscripcion se tiene que gestionar desde fuera.
 * 
  * "timer"
 * - Equivale al metodo global setTimeout() e devuelve un Observable.
 *   Permite crear tambien intervalos a partir del primer evento. Se crea un intervalo con un cierto retraso y a partir de entonces, un intervalo.
 */
import { displayLog } from './utils';
import { interval, timer } from 'rxjs';

export default () => {
    /** start coding */
    const source = interval(500);

    const subscription = source.subscribe(data => displayLog(data));

    timer(3000).subscribe(()=>  subscription.unsubscribe());

    const source2 = timer(4000, 100);
    const subscription2 = source2.subscribe(data => displayLog(`2 - ${data}`));

    timer(6000).subscribe(()=>  subscription2.unsubscribe());

    // setTimeout(() => subscription.unsubscribe(), 3000);


    /** end coding */
}