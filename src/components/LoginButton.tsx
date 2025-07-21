// components/LoginButton.tsx
"use client";

import { getLoginUrl } from "@/lib/liff";

export default function LoginButton() {
  return (
    <button
      onClick={() => {
        window.location.href = getLoginUrl();
      }}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
    >
      Login with LINE
    </button>
  );
}
