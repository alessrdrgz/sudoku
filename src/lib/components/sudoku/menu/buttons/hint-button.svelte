<script lang="ts">
	import HintIcon from '@icons/magnifying-glass.svelte';
	import { sudoku } from '@store/sudoku';
	import SudokuButton from '@sudoku/menu/buttons/sudoku-button.svelte';
	import { getHint } from '@utils/sudoku';

	const handleClick = () => {
		if ($sudoku.hints > 0) {
			getHint();
			$sudoku.hints--;
		}
	};
</script>

<SudokuButton text="Pista" on:click={handleClick} disabled={$sudoku.hints === 0}>
	<div class="absolute w-4 h-4 text-xs text-white bg-blue-400 rounded-full -top-2 -right-1">
		{$sudoku.hints}
	</div>
	<HintIcon class="fill-blue-400" />
</SudokuButton>
