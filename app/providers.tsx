"use client";

import React, { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { ThemeProviderProps } from "next-themes/dist/types";
import store from "@/app/lib/redux/store";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
}
