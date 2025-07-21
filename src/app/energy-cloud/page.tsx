"use client";

import { useEffect, useState } from "react";
import EnergyCloudApp from "@/components/energy-cloud-app";
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

  return <EnergyCloudApp currentPage="home" />;
}
