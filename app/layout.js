import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import NavigationLoader from "@/components/NavigationLoader";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ['normal', 'italic'],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "MahashriLab — Online 3D Printing Service",
  description: "Get instant pricing and upload your 3D models.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased light`}
    >
      <body className="min-h-full flex flex-col font-body bg-surface-bg text-fg">
        <NavigationLoader />
        {children}
      </body>
    </html>
  );
}
