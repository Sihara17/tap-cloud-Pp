"use client";

import { useEffect, useState } from "react";
import { initLiff } from "@/lib/liff";

export default function EnergyCloudPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        await initLiff();
      } catch (err) {
        console.warn("initLiff failed", err);
      } finally {
        setReady(true);
      }
    }

    fetchUser();
  }, []);

  if (!ready) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Energy Cloud</h1>
      <p className="text-gray-600 text-center max-w-md">
        Halaman ini sedang dalam pengembangan. Nantinya kamu bisa melihat informasi energi harian, boost, dan fitur lainnya.
      </p>

      <div className="mt-8 w-full max-w-sm rounded-xl bg-white shadow-md p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Status Energi</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Energi Saat Ini:</span>
          <span className="font-bold text-green-600">200 / 200 ⚡</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Level Boost:</span>
          <span className="font-bold text-purple-600">Lv. 1 🚀</span>
        </div>
      </div>

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow transition-all"
        onClick={() => alert("Fitur ini akan segera tersedia!")}
      >
        Uji Boost Sekarang
      </button>
    </div>
  );
}
