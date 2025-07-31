"use client";

import sdk from "@linenext/dapp-portal-sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginButton() {
  const [walletType, setWalletType] = useState("");
  const router = useRouter();

  useEffect(() => {
    const walletProvider = sdk.getWalletProvider();
    const type = walletProvider.getWalletType();
    setWalletType(type);
    console.log("Wallet Type:", type);
  }, []);

  const handleLogin = async () => {
    const walletProvider = sdk.getWalletProvider();

    try {
      await walletProvider.connect();
      const address = await walletProvider.getAddress();

      // Simpan ke Supabase (jika belum ada)
      await supabase.from("users").upsert(
        {
          wallet_address: address,
          points: 0,
          energy: 200,
        },
        { onConflict: "wallet_address" } // supaya tidak dobel
      );

      router.push("/home");
    } catch (error) {
      console.error("Login gagal:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
    >
      Login with LINE Wallet ({walletType})
    </button>
  );
}
