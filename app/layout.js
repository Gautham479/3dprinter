import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import NavigationLoader from "@/components/NavigationLoader";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body bg-surface-bg text-fg">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('mahashri-theme') === 'dark' || (!('mahashri-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <NavigationLoader />
        {children}
      </body>
    </html>
  );
}
