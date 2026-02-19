import localFont from "next/font/local";
import "./globals.css";

const optima = localFont({
  src: [
    {
      path: "/fonts/Optima.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-optima",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={optima.variable}>
      <body className="antialiased font-optima">
        {children}
      </body>
    </html>
  );
}
