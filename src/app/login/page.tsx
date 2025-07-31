"use client";

export const dynamic = "force-dynamic";

import LoginButton from "@/components/LoginButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Welcome to TapCloud</h1>
      <p className="text-lg text-green-700 mb-4">Please login with your LINE Wallet to continue</p>
      <LoginButton />
    </main>
  );
}
