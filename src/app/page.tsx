"use client";

import { useEffect, useState } from "react";
import { initLiff } from "@/lib/liff";
import LoginButton from "@/components/LoginButton";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("line-profile");
    if (stored) {
      setUser(JSON.parse(stored));
      return;
    }

    async function fetchLineUser() {
      try {
        const profile = await initLiff();
        localStorage.setItem("line-profile", JSON.stringify(profile));
        setUser(profile);
      } catch (error) {
        console.error("Not logged in yet.");
      }
    }

    fetchLineUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}</h1>
      <img
        src={user.avatar}
        alt="Avatar"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <p className="mt-2 text-sm text-gray-500">Wallet: {user.walletAddress}</p>
    </div>
  );
}
