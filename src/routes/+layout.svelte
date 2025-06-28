<script>
	import '../app.css';

	let { children } = $props();
</script>
<div class="min-h-screen w-screen  text-white flex">
	<div class="w-52 px-2 flex flex-col bg-gray-800 justify-center items-center">
			<a class="m-4 btn  btn-block btn-circle" href="/">
				Home
			</a>
			<a class="m-4 btn  btn-block btn-circle" href="/design">
				Design
			</a>

			<a class="m-4 btn  btn-block btn-circle" href="/form">
				Form
			</a>
			<div class="m-4 btn btn-block btn-circle">
				Logout
			</div>
	</div>
	<div class="w-full">
		{@render children()}
	</div>
</div>

