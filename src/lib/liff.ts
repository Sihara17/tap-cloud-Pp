lib/liff.ts
import LineDappSDK from "@linenext/dapp-portal-sdk";
let sdk: LineDappSDK | null = null;

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

export function getLoginUrl() {
  const clientId = getEnv("NEXT_PUBLIC_LINE_CLIENT_ID");
  const redirectUri = getEnv("NEXT_PUBLIC_APP_URL");
  const state = Math.random().toString(36).substring(2, 15);
  const scope = "openid profile";
  const responseType = "code";

  return `https://access.line.me/oauth2/v2.1/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${scope}`;
}

export async function initLiff() {
  const clientId = getEnv("NEXT_PUBLIC_LINE_CLIENT_ID");
  const clientSecret = getEnv("LINE_CLIENT_SECRET");
  const redirectUri = getEnv("NEXT_PUBLIC_APP_URL");
  const dappId = getEnv("LINE_DAPP_ID");
  const dappName = getEnv("LINE_DAPP_NAME");

  if (!sdk) {
    sdk = new LineDappSDK({
      clientId,
      clientSecret,
      redirectUri,
      dappId,
      dappName,
    });
  }

  const profile = await sdk.getProfile();

  return {
    userId: profile.userId,
    name: profile.displayName,
    avatar: profile.pictureUrl,
    walletAddress: profile.walletAddress,
  };
}
