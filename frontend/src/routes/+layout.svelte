<script lang="ts">
	import '../app.css';
	import { createProviderStore } from '$lib/stores/provider';
	createProviderStore();
</script>

<slot />

<style lang="postcss">
	:global(html) {
		background-color: #f5f5f5;
	}
</style>
