"use client";

import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import themes from "@/utils/themes";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
      <CacheProvider>
        <ChakraProvider theme={themes}>
          {children}
        </ChakraProvider>
      </CacheProvider>
  );
};
