"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import sdk from "@linenext/dapp-portal-sdk";

export default function HomePage() {
  const [points, setPoints] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const walletProvider = sdk.getWalletProvider();
      await walletProvider.connect();
      const addr = await walletProvider.getAddress();
      setAddress(addr);

      const { data } = await supabase
        .from("users")
        .select("points, energy")
        .eq("wallet_address", addr)
        .single();

      if (data) {
        setPoints(data.points);
        setEnergy(data.energy);
      }
    };

    fetchData();
  }, []);

  const handleTap = async () => {
    if (points !== null && energy !== null && energy > 0) {
      const newPoints = points + 1;
      const newEnergy = energy - 1;

      setPoints(newPoints);
      setEnergy(newEnergy);

      const { error } = await supabase
        .from("users")
        .update({ points: newPoints, energy: newEnergy })
        .eq("wallet_address", address);

      if (error) {
        console.error("Gagal update:", error);
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">🏠 Home Page</h1>
      <p className="text-lg mb-2">Wallet: <span className="font-mono">{address}</span></p>

      {points !== null && energy !== null ? (
        <>
          <p className="text-2xl">🔥 Energy: {energy}</p>
          <p className="text-2xl mb-4">💰 Points: {points}</p>

          <button
            onClick={handleTap}
            disabled={energy <= 0}
            className={`px-6 py-4 text-white text-xl rounded-full ${
              energy > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
            }`}
          >
            ☁️ TapCloud
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
