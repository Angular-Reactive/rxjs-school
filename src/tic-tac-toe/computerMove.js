/**
 * Movimientos del ordenador.
 */
import { Subject, timer } from 'rxjs';

export const computerMove$ = new Subject(); 

// Esta funcion recibira un un array de coordenadas validas
// y va a elegir una como un movimiento del sistema
export const simulateComputerTurnFn = (validCells) => {
    const randomCell = Math.floor(Math.random() * validCells.length);

    timer(500).subscribe(() => computerMove$.next(validCells[randomCell]));
}