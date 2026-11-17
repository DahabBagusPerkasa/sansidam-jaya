import type { Metadata } from "next";
import SiteLoader from "./site-loader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sansidam Jaya | Sandi dan Siber Kodam Jaya",
  description:
    "Website profil Sandi dan Siber Kodam Jaya. Menjaga Informasi, Memperkuat Keamanan Digital.",
  keywords: [
    "Sansidam Jaya",
    "Sandi dan Siber Kodam Jaya",
    "Kodam Jaya",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}