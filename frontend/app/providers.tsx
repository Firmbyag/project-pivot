"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { AppProgressBar } from "next-nprogress-bar";
import { getToken } from "@/utils/token";
import toast from "react-hot-toast";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  React.useEffect(() => {
    const token = getToken()
    if(!token){
      router.push("/")
      toast.error("Faça Login novamente para acessar")
    }
  }, [])

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      <AppProgressBar
        height="4px"
        color="#1111"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </NextUIProvider>
  );
}
