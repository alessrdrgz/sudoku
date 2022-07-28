<script lang="ts">
	import { sudoku } from '@store/sudoku';
	import Timer from '@sudoku/header/timer.svelte';
</script>

<h1 class={`text-center text-red-500 text-lg font-semibold ${$sudoku.errors !== 3 && 'invisible'}`}>
	Ha superado el número máximo de errores.
</h1>

<section class="flex w-[400px] items-center text-gray-300 p-2">
	<div class="text-left">{$sudoku.difficulty}</div>
	<div class={`flex-grow justify-center text-center ${$sudoku.errors === 3 && 'text-red-500'}`}>
		Errores {$sudoku.errors}/3
	</div>
	<div class="justify-end"><Timer /></div>
</section>
