
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isWalletConnected: boolean;
  setIsWalletConnected: React.Dispatch<React.SetStateAction<boolean>>;
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  energy: number;
  setEnergy: React.Dispatch<React.SetStateAction<number>>;
  maxEnergy: number;
  loginStreak: number;
  setLoginStreak: React.Dispatch<React.SetStateAction<number>>;
  lastClaimed: string | null;
  setLastClaimed: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(0);
  const maxEnergy = 1000;

  const [loginStreak, setLoginStreak] = useState(0);
  const [lastClaimed, setLastClaimed] = useState<string | null>(null);

  useEffect(() => {
    // Persist simple state to localStorage to survive reloads
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (storedIsLoggedIn) {
        setIsLoggedIn(true);
    }
    const storedPoints = localStorage.getItem('points');
    const storedEnergy = localStorage.getItem('energy');
    const storedWalletAddress = localStorage.getItem('walletAddress');
    const storedIsWalletConnected = localStorage.getItem('isWalletConnected') === 'true';
    
    if (storedIsLoggedIn) {
        setPoints(storedPoints ? parseInt(storedPoints, 10) : 1250);
        setEnergy(storedEnergy ? parseInt(storedEnergy, 10) : 450);
        if (storedIsWalletConnected && storedWalletAddress) {
            setIsWalletConnected(true);
            setWalletAddress(storedWalletAddress);
        }
    }

    const storedStreak = localStorage.getItem('loginStreak');
    const storedLastClaimed = localStorage.getItem('lastClaimed');

    if (storedStreak) {
      setLoginStreak(parseInt(storedStreak, 10));
    }
    if (storedLastClaimed) {
      setLastClaimed(storedLastClaimed);
    }
  }, []);
  
  useEffect(() => {
      if(isLoggedIn) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('points', points.toString());
        localStorage.setItem('energy', energy.toString());
      } else {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('points');
          localStorage.removeItem('energy');
          localStorage.removeItem('walletAddress');
          localStorage.removeItem('isWalletConnected');
      }
  }, [isLoggedIn, points, energy]);

  useEffect(() => {
      if(isWalletConnected && walletAddress) {
          localStorage.setItem('isWalletConnected', 'true');
          localStorage.setItem('walletAddress', walletAddress);
      } else {
          localStorage.removeItem('isWalletConnected');
          localStorage.removeItem('walletAddress');
      }
  }, [isWalletConnected, walletAddress]);

  useEffect(() => {
      localStorage.setItem('loginStreak', loginStreak.toString());
      if(lastClaimed) {
        localStorage.setItem('lastClaimed', lastClaimed);
      }
  }, [loginStreak, lastClaimed]);

  const value = {
    isLoggedIn, setIsLoggedIn,
    isWalletConnected, setIsWalletConnected,
    walletAddress, setWalletAddress,
    points, setPoints,
    energy, setEnergy,
    maxEnergy,
    loginStreak, setLoginStreak,
    lastClaimed, setLastClaimed,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
