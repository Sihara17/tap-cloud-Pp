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
      await walletProvider.connect(); // Pastikan terkoneksi
      const addr = await walletProvider.getAddress();
      setAddress(addr);

      const { data, error } = await supabase
        .from("users")
        .select("points, energy")
        .eq("wallet_address", addr)
        .single();

      if (data) {
        setPoints(data.points);
        setEnergy(data.energy);
      }

      if (error) {
        console.error("Gagal fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">🏠 Home Page</h1>
      <p className="text-lg mb-2">Wallet Address: <span className="font-mono">{address}</span></p>

      {points !== null && energy !== null ? (
        <>
          <p className="text-2xl">🔥 Energy: {energy}</p>
          <p className="text-2xl">💰 Points: {points}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </main>
  );
}
