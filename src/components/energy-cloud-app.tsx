"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CloudLightning, Wallet, Zap, Coins } from 'lucide-react';

export default function EnergyCloudApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(0);
  const maxEnergy = 1000;

  useEffect(() => {
    if (isLoggedIn) {
      setPoints(1250);
      setEnergy(450);
    }
  }, [isLoggedIn]);

  const handleLineLogin = () => {
    setIsLoggedIn(true);
  };

  const handleWalletConnect = () => {
    const dummyAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setWalletAddress(dummyAddress);
    setIsWalletConnected(true);
  };

  const truncatedAddress = walletAddress
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
    : '';

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] p-4 text-foreground">
      <div className="w-full space-y-8">
        <header className="flex justify-end items-center h-10 w-full">
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
             <CloudLightning className="relative text-primary" size={96} strokeWidth={1.5} />
          </div>

          <h1 className="text-4xl font-bold font-headline text-primary">Energy Cloud</h1>

          {!isLoggedIn ? (
            <div className="w-full pt-4">
               <p className="text-muted-foreground mb-4">Login to manage your energy.</p>
               <Button onClick={handleLineLogin} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                Login with LINE
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-6">
              {!isWalletConnected && (
                <Button onClick={handleWalletConnect} variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary font-bold">
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
  );
}
