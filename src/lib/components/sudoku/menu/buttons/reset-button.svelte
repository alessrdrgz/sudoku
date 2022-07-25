<script lang="ts">
	import ResetIcon from '@icons/reset.svelte';
	import { sudoku } from '@store/sudoku';
	import SudokuButton from '@sudoku/menu/buttons/sudoku-button.svelte';
	import { resetSudoku } from '@utils/sudoku';

	const handleReset = () => resetSudoku({ current: $sudoku.puzzle, original: $sudoku.original });
</script>

<SudokuButton text="Reiniciar" on:click={handleReset} disabled={$sudoku.paused}>
	<ResetIcon class="fill-blue-400" />
</SudokuButton>
