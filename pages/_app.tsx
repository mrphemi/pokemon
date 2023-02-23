import type { AppProps } from "next/app";

import { Quicksand } from "@next/font/google";

import Nav from "@/components/Nav";

import "@/styles/globals.css";

const quickSand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${quickSand.variable} font-sans`}>
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}
