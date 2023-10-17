import "../modules/common/styles/base.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";

const LexendDecaFont = localFont({
	src: "../fonts/LexendDeca-VariableFont_wght.ttf",
});

export const metadata: Metadata = {
	title: "Contact List",
	description: "This is a contact list",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={LexendDecaFont.className}>{children}</body>
		</html>
	);
}
