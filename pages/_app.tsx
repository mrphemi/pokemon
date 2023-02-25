import type { AppProps } from "next/app";
import Head from "next/head";

import { Quicksand } from "@next/font/google";

import Nav from "@/components/Nav";

import "@/styles/globals.css";

const quickSand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokemon App</title>
        <meta name="description" content="Pokemon Search App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${quickSand.variable} font-sans`}>
        <Nav />
        <Component {...pageProps} />
      </div>
    </>
  );
}
