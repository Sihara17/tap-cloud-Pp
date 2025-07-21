import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from '@/context/app-context';

export const metadata: Metadata = {
  title: "TapCloud – Tap to Earn",
  description: "play and earn your tapcloud energy! login with line and enhoy your game full rewards",
  openGraph: {
    title: "TapCloud – Tap to Earn",
    description: "play and earn your tapcloud energy! login with line and enhoy your game full rewards",    
    url: "https://tap-cloud-pp.vercel.app/", // GANTI dengan URL final
    siteName: "TapCloud",
    images: [
      {
        url: "https://your-app.vercel.app/og-image.png", // Upload og-image ke /public
        width: 1200,
        height: 630,
        alt: "TapCloud OpenGraph Image",
      },
    ],
    locale: "en_EN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapCloud – Tap to Earn",
    description: play and earn your tapcloud energy! login with line and enhoy your game full rewards",
    images: ["https://tap-cloud-pp.vercel.app/logo1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="font-body antialiased">
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
