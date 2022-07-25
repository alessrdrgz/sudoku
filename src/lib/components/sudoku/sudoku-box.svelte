<script lang="ts">
	import SudokuCell from '@sudoku/sudoku-cell.svelte';

	export let box: Array<string>;
	export let boxIndex: number;
</script>

{#each box as n, index}
	<div class="flex-grow flex-shrink-0 basis-1/3">
		<SudokuCell value={n} box={boxIndex} {index} />
	</div>
{/each}
