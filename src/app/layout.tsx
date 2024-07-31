import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/context/react-query-provider";
import { AppHeader } from "@/components/app-header";

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
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <AppHeader />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

export default RootLayout;
