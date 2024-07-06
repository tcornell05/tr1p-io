import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "../../../app/providers";
import { NavbarTr1pio } from "@/components/navbarTr1pio";
import { Link } from "@nextui-org/link";
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

export default function Tr1pRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (

		<html lang="en">
		<head />
			<body
				className={clsx(
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
				
				<div className={clsx(
                "min-h-screen bg-gradient-to-bl from-amber-200 via-violet-600 to-sky-900 font-sans antialiased"
            )}>
				<NavbarTr1pio />
					<div className="relative flex flex-col h-screen">
						
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							{children}
						</main>
						<footer className="w-full flex items-center justify-center py-3">
							<Link
								isExternal
								className="flex items-center gap-1 text-current"
								href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
								title="nextui.org homepage"
							>
								<span className="text-default-600">Powered by</span>
								<p className="text-primary">NextUI</p>
							</Link>
						</footer>
					</div>
					</div>
				</Providers>
			</body>
			</html>
	);
}
