
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/app-context";
import EnergyCloudApp from "@/components/energy-cloud-app";

export default function Boost() {
  const { toast } = useToast();
  const { points, setPoints, setPointsPerSecond, setEnergy } = useAppContext();

  const handleBuyPointBoost = (level: 1 | 2) => {
    const cost = level === 1 ? 5000 : 10000;
    const boost = level === 1 ? 0.01 : 0.1;

    if (points >= cost) {
      setPoints(points - cost);
      setPointsPerSecond(prev => prev + boost);
      toast({
        title: `Point Boost Level ${level} Purchased`,
        description: `You now gain ${boost} additional points per second.`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: "You do not have enough points to purchase this boost.",
        variant: "destructive",
      });
    }
  };

  const handleBuyEnergyBoost = (level: 1 | 2) => {
    const cost = level === 1 ? 5000 : 10000;
    const energyAmount = level === 1 ? 2000 : 3000;

    if (points >= cost) {
      setPoints(points - cost);
      setEnergy(prev => prev + energyAmount);
      toast({
        title: `Energy Boost Level ${level} Purchased`,
        description: `You gained ${energyAmount} energy.`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: "You do not have enough points to purchase this boost.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex w-full items-center justify-center bg-background">
      <EnergyCloudApp currentPage="boost" />
      <div className="container mx-auto p-4 absolute top-28 left-0 right-0">
        <h1 className="text-2xl font-bold mb-4 text-center">Boost Store</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Point Boosts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Level 1</h3>
                    <p className="text-sm text-muted-foreground">Gain 0.01 points/sec</p>
                  </div>
                  <Button onClick={() => handleBuyPointBoost(1)}>
                    5000 P
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Level 2</h3>
                    <p className="text-sm text-muted-foreground">Gain 0.1 points/sec</p>
                  </div>
                  <Button onClick={() => handleBuyPointBoost(2)}>
                    10000 P
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy Boosts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Level 1</h3>
                    <p className="text-sm text-muted-foreground">+2000 Energy</p>
                  </div>
                  <Button onClick={() => handleBuyEnergyBoost(1)}>
                    5000 P
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Level 2</h3>
                    <p className="text-sm text-muted-foreground">+3000 Energy</p>
                  </div>
                  <Button onClick={() => handleBuyEnergyBoost(2)}>
                    10000 P
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
