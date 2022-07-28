<script lang="ts">
	import { sudoku } from '@store/sudoku';
	import SudokuHeader from '@sudoku/header/sudoku-header.svelte';
	import SudokuMenu from '@sudoku/menu/sudoku-menu.svelte';
	import Sudoku from '@sudoku/sudoku.svelte';
</script>

<div class="flex flex-col items-center justify-center w-full h-screen gap-1 bg-gray-800">
	<SudokuHeader />
	<Sudoku puzzle={$sudoku.puzzle} />
	<SudokuMenu />
</div>
