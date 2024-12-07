import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import "../styles/Makeshift.css";
import type { AppProps } from "next/app";
import { ContextProvider } from "@/context/MyContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
