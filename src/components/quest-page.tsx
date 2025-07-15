
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Map, Rocket, CheckCircle2, Gift } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from '@/context/app-context';

const dailyRewards = [
  { day: 1, points: 5 },
  { day: 2, points: 10 },
  { day: 3, points: 15 },
  { day: 4, points: 20 },
  { day: 5, points: 25 },
  { day: 6, points: 30 },
  { day: 7, points: 35 },
];

export default function QuestPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { 
    isLoggedIn,
    setPoints,
    loginStreak, setLoginStreak, 
    lastClaimed, setLastClaimed 
  } = useAppContext();

  const isToday = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  };

  const isYesterday = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return date.getFullYear() === yesterday.getFullYear() &&
           date.getMonth() === yesterday.getMonth() &&
           date.getDate() === yesterday.getDate();
  };
  
  const canClaimToday = !lastClaimed || !isToday(lastClaimed);

  // Logic to reset streak if a day is missed
  useEffect(() => {
    if (lastClaimed && !isToday(lastClaimed) && !isYesterday(lastClaimed)) {
      setLoginStreak(0);
    }
  }, [lastClaimed, setLoginStreak]);

  const currentDayIndex = loginStreak % 7;

  const handleClaim = (rewardDay: number, rewardPoints: number) => {
    if (!isLoggedIn) {
         toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "You must be logged in to claim rewards.",
        });
        return;
    }
    
    if (!canClaimToday || rewardDay - 1 !== currentDayIndex) {
        toast({
            variant: "destructive",
            title: "Cannot Claim Reward",
            description: rewardDay - 1 < currentDayIndex ? "You have already claimed your reward for today." : "You must claim rewards in order.",
        });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newStreak = loginStreak + 1;
    
    setLoginStreak(newStreak);
    setLastClaimed(today);
    setPoints(prev => prev + rewardPoints);
    
    toast({
        title: "Reward Claimed!",
        description: `You've earned ${rewardPoints} points!`,
    });
  };

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col h-dvh text-foreground">
      <div className="flex-grow overflow-y-auto pb-24 p-4">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold font-headline text-primary">Daily Quests</h1>
          <p className="text-muted-foreground">Log in daily to claim rewards!</p>
        </header>

        <main className="space-y-4">
            <Card className="bg-card/50 border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-accent"/>
                        <span>Daily Login Rewards</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-3 text-center">
                    {dailyRewards.map((reward, index) => {
                        const isClaimedForThisCycle = index < currentDayIndex;
                        const hasClaimedToday = lastClaimed && isToday(lastClaimed);
                        const isClaimed = hasClaimedToday ? index <= currentDayIndex : isClaimedForThisCycle;
                        
                        const isTodayClaimable = canClaimToday && index === currentDayIndex;

                        return (
                            <div key={reward.day} className="flex flex-col items-center gap-2">
                                <div className={`relative w-16 h-16 rounded-lg flex flex-col items-center justify-center p-2 transition-all border
                                    ${isClaimed ? 'bg-primary/20 border-primary/50' : 'bg-card/50 border-border'}
                                    ${isTodayClaimable && isLoggedIn ? 'border-primary animate-pulse' : ''}`}>
                                    
                                    {isClaimed && (
                                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                            <CheckCircle2 className="h-8 w-8 text-primary"/>
                                        </div>
                                    )}
                                    <span className="text-xs font-bold text-muted-foreground">Day {reward.day}</span>
                                    <span className="text-lg font-bold">{reward.points}</span>
                                    <span className="text-xs text-muted-foreground">Points</span>
                                </div>
                                 <Button 
                                    size="sm"
                                    className="w-full text-xs h-7"
                                    disabled={!isTodayClaimable || !isLoggedIn}
                                    onClick={() => handleClaim(reward.day, reward.points)}>
                                        {isClaimed ? 'Claimed' : 'Claim'}
                                 </Button>
                            </div>
                        );
                    })}
                     <div className="col-span-4 text-center text-sm text-muted-foreground mt-2">
                        Your current login streak: {loginStreak} days.
                    </div>
                </CardContent>
            </Card>

        </main>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 w-full max-w-sm mx-auto bg-background/80 backdrop-blur-sm border-t border-border">
        <nav className="flex justify-around items-center p-2">
          <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-muted-foreground hover:text-primary" onClick={() => router.push('/')}>
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-primary" onClick={() => router.push('/quest')}>
            <Map className="h-6 w-6" />
            <span className="text-xs">Quest</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-muted-foreground hover:text-primary" onClick={() => router.push('/boost')}>
            <Rocket className="h-6 w-6" />
            <span className="text-xs">Boost</span>
          </Button>
        </nav>
      </footer>
    </div>
  );
}
