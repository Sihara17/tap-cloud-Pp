// components/follow-oa.tsx
"use client";

import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";

export function FollowOfficialAccount() {
  return (
    <a
      href="https://line.me/ti/p/TVuyUbskYM"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button variant="outline" className="w-full gap-2">
        <MessageCircleIcon className="w-4 h-4" />
        Follow TapCloud Official Account
      </Button>
    </a>
  );
}
