import "../styles/globals.css";
import { ProductContextProvider } from "../context/productContext";
import type { AppProps } from "next/app";
import { Container } from "../components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductContextProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </ProductContextProvider>
  );
}
