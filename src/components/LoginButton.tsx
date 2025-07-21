"use client";

import { getLoginUrl } from "@/lib/liff";

export default function LoginButton() {
  const handleLogin = () => {
    const loginUrl = getLoginUrl();
    window.location.href = loginUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
    >
      Login with LINE
    </button>
  );
}
