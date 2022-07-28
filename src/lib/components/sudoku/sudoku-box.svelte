<script lang="ts">
	import { sudoku } from '@store/sudoku';
	import SudokuCell from '@sudoku/sudoku-cell.svelte';

	export let box: Array<string>;
	export let boxIndex: number;
</script>

{#each box as n, index}
	<div class="flex-grow flex-shrink-0 basis-1/3">
		{#if $sudoku.errors === 3}
			<SudokuCell value={n} box={boxIndex} {index} disabled={true} />
		{:else if ($sudoku.paused || $sudoku.finished) && $sudoku.errors !== 3}
			<SudokuCell value={''} box={boxIndex} {index} />
		{:else}
			<SudokuCell value={n} box={boxIndex} {index} />
		{/if}
	</div>
{/each}
