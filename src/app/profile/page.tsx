"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserProfile {
  userId: string;
  name: string;
  avatar: string;
  walletAddress: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("line-profile");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      router.replace("/"); // redirect ke home jika belum login
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("line-profile");
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">👤 Profil Pengguna</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <Image
          src={user.avatar}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500 text-sm mb-4">{user.userId}</p>

        <div className="bg-gray-100 p-3 rounded-lg text-left mb-4">
          <p className="text-sm text-gray-600">Wallet Address:</p>
          <p className="text-sm font-mono break-all">{user.walletAddress}</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
