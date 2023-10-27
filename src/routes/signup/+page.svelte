<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import type { ActionData } from './$types';
	import { fade } from 'svelte/transition';

	export let form: ActionData;
</script>

<main class="flex flex-col items-center justify-center w-full h-full overflow-hidden">
	<div class="flex flex-row items-center">
		<img class="w-28" src="/android-chrome-192x192.png" alt="Logo" />
		<h1 class="h1">{PUBLIC_APP_NAME}</h1>
	</div>
	<form class="flex flex-col mt-8" method="POST">
		<label class="flex flex-row items-center label">
			<span class="mr-2 text-xl">Email</span>
			<input
				class="input"
				title="Email"
				name="email"
				type="email"
				placeholder="john@example.com"
				autocomplete="email"
			/>
		</label>
		<input
			type="submit"
			class="self-center px-8 mt-4 btn variant-filled-secondary"
			value="Signup"
		/>
		{#if form?.success}
			<div class="mt-4 alert variant-filled-primary" transition:fade|local={{ duration: 200 }}>
				<h5 class="h5">Check your email to proceed!</h5>
			</div>
		{:else if form?.message}
			<div class="mt-4 alert variant-filled-error" transition:fade|local={{ duration: 200 }}>
				<h5 class="h5">{form.message}</h5>
			</div>
		{/if}
	</form>
</main>
