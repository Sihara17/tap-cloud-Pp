// lib/liff.ts
import liff from "@line/liff";

export async function initLiff() {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
  if (!liffId) throw new Error("LIFF ID is missing");

  await liff.init({ liffId });

  if (!liff.isLoggedIn()) {
    liff.login();
    return null;
  }

  const profile = await liff.getProfile();
  return {
    userId: profile.userId,
    name: profile.displayName,
    avatar: profile.pictureUrl,
  };
}
