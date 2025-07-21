// lib/liff.ts
import { LineDappSDK } from "@linenext/dapp-portal-sdk";

const clientId = process.env.NEXT_PUBLIC_LINE_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET!;
const redirectUri = process.env.NEXT_PUBLIC_APP_URL + "/login-callback";

if (!clientId || !clientSecret || !redirectUri) {
  throw new Error("Missing LINE env variables");
}

const line = new LineDapp({
  dappId: clientId,
  clientSecret,
  redirectUri,
});

export async function initLiff() {
  const token = await line.getAccessTokenFromCallback();
  const profile = await line.getUserProfile(token.accessToken);

  return {
    userId: profile.userId,
    name: profile.displayName,
    avatar: profile.pictureUrl,
    walletAddress: profile.walletAddress,
    accessToken: token.accessToken,
  };
}

export { line };
