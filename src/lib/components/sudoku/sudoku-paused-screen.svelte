<script lang="ts">
	import PlayIcon from '@icons/play.svelte';
	import { sudoku } from '@store/sudoku';

	const handleClick = () => {
		$sudoku.paused = !$sudoku.paused;
	};
</script>

<div class="flex absolute h-full w-full items-center justify-center" on:click={handleClick}>
	<div class="rounded-full bg-blue-400 w-16 h-16">
		<PlayIcon class="fill-white" />
	</div>
</div>
