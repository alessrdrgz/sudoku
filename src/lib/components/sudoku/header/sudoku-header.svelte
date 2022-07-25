<script lang="ts">
	import { sudoku } from '@store/sudoku';
	import Timer from '@sudoku/header/timer.svelte';
</script>

<section class="flex w-[400px] items-center text-gray-300 p-2">
	<div class="text-left">{$sudoku.difficulty}</div>
	<!-- TODO Error counting -->
	<div class="flex-grow justify-center text-center">Errores 0/3</div>
	<div class="justify-end"><Timer /></div>
</section>
