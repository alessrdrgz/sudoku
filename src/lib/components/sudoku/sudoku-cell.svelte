<script lang="ts">
	import { sudoku } from '@store/sudoku';
	import { checkSudoku, getCol, getRow, highlighting } from '@utils/sudoku';

	export let value = '';
	export let box: number;
	export let index: number;
	export let disabled = false;
	const border =
		index === 1 || index === 7
			? 'border-l border-r'
			: index === 3 || index === 5
			? 'border-t border-b'
			: index === 4
			? 'border'
			: '';

	const handleChange = (e: Event) => {
		const { target } = e;

		if (target !== null) {
			const { value } = target as HTMLInputElement;
			$sudoku.puzzle[box][index] = value.toString();

			if ($sudoku.puzzle[box][index] !== $sudoku.solution[box][index]) {
				sudoku.update((su) => {
					su.errors++;
					if (su.errors >= 3) {
						su.paused = true;
						setTimeout(() => {
							checkSudoku({ puzzle: su.puzzle, solution: su.solution });
						}, 100);
					}
					return su;
				});
			}

			(target as HTMLInputElement).classList.remove('text-red-600');
			(target as HTMLInputElement).classList.remove('bg-red-100');

			const finished = $sudoku.puzzle.every(
				(box) => box.filter((cell) => cell !== '').length === 9
			);

			if ($sudoku.autoCheck || finished) {
				checkSudoku({
					puzzle: $sudoku.puzzle,
					solution: $sudoku.solution
				});
			}
		}
	};
</script>

<input
	class={`w-full h-full text-2xl text-center [-webkit-appearance: none;] sudoku-cell ${border} border-gray-400`}
	type="number"
	min="1"
	max="9"
	{value}
	readonly={value !== '' || disabled}
	data-row={getRow({ box, index })}
	data-col={getCol({ box, index })}
	use:highlighting
	on:change={handleChange}
/>
