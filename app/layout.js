import { Chivo, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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

const themeInit = `(function(){try{var k='mahashri-theme',s=localStorage.getItem(k),d='dark',l='light';if(s===d||(s!==l&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add(d);else document.documentElement.classList.remove(d)}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${chivo.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-surface-bg text-fg">
        <Script 
          id="theme-init" 
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInit }}
        />
        {children}
      </body>
    </html>
  );
}
