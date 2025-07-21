"use client";

import { useEffect, useState } from "react";
import { initLiff } from "@/lib/liff";
import LoginButton from "@/components/LoginButton";

export default function EnergyCloudPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("line-profile");

    if (stored) {
      setUser(JSON.parse(stored));
      setLoading(false);
    } else {
      async function fetchUser() {
        try {
          const profile = await initLiff();
          localStorage.setItem("line-profile", JSON.stringify(profile));
          setUser(profile);
        } catch (err) {
          console.warn("User not logged in.");
        } finally {
          setLoading(false);
        }
      }

      fetchUser();
    }
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Energy Cloud</h1>
      <img
        src={user.avatar}
        alt="Avatar"
        className="w-24 h-24 rounded-full shadow-lg mb-2"
      />
      <p className="text-xl font-medium">{user.name}</p>
      <p className="text-sm text-gray-600">Wallet: {user.walletAddress}</p>
    </div>
  );
}
