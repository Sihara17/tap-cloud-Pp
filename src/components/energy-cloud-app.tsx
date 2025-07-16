"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CloudLightning, Wallet, Zap, Coins, Home, Map, Rocket } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { initLiff } from "@/lib/liff";

export default function EnergyCloudApp({ currentPage = "home" }: { currentPage?: "home" | "quest" | "boost" }) {
  const router = useRouter();
  const {
    isLoggedIn,
    setIsLoggedIn,
    isWalletConnected,
    setIsWalletConnected,
    walletAddress,
    setWalletAddress,
    points,
    setPoints,
    energy,
    setEnergy,
    maxEnergy,
  } = useAppContext();

  // 🚀 Auto login LINE on load
  useEffect(() => {
    const loginWithLine = async () => {
      try {
        const profile = await initLiff();
        if (profile) {
          console.log("LINE User:", profile);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("LIFF Login Error:", err);
      }
    };

    if (!isLoggedIn) {
      loginWithLine();
    }
  }, [isLoggedIn, setIsLoggedIn]);

  // 🧪 Give default points and energy
  useEffect(() => {
    if (isLoggedIn && points === 0 && energy === 0) {
      setPoints(0);
      setEnergy(1000);
    }
  }, [isLoggedIn, points, energy, setPoints, setEnergy]);

  const handleWalletConnect = () => {
    const dummyAddress = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    setWalletAddress(dummyAddress);
    setIsWalletConnected(true);
  };

  const handleEnergyTap = () => {
    if (energy > 0) {
      setEnergy((prev) => prev - 1);
      setPoints((prev) => prev + 1);
    }
  };

  const truncatedAddress = walletAddress
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
    : "";

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col h-dvh text-foreground">
      <div className="flex-grow overflow-y-auto pb-24">
        <div className="p-4">
          <header className="flex justify-end items-center h-10 w-full mb-6">
            {isWalletConnected && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-card/50 border border-border">
                <Wallet className="h-5 w-5 text-accent" />
                <span className="text-sm font-mono">{truncatedAddress}</span>
              </div>
            )}
          </header>

          <main className="flex flex-col items-center text-center space-y-6">
            <div className="relative flex justify-center items-center mb-4">
              <div className="absolute w-32 h-32 rounded-full animate-glow"></div>
              <button
  onClick={handleEnergyTap}
  disabled={energy <= 0 || !isLoggedIn}
  className="relative transition-transform duration-100 ease-in-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
  aria-label="Tap to get points"
>
  <img
    src="/logo1.png"
    alt="Tap Logo"
    className="w-24 h-24 object-contain"
  />
</button>

            </div>

            <h1 className="text-4xl font-bold font-headline text-primary">TapCloud</h1>

            {!isLoggedIn ? (
              <div className="w-full pt-4">
                <p className="text-muted-foreground mb-4">Logging in with LINE...</p>
              </div>
            ) : (
              <div className="w-full space-y-6">
                {!isWalletConnected && (
                  <Button
                    onClick={handleWalletConnect}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary font-bold"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                )}

                <Card className="bg-card/50 border-border text-left">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Points</CardTitle>
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{points.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Your current balance</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border text-left">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Energy</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{energy} / {maxEnergy}</div>
                    <p className="text-xs text-muted-foreground mb-2">Your remaining energy</p>
                    <Progress value={(energy / maxEnergy) * 100} className="h-2 [&>div]:bg-primary" />
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 w-full max-w-sm mx-auto bg-background/80 backdrop-blur-sm border-t border-border">
        <nav className="flex justify-around items-center p-2">
          <Button
            variant="ghost"
            className={`flex flex-col h-auto items-center gap-1 ${currentPage === "home" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            onClick={() => router.push("/")}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col h-auto items-center gap-1 ${currentPage === "quest" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            onClick={() => router.push("/quest")}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs">Quest</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col h-auto items-center gap-1 ${currentPage === "boost" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            onClick={() => router.push("/boost")}
          >
            <Rocket className="h-6 w-6" />
            <span className="text-xs">Boost</span>
          </Button>
        </nav>
      </footer>
    </div>
  );
}
