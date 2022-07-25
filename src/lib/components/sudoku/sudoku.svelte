<script lang="ts">
	import SudokuBox from '@sudoku/sudoku-box.svelte';
	export let puzzle: Array<Array<string>>;
</script>

<div class="flex flex-wrap w-[400px] h-[400px] border-2 border-black">
	{#each puzzle as box, boxIndex}
		<div
			class="flex flex-wrap flex-grow flex-shrink-0 bg-white border border-black basis-1/3"
			data-box={boxIndex}
		>
			<SudokuBox {box} {boxIndex} />
		</div>
	{/each}
</div>
