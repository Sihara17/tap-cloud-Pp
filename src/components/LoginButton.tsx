"use client";

import sdk from "@linenext/dapp-portal-sdk";
import { useEffect, useState } from "react";

export default function LoginButton() {
  const [walletType, setWalletType] = useState("");

  useEffect(() => {
    const walletProvider = sdk.getWalletProvider();
    const type = walletProvider.getWalletType();
    setWalletType(type);
    console.log("Wallet Type:", type);
  }, []);

  const handleLogin = async () => {
    const walletProvider = sdk.getWalletProvider();
    try {
      await walletProvider.connect(); // Mulai proses login wallet
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
