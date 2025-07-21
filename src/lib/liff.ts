// lib/liff.ts
import { LineDappSDK } from "@linenext/dapp-portal-sdk";

export async function initLiff() {
  const clientId = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;
  const clientSecret = process.env.LINE_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL;
  const dappId = process.env.LINE_DAPP_ID;
  const dappName = process.env.LINE_DAPP_NAME;

  if (!clientId || !clientSecret || !redirectUri || !dappId || !dappName) {
    throw new Error("Missing LINE environment variables");
  }

  const sdk = new LineDappSDK({
    clientId,
    clientSecret,
    redirectUri,
    dappId,
    dappName,
  });

  const profile = await sdk.getProfile();

  return {
    userId: profile.userId,
    name: profile.displayName,
    avatar: profile.pictureUrl,
    walletAddress: profile.walletAddress,
  };
}
