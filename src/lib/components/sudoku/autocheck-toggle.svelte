<script lang="ts">
	import Toggle from '@components/toggle.svelte';
	import { sudoku } from '@store/sudoku';
	import { checkSudoku, resetCheckSudoku } from '@utils/sudoku';

	const handleChange = (e: Event) => {
		const { target } = e;
		if (target !== null) {
			const { checked } = target as HTMLInputElement;
			$sudoku.autoCheck = checked;
			if (checked) {
				checkSudoku({
					puzzle: $sudoku.puzzle,
					solution: $sudoku.solution
				});
			} else resetCheckSudoku();
		}
	};
</script>

<Toggle
	text="Comprobar errores automáticamente"
	on:change={handleChange}
	disabled={$sudoku.paused || $sudoku.finished}
/>
