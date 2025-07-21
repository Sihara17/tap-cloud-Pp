"use client";

import { useEffect, useState } from "react";
import { initLiff } from "@/lib/liff";

export default function EnergyCloudPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const profile = await initLiff();
      setUser(profile);
    }

    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      {/* show wallet etc */}
    </div>
  );
}
