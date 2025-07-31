"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { sdk } from "@/lib/line";

export default function HomePage() {
  const [address, setAddress] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const walletProvider = sdk.getWalletProvider();
      await walletProvider.connect();
      const addr = await walletProvider.getAddress();
      setAddress(addr);

      const { data, error } = await supabase
        .from("users")
        .select("points, energy, last_energy_reset")
        .eq("wallet_address", addr)
        .single();

      if (error || !data) {
        console.error("User tidak ditemukan:", error);
        return;
      }

      const now = new Date();
      const lastReset = data.last_energy_reset ? new Date(data.last_energy_reset) : null;
      const isNewDay = !lastReset || now.toDateString() !== lastReset.toDateString();

      let updatedEnergy = data.energy;
      if (isNewDay) {
        updatedEnergy = 200;
        const { error: updateError } = await supabase
          .from("users")
          .update({
            energy: updatedEnergy,
            last_energy_reset: now.toISOString(),
          })
          .eq("wallet_address", addr);

        if (updateError) {
          console.error("Gagal update energy harian:", updateError);
        }
      }

      setPoints(data.points);
      setEnergy(updatedEnergy);
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Address: {address}</p>
      <p>Points: {points}</p>
      <p>Energy: {energy}</p>
    </div>
  );
}
