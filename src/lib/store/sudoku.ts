import { capitalize } from '@utils/string';
import { difficulty, generateSudoku } from '@utils/sudoku';
import { writable, type Writable } from 'svelte/store';

const initialState = {
	...generateSudoku({ difficulty: difficulty.EASY }),
	autoCheck: false,
	highlight: null,
	hints: 3,
	paused: false,
	reset: false,
	difficulty: capitalize(difficulty.EASY),
	finished: false,
	errors: 0
};

export type Sudoku = {
	puzzle: string[][];
	original: string[][];
	solution: string[][];
	autoCheck: boolean;
	highlight: HTMLInputElement | null;
	hints: number;
	paused: boolean;
	reset: boolean;
	difficulty: string;
	finished: boolean;
	errors: number;
};

export const sudoku: Writable<Sudoku> = writable({
	...initialState,
	original: initialState.puzzle.map((arr) => arr.slice())
});
