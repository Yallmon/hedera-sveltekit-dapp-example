export const chains = [
	{
		chainId: '0x127',
		chainName: 'Hedera Mainnet',
		nativeCurrency: {
			name: 'HBAR',
			symbol: 'hbar',
			decimals: 18
		},
		rpcUrls: ['https://mainnet.hashio.io/api'],
		blockExplorerUrls: ['https://hashscan.io/mainnet']
	},
	{
		chainId: '0x128',
		chainName: 'Hedera Testnet',
		nativeCurrency: {
			name: 'HBAR',
			symbol: 'hbar',
			decimals: 18
		},
		rpcUrls: ['https://testnet.hashio.io/api'],
		blockExplorerUrls: ['https://hashscan.io/testnet']
	},
	{
		chainId: '0x129',
		chainName: 'Hedera Previewnet',
		nativeCurrency: {
			name: 'HBAR',
			symbol: 'hbar',
			decimals: 18
		},
		rpcUrls: ['https://previewnet.hashio.io/api'],
		blockExplorerUrls: ['https://hashscan.io/previewnet']
	},
	{
		chainId: '0x12a',
		chainName: 'Hedera Localnet',
		nativeCurrency: {
			name: 'HBAR',
			symbol: 'hbar',
			decimals: 18
		},
		rpcUrls: ['http://192.168.0.5:7546'],
		blockExplorerUrls: ['http://192.168.0.5:8080/devnet']
	}
];
