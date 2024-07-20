import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/context/react-query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EdgeStoreProvider } from "@/context/edge-store-provider";

type Props = { children: React.ReactNode };

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

export default RootLayout;
