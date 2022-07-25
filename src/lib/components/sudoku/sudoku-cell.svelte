<script lang="ts">
	import { sudoku } from '@store/sudoku';
	import { checkSudoku, getCol, getRow, highlighting } from '@utils/sudoku';

	export let value = '';
	export let box: number;
	export let index: number;
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

			(target as HTMLInputElement).classList.remove('text-red-600');
			(target as HTMLInputElement).classList.remove('bg-red-100');

			if ($sudoku.autoCheck) {
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
	readonly={value !== ''}
	data-row={getRow({ box, index })}
	data-col={getCol({ box, index })}
	use:highlighting
	on:change={handleChange}
/>
