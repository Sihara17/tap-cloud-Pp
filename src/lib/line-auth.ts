// lib/line-auth.ts
import liff from "@line/liff";

export async function getLineProfile() {
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
