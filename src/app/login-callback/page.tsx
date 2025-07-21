// app/login-callback/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { initLiff } from "@/lib/liff";

export default function LoginCallback() {
  const router = useRouter();

  useEffect(() => {
    const login = async () => {
      try {
        const user = await initLiff();
        localStorage.setItem("line-profile", JSON.stringify(user));
        router.replace("/home");
      } catch (err) {
        console.error(err);
        router.replace("/");
      }
    };
    login();
  }, [router]);

  return <p>Finalizing login...</p>;
}
