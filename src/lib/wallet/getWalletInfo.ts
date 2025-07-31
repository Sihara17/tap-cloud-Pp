import { sdk } from '@linenext/dapp-portal-sdk'

export function getWalletProviderInfo() {
  const walletProvider = sdk.getWalletProvider()
  const walletType = walletProvider.getWalletType()

  return {
    walletProvider,
    walletType, // e.g. 'Liff', 'Extension', 'OKX', etc
  }
}
