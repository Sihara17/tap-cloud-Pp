// app/login/page.tsx
"use client";
import { useEffect } from "react";
import { line } from "@/lib/liff";

export default function Login() {
  useEffect(() => {
    line.login(); // Redirect to LINE login
  }, []);

  return <p>Redirecting to LINE...</p>;
}
