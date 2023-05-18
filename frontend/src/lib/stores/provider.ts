/**
 * Svelte Store for the Blockchain Provider
 * Created and Provided by svelte context API to prevent store possibly
 * shared between multiple sessions in sveltekit SSR environment.
 * See https://github.com/sveltejs/kit/discussions/4339
 */

import { setContext, getContext } from 'svelte';
import { type Writable, writable } from 'svelte/store';
import { ethers } from 'ethers';
import { browser } from '$app/environment';

interface ProviderState {
	provider: ethers.providers.Web3Provider | null;
}

const initialProviderState = {
	provider: null
};

export const createProviderStore = () => {
	const providerStore = writable<ProviderState>(initialProviderState);

	if (browser && window && window.ethereum) {
		providerStore.set({
			provider: new ethers.providers.Web3Provider(window.ethereum)
		});
	}

	setContext('providerStore', providerStore);
};

export const getProviderStore = () => {
	return getContext<Writable<ProviderState>>('providerStore');
};
