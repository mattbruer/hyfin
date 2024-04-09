<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<div class="text-center mt-5">
	{#if $page.route.id !== '/read'}
		<a href="/read"><button id="read">READ ME</button></a>
	{:else}
		<a href="/"><button>BACK TO <img src="hyfin.png" alt="logo" /> INVOICES</button></a>
		<a target="_blank" href="https://github.com/mattbruer/hyfin"
			><button>VIEW THE<img id="gh" src="github.webp" alt="logo" /> REPO</button></a
		>
		<a target="_blank" href="https://matt-bruer-resume.onrender.com/"
			><button
				>MORE ABOUT<img style="border-radius:50%" id="gh" src="me.jpeg" alt="logo" />ME</button
			></a
		>
	{/if}
</div>

<slot />

<style>
	a {
		margin: 10px;
	}
	img {
		margin: auto;
		filter: drop-shadow(1px 1px 1px black);
	}
	#gh {
		width: 66px;
	}
	button {
		width: 250px;
		height: 135px;
		background-color: rgb(30, 150, 210);
	}
	#read {
		height: auto;
		width: 150px;
	}
</style>
