<script lang="ts">
	import HintButton from '@sudoku/menu/buttons/hint-button.svelte';
	import ResetButton from '@sudoku/menu/buttons/reset-button.svelte';
	import AutocheckToggle from '../autocheck-toggle.svelte';
</script>

<div class="flex w-[400px] p-4 gap-2 flex-col">
	<div class="flex-grow">
		<AutocheckToggle />
	</div>
	<div class="flex p-4 gap-4 flex-grow items-center justify-center">
		<ResetButton />
		<HintButton />
	</div>
</div>
