import EnergyCloudApp from "@/components/energy-cloud-app";

export default function Home() {
  return (
    <main className="flex w-full items-center justify-center bg-background">
      <EnergyCloudApp currentPage="home" />
    </main>
  );
}
