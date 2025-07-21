"use client";

import { initLiff, getLoginUrl } from "@/lib/liff";

export default function Login() {
  const handleLogin = async () => {
    try {
      await initLiff();
      const url = getLoginUrl();
      window.location.href = url;
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
        Login with LINE
      </button>
    </div>
  );
}
