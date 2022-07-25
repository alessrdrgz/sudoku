<script lang="ts">
	export let text: string;
	export let disabled = $$restProps.disabled ?? false;
</script>

<button
	class="flex flex-col items-center justify-center w-16 h-fit [&>p]:hover:text-blue-600 [&>p]:disabled:hover:text-gray-400 [&>div>svg]:hover:fill-blue-600 transition-colors ease-in-out [&>div>svg]:disabled:fill-gray-400"
	on:click
	{disabled}
>
	<div class="relative w-12 h-12 bg-gray-200 rounded-full">
		<slot />
	</div>
	<p class={`${disabled ? 'text-gray-400' : 'text-blue-400'} text-sm`}>{text}</p>
</button>
