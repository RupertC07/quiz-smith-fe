import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QUIZ SMITH",
  description: "AI-Powered Quiz Generator",
  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.variable}>
        {children}
        <footer className="w-full text-center p-4 font-bold text-sm text-violet-500/50 ">
        <hr/>
          <div className="flex flex-col items-center justify-center mb-4 mt-6 gap-4">
        
            <div className="space-y-6">
              
              <p className="text-sm font-normal text-gray-500">
                © 2024 Project Nex. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
