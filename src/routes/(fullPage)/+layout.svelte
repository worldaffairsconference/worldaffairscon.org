<script lang="ts">
	import logo from "$lib/assets/images/logos/wac_medium.webp";
	import StarField from "$lib/components/StarField.svelte";
</script>

<header
	class="flex items-center justify-between px-6 lg:px-16 h-[5.5rem] sm:h-28 md:h-[8.5rem] w-full absolute top-0 left-0 bg-transparent"
	id="header"
>
	<a href="/" class="hover:brightness-110 transition-all">
		<img src={logo} alt="logo" class="h-9 sm:h-14" />
	</a>
</header>

<StarField speed={2.5}>
	<slot />
</StarField>
