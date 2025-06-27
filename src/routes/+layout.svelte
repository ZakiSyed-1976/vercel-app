<script>
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="h-screen w-screen bg-sky-400 text-white">
	{@render children()}
</div>	
