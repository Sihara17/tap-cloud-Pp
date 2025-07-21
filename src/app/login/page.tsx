// app/login/page.tsx
"use client";
import { useEffect } from "react";
import { initLiff, getLoginUrl } from "@/lib/liff";


export default function Login() {
  useEffect(() => {
    line.login(); // Redirect to LINE login
  }, []);

  return <p>Redirecting to LINE...</p>;
}
function handleLogin() {
  const url = getLoginUrl();
  window.location.href = url;
}
