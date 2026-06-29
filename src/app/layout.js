import "./globals.css";
import { Metadata } from "next";
import LocalFont from "next/font/local";
import { Toaster } from "sonner";

const customFont = LocalFont({
  src: [
    {
      path: "../assets/fonts/ppneuemontreal-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/ppneuemontreal-book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/ppneuemontreal-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/ppneuemontreal-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/ppneuemontreal-semibolditalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/ppneuemontreal-thin.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-PPneue",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${customFont.variable} h-full antialiased`}>
      <head>
        <link
          href="https://cdn.boxicons.com/3.0.8/fonts/basic/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <link
          href="https://cdn.boxicons.com/3.0.8/fonts/filled/boxicons-filled.min.css"
          rel="stylesheet"
        ></link>
        <link
          href="https://cdn.boxicons.com/3.0.8/fonts/brands/boxicons-brands.min.css"
          rel="stylesheet"
        ></link>
      </head>
      <body className="min-h-full flex flex-col">{children}
        <Toaster postition="top right" richColors/>
      </body>
    </html>
  );
}
