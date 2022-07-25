import { sudoku } from '@store/sudoku';
import { $, $$ } from '@utils/dom-utils';
import { getSudoku } from 'sudoku-gen';
import { get } from 'svelte/store';

export enum difficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard',
	EXPERT = 'expert'
}

function formatPuzzleArray({ str, swtch, size }: { str: string; swtch: number; size: number }) {
	let index = 0;
	const arr: Array<Array<string>> = [];

	let minIndex = 0;
	str.split('').forEach((c: string, i: number) => {
		if (i % swtch === 0 && i !== 0) index++;
		if (index >= minIndex + 3) index = minIndex;
		arr[index] ??= [];
		arr[index].push(c === '-' ? '' : c);
		if (arr[index].length === size) minIndex++;
	});

	return arr;
}

export function getRow({ box, index }: { box: number; index: number }) {
	const row = Math.floor(index / 3);
	if (box > 5) return row + 6;
	if (box > 2) return row + 3;
	return row;
}

function getColNumber(index: number) {
	if ([2, 5, 8].includes(index)) return 2;
	if ([1, 4, 7].includes(index)) return 1;
	return 0;
}

export function getCol({ box, index }: { box: number; index: number }) {
	if ([2, 5, 8].includes(box)) return getColNumber(index) + 6;
	if ([1, 4, 7].includes(box)) return getColNumber(index) + 3;
	return getColNumber(index);
}

export function generateSudoku({ difficulty }: { difficulty: difficulty }) {
	const { puzzle, solution } = getSudoku(difficulty);
	const sudokuArr = formatPuzzleArray({ str: puzzle, swtch: 3, size: 9 });
	const solutionArr = formatPuzzleArray({ str: solution, swtch: 3, size: 9 });

	return { puzzle: sudokuArr, solution: solutionArr };
}

function getElementsToHighlight(e: HTMLInputElement): {
	elements: Array<HTMLInputElement>;
	values: Array<HTMLInputElement>;
} {
	const col = e.getAttribute('data-col');
	const row = e.getAttribute('data-row');
	const box = e.parentElement?.parentElement?.getAttribute('data-box');
	const value = e.value;

	const elements = Array.from($$('input.sudoku-cell')) as HTMLInputElement[];

	return {
		elements: [
			...elements.filter((e) => e.getAttribute('data-col') === col),
			...elements.filter((e) => e.getAttribute('data-row') === row),
			...elements.filter((e) => e.getAttribute('data-box') === box)
		],

		values: elements.filter((el) => el.value === value && value !== '')
	};
}

export function highlighting(e: HTMLInputElement) {
	e.addEventListener('focusin', (e) => {
		const { target } = e;

		if (target !== null) {
			sudoku.set({ ...get(sudoku), highlight: target as HTMLInputElement });
			const { elements, values } = getElementsToHighlight(target as HTMLInputElement);
			elements.forEach((e) => {
				e.classList.add('bg-gray-200');
			});
			(target as HTMLInputElement).classList.remove('bg-gray-200');
			(target as HTMLInputElement).classList.add('bg-blue-100');

			values.forEach((e) => {
				e.classList.remove('bg-gray-100');
				e.classList.add('bg-blue-100');
			});
		}
	});

	e.addEventListener('focusout', (e) => {
		const { target } = e;

		if (target !== null) {
			const { elements, values } = getElementsToHighlight(target as HTMLInputElement);

			elements.forEach((e) => {
				e.classList.remove('bg-gray-200');
			});

			values.forEach((e) => {
				e.classList.remove('bg-blue-100');
			});

			(target as HTMLInputElement).classList.remove('bg-blue-100');
		}
	});
}

export function checkSudoku({ puzzle, solution }: { puzzle: string[][]; solution: string[][] }) {
	puzzle.forEach((box, boxIndex) => {
		box.forEach((n, cellIndex) => {
			if (n !== solution[boxIndex][cellIndex] && n !== '') {
				const row = getRow({ box: boxIndex, index: cellIndex });
				const col = getCol({ box: boxIndex, index: cellIndex });
				const cell = $(`input[data-row="${row}"][data-col="${col}"]`) as HTMLInputElement;

				cell.classList.add('bg-red-100');
				cell.classList.add('text-red-600');
			}
		});
	});
}

export function resetCheckSudoku() {
	$$('input.sudoku-cell').forEach((e) => {
		e.classList.remove('bg-red-100');
		e.classList.remove('text-red-600');
	});
}

export function resetSudoku({ current, original }: { current: string[][]; original: string[][] }) {
	current.forEach((box, boxIndex) => {
		box.forEach((n, cellIndex) => {
			if (n !== original[boxIndex][cellIndex]) {
				const row = getRow({ box: boxIndex, index: cellIndex });
				const col = getCol({ box: boxIndex, index: cellIndex });
				const cell = $(`input[data-row="${row}"][data-col="${col}"]`) as HTMLInputElement;

				cell.value = '';
			}
		});
	});

	sudoku.set({ ...get(sudoku), puzzle: original.map((o) => o.slice()), original, hints: 3 });

	resetCheckSudoku();
}

export function getHint() {
	const { highlight: cell, solution, puzzle } = get(sudoku);

	if (cell !== null) {
		const box = cell.parentElement?.parentElement;

		if (box && box !== null) {
			const boxIndexStr = box.getAttribute('data-box');
			const boxIndex = boxIndexStr !== null ? +boxIndexStr : null;

			if (boxIndex !== null) {
				let index = null;
				Array.from(box.childNodes).forEach((e, i) => {
					if (e.firstChild === cell) index = i;
				});
				if (index !== null) {
					cell.value = solution[boxIndex][index];
					puzzle[boxIndex][index] = solution[boxIndex][index];
					cell.focus();
				}
			}
		}
	}
}
