import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // Import Next.js Script for GTM
import "./globals.css";
import { Onest, Poppins, Courier_Prime, Roboto } from "next/font/google";

// Google Tag Manager ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const courier_prime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-courier-prime",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "ScreenplayInk",
  description: "The World's Most Advanced Screenwriting Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Script */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* Custom Fonts */}
        <link
          href="https://db.onlinewebfonts.com/c/755bd04c81d9eb488a897c037c6bb2d7?family=Garnett+Semibold+Regular"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/755bd04c81d9eb488a897c037c6bb2d7?family=Garnett+Semibold+Italic"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${onest.variable} ${poppins.variable} ${courier_prime.variable} ${roboto.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) for No-JS Users */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <main className="min-h-screen bg-landing-bg">{children}</main>
      </body>
    </html>
  );
}
