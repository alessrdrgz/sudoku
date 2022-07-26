<script lang="ts">
	import SudokuScreen from '@components/sudoku/screens/sudoku-screen.svelte';
	import PlayIcon from '@icons/play.svelte';
	import { sudoku } from '@store/sudoku';

	const handleClick = () => {
		$sudoku.paused = !$sudoku.paused;
	};
</script>

<SudokuScreen>
	<div class="rounded-full bg-blue-400 w-16 h-16 cursor-pointer" on:click={handleClick}>
		<PlayIcon class="fill-white" />
	</div>
</SudokuScreen>
