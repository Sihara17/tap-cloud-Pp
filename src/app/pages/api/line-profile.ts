// pages/api/line-profile.ts
import { LineDappSDK } from "@linenext/dapp-portal-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({ error: "Missing token" });
    }

    const sdk = new LineDappSDK({
      clientId: process.env.NEXT_PUBLIC_LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
      redirectUri: process.env.NEXT_PUBLIC_APP_URL!,
      dappId: process.env.LINE_DAPP_ID!,
      dappName: process.env.LINE_DAPP_NAME!,
    });

    const profile = await sdk.getProfile(token);
    return res.status(200).json(profile);
  } catch (err: any) {
    console.error("LINE SDK Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
