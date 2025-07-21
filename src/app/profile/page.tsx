// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FollowOfficialAccount } from "@/components/follow-oa";
import { getLineProfile } from "@/lib/line-auth"; // fungsi ambil profile
import { LogOutIcon } from "lucide-react";

interface UserProfile {
  userId: string;
  name: string;
  avatar: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getLineProfile();
      setProfile(data);
    }
    fetchProfile();
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined" && window.liff?.logout) {
      window.liff.logout();
      window.location.reload();
    }
  };

  if (!profile) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="p-4 max-w-md mx-auto text-center space-y-6">
      <Image
        src={profile.avatar}
        alt="User avatar"
        width={96}
        height={96}
        className="rounded-full mx-auto"
      />
      <h2 className="text-2xl font-semibold">{profile.name}</h2>

      <FollowOfficialAccount />

      <Button
        onClick={handleLogout}
        variant="destructive"
        className="w-full gap-2"
      >
        <LogOutIcon className="w-4 h-4" />
        Logout
      </Button>
    </div>
  );
}
