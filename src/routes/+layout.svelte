<script>
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="min-h-max bg-sky-400 text-white">
	{@render children()}
</div>	
