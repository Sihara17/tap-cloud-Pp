// lib/liff.ts
import { LineDappSDK } from "@linenext/dapp-portal-sdk";

export async function initLiff() {
  const clientId = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL;

  if (!clientId || !redirectUri) {
    throw new Error("Missing LINE SDK environment variables");
  }

  const sdk = new LineDappSDK({
    clientId,
    redirectUri,
  });

  const profile = await sdk.getProfile();

  return {
    userId: profile.userId,
    name: profile.displayName,
    avatar: profile.pictureUrl,
    walletAddress: profile.walletAddress, // opsional jika tersedia
  };
}
