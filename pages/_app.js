import Head from "next/head";
import { useState, createContext } from "react";
import AppContext from "@/context/loggedIn";

export default function App({ Component, pageProps }) {
  const [loggedInContext, setLoggedInContext] = useState(false);
  return (
    <>
      <AppContext.Provider value={{loggedInContext, setLoggedInContext}}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </AppContext.Provider>
    </>
  );
}
