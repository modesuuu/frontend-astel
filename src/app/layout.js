import "./globals.css";
import { Metadata } from "next";
import LocalFont from "next/font/local";

const customFont = LocalFont({
  src: [
    {
      path: "../assets/fonts/ppneuemontreal-bold.otf",
      weight: "700",
      style: "normal"
    },{
      path: "../assets/fonts/ppneuemontreal-book.otf",
      weight: "400",
      style: "normal"
    },{
      path: "../assets/fonts/ppneuemontreal-italic.otf",
      weight: "400",
      style: "italic"
    },{
      path: "../assets/fonts/ppneuemontreal-medium.otf",
      weight: "500",
      style: "normal"
    },{
      path: "../assets/fonts/ppneuemontreal-semibolditalic.otf",
      weight: "600",
      style: "italic"
    },{
      path: "../assets/fonts/ppneuemontreal-thin.otf",
      weight: "300",
      style: "normal"
    }
  ],
  variable: "--font-PPneue",
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${customFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
