/**
 * Movimientos del ordenador.
 */
import { Subject, timer } from 'rxjs';

export const computerMove$ = new Subject(); 

// Esta funcion sirve a simular los movimientos del sistema y el Subject computerMove$.
export const simulateComputerTurnFn = (validCells) => {
    const randomCell = Math.floor(Math.random() * validCells.length);

    timer(500).subscribe(() => computerMove$.next(validCells[randomCell]));
}