import { ChakraProvider, Text, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Header from "./component/Header";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <QueryClientProvider client={client}>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Header />
          <ReactQueryDevtools />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </div>
  );
}
