import Head from "next/head";
import { useState, createContext } from "react";
import { SpotifyProvider } from "@/context/spotifyContext";
import '../styles/globalStyles.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <SpotifyProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </SpotifyProvider>
    </>
  );
}
