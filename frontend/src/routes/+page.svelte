<script lang="ts">
	import { ethers } from 'ethers';
	import { chains } from '$lib/chains';
	import { getProviderStore } from '$lib/stores/provider';
	import { onDestroy, onMount } from 'svelte';
	import SimpleCounterContractABI from '$lib/contracts/SimpleCounter.json';
	import { browser } from '$app/environment';

	const SimpleCounterContractAddress = '0xffc7d3ff264c838ad75167e64d043794bf1bd57c';
	const providerStore = getProviderStore();
	let contractDeployed = false;
	let isLoading = true;
	let address: string;
	let balance: string;
	let selectedChain: any = chains[0];
	let count = 0;

	async function switchChain(
		provider: ethers.providers.Web3Provider,
		chainId: string
	): Promise<{ success: boolean }> {
		return new Promise((resolve, reject) => {
			provider
				.send('wallet_switchEthereumChain', [{ chainId }])
				.then(() => {
					resolve({ success: true });
				})
				.catch((err: any) => {
					if (err.code === 4902) {
						resolve({ success: false });
					} else {
						reject(err);
					}
				});
		});
	}

	async function connectMetamaskWallet(chain: any) {
		// Check if Metamask is installed
		if (!window.ethereum || !window.ethereum.isMetaMask) {
			alert('Please install Metamask');
			return;
		} else {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
				let { success } = await switchChain(provider, chain.chainId);
				if (!success) {
					// If chain to switch is not exist in wallet, add it
					await provider.send('wallet_addEthereumChain', [chain]);
				}
				providerStore.update((store) => {
					store.provider = provider;
					return store;
				});
			} catch (error) {
				console.log(error);
			}
		}
	}

	async function getAccountInfo(provider: ethers.providers.Web3Provider) {
		const account = await provider.listAccounts();
		const address = account[0];
		const balanceHex = await provider.send('eth_getBalance', [address, 'latest']);
		const balance = ethers.utils.formatEther(balanceHex);
		return { address, balance };
	}

	async function executeContract(
		provider: ethers.providers.Web3Provider,
		contractAddress: string,
		contractABI: string[],
		method: string,
		params: any
	) {
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractABI, signer);
		const tx = await contract[method](...params);

		if (tx.wait) {
			const receipt = await tx.wait();
			return receipt;
		} else {
			return tx;
		}
	}

	async function getCurrentChainId(provider: ethers.providers.Web3Provider) {
		return await provider.send('eth_chainId', []);
	}

	onMount(async () => {
		if (window.ethereum) {
			window.ethereum.on('chainChanged', (chainId: string) => {
				selectedChain = chains.filter((chain) => chain.chainId === chainId)[0];
			});

			window.ethereum.on('connect', (chainId: string) => {
				console.log('connected!');
				selectedChain = chains.filter((chain) => chain.chainId === chainId)[0];
			});
		}

		if ($providerStore.provider) {
			try {
				const chainID = await getCurrentChainId($providerStore.provider);
				selectedChain = chains.filter((chain) => chain.chainId === chainID)[0] || chains[0];
				const accountInfo = await getAccountInfo($providerStore.provider);
				address = accountInfo.address;
				balance = accountInfo.balance;

				count = await executeContract(
					$providerStore.provider,
					SimpleCounterContractAddress,
					SimpleCounterContractABI,
					'get',
					[]
				);
				contractDeployed = true;
			} catch (error) {
				contractDeployed = false;
			}

			isLoading = false;
		}
	});

	onDestroy(() => {
		// As `onDestroy` runs both on client and server, we need to check if we're on the client first
		if (browser) {
			if (window.ethereum) {
				// Remove All Event Listeners
				window.ethereum.removeAllListeners();
			}
		}
	});
</script>

<div class="min-h-screen w-full flex flex-col items-center justify-center gap-y-4">
	<div class="flex flex-col items-center">
		<h1 class="text-lg font-bold">Simple Counter Contract</h1>
		<h2>Simple Wallet Integration Example for Hedara + Sveltekit</h2>
	</div>
	<div class="">
		<h1>Select Network</h1>
		<select
			bind:value={selectedChain}
			on:change={async () => {
				await connectMetamaskWallet(selectedChain);
				if ($providerStore.provider) {
					try {
						isLoading = true;
						const accountInfo = await getAccountInfo($providerStore.provider);
						address = accountInfo.address;
						balance = accountInfo.balance;

						count = await executeContract(
							$providerStore.provider,
							SimpleCounterContractAddress,
							SimpleCounterContractABI,
							'get',
							[]
						);
						contractDeployed = true;
					} catch (error) {
						contractDeployed = false;
					} finally {
						isLoading = false;
					}
				}
			}}
		>
			{#each chains as chain}
				<option value={chain}>{`${chain.chainName}(${chain.rpcUrls[0]})`}</option>
			{/each}
		</select>
	</div>
	{#if $providerStore.provider}
		{#if isLoading}
			<div class="flex flex-col gap-y-1 items-center">
				<h2>Loading...</h2>
			</div>
		{:else}
			<div class="flex flex-col gap-y-1 items-start">
				<h2>Wallet Address: {address}</h2>
				<h2>Wallet Balance: {balance}</h2>
			</div>
			{#if contractDeployed}
				<div class="flex flex-col gap-y-1 items-center">
					<h2>Contract Address:{SimpleCounterContractAddress}</h2>
					<h2>Current Count: {count}</h2>
					<div class="">
						<button
							class="p-2 bg-blue-200"
							on:click={async () => {
								if ($providerStore.provider) {
									await executeContract(
										$providerStore.provider,
										SimpleCounterContractAddress,
										SimpleCounterContractABI,
										'increment',
										[]
									);
									count = await executeContract(
										$providerStore.provider,
										SimpleCounterContractAddress,
										SimpleCounterContractABI,
										'get',
										[]
									);
								}
							}}>Increment</button
						>
						<button
							class="p-2 bg-blue-200"
							on:click={async () => {
								if ($providerStore.provider) {
									await executeContract(
										$providerStore.provider,
										SimpleCounterContractAddress,
										SimpleCounterContractABI,
										'decrement',
										[]
									);
									count = await executeContract(
										$providerStore.provider,
										SimpleCounterContractAddress,
										SimpleCounterContractABI,
										'get',
										[]
									);
								}
							}}>Decrement</button
						>
					</div>
				</div>
			{:else}
				<h1>
					{`Contract ${SimpleCounterContractAddress} is not deployed on ${selectedChain.chainName}`}
				</h1>
			{/if}
		{/if}
	{:else}
		<div class="flex gap-x-2">
			<button
				class="p-2 bg-red-200"
				on:click={async () => {
					await connectMetamaskWallet(selectedChain);
				}}>Connect With Metamask</button
			>
			<button class="p-2 bg-red-200">Connect With Hashpack</button>
		</div>
	{/if}
</div>
