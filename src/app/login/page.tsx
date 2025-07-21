// app/login/page.tsx
"use client";

import { useEffect } from "react";
import { initLiff, getLoginUrl } from "@/lib/liff";

export default function Login() {
  useEffect(() => {
    const doLogin = async () => {
      try {
        await initLiff(); // Inisialisasi LIFF
        const url = getLoginUrl();
        window.location.href = url; // Redirect ke halaman login LINE
      } catch (err) {
        console.error("Failed to login with LINE:", err);
      }
    };

    doLogin();
  }, []);

  return <p>Redirecting to LINE...</p>;
}
