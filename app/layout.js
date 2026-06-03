import { Chivo, DM_Sans } from "next/font/google";
import "./globals.css";
import NavigationLoader from "@/components/NavigationLoader";

const chivo = Chivo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "MahashriLab — Online 3D Printing Service",
  description: "Get instant pricing and upload your 3D models.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${chivo.variable} ${dmSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-body bg-surface-bg text-fg">
        <NavigationLoader />
        {children}
      </body>
    </html>
  );
}
