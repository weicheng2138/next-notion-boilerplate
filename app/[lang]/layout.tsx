import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/locale";
import Header from "@/components/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type Props = {
  params: { lang: Locale };
  children?: React.ReactNode;
};
export async function generateMetadata({ params }: Props) {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary["server-component"].title,
    description: "Generated by create next app",
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }: Readonly<Props>) {
  return (
    <html lang={params.lang}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
