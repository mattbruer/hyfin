<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

{#if $page.route.id !== '/read'}
	<a href="/read"><button>READ ME</button></a>
{:else}
	<a href="/"><button>BACK TO APP</button></a>
{/if}

<slot />
