// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	interface Window {
		ethereum: EthereumProvider;
	}
}

declare type ExternalProvider = import('ethers').providers.ExternalProvider;
interface EthereumProvider extends ExternalProvider {
	_state: {
		accounts: string[];
	};
	on(
		event: 'close' | 'accountsChanged' | 'chainChanged' | 'networkChanged' | 'connect',
		callback: (payload: any) => void
	): void;
	removeAllListeners(): void;
	// once(
	// 	event: 'close' | 'accountsChanged' | 'chainChanged' | 'networkChanged',
	// 	callback: (payload: any) => void
	// ): void;
	// sendAsync: AbstractProvider['sendAsync'];
}

export { EthereumProvider };
