import { LineDappSDK } from '@linenext/dapp-portal-sdk';

export const sdk = new LineDappSDK({
  dappId: process.env.NEXT_PUBLIC_LINE_DAPP_ID || '', // pastikan DAPP_ID ada di .env
  chainId: 137, // Ganti sesuai kebutuhan (137 = Polygon Mainnet, 80001 = Mumbai)
});
