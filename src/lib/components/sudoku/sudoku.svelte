<script lang="ts">
	import { sudoku } from '@store/sudoku';
	import SudokuFinishedScreen from '@sudoku/screens/sudoku-finished-screen.svelte';
	import SudokuPausedScreen from '@sudoku/screens/sudoku-paused-screen.svelte';
	import SudokuBox from '@sudoku/sudoku-box.svelte';
	export let puzzle: Array<Array<string>>;
</script>

<div class="flex flex-wrap w-[400px] h-[400px] border-2 border-black relative">
	{#each puzzle as box, boxIndex}
		<div
			class="flex flex-wrap flex-grow flex-shrink-0 bg-white border border-black basis-1/3"
			data-box={boxIndex}
		>
			<SudokuBox {box} {boxIndex} />
		</div>
	{/each}

	{#if $sudoku.paused && !$sudoku.finished && $sudoku.errors !== 3}
		<SudokuPausedScreen />
	{:else if $sudoku.finished}
		<SudokuFinishedScreen />
	{/if}
</div>
