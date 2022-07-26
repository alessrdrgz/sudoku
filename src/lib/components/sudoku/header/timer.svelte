<script lang="ts">
	import PauseIcon from '@icons/pause.svelte';
	import PlayIcon from '@icons/play.svelte';
	import { sudoku } from '@store/sudoku';
	import { time } from '@store/timer';
	import { formatTime } from '@utils/timer';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	let previous = 0;
	let lapse = 0;
	let unsubscribe: Unsubscriber | null = null;
	let sudokuUnsubscribe: Unsubscriber | null = null;

	let pauseState = false;

	function start() {
		unsubscribe = time.subscribe((ms) => {
			lapse = ms + previous;
		});

		sudokuUnsubscribe = sudoku.subscribe((sudoku) => {
			if (sudoku.paused !== pauseState) {
				pauseState = sudoku.paused;
				if (pauseState) pause();
				else start();
			}

			if (sudoku.reset) reset();
		});
	}

	function reset() {
		$sudoku.reset = false;
		stop();
		start();
	}

	function terminate() {
		if (unsubscribe !== null) {
			unsubscribe();
			unsubscribe = null;
		}
	}

	function stop() {
		lapse = 0;
		previous = 0;

		terminate();

		if (sudokuUnsubscribe !== null) {
			sudokuUnsubscribe();
			sudokuUnsubscribe = null;
		}
	}

	function pause() {
		previous = lapse;
		terminate();
	}

	const handleClick = () => {
		$sudoku.paused = !$sudoku.paused;
	};

	onDestroy(() => {
		terminate();
	});

	onMount(start);
</script>

<section class="flex flex-row items-center gap-2">
	<p>{formatTime(lapse)}</p>

	<button on:click={handleClick} disabled={$sudoku.finished}>
		<div class="h-4 w-4 bg-gray-400 rounded-full">
			{#if $sudoku.paused}
				<PlayIcon class="fill-white" />
			{:else}
				<PauseIcon class="fill-white" />
			{/if}
		</div>
	</button>
</section>
