import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "../providers";

import clsx from "clsx";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en">
      <head></head>
      <body
        className={clsx(
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>






          <main className={clsx(
            "font-sans"
          )}>
            {children}
          </main>



        </Providers>
      </body>
    </html>
  );
}
