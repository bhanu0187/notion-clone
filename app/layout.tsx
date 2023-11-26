import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/themeProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Notion-clone",
	description:
		"Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company — and do it exactly the way you want.",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/logo.svg",
				href: "/logo.svg",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/logo-dark.svg",
				href: "/logo-dark.svg",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
					storageKey='notion-theme'
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
