import type { Metadata } from "next";
import 'https://api.playground.chidahp.com/wp-includes/css/dist/block-library/style.min.css';
import "./globals.css";
import Header from "./components/header";
import { getCategories } from "@/lib/api";
import Menu from "./components/menu";
import Footer from "./components/footer";
import { Noto_Sans_Thai, Poppins } from "next/font/google";
import GoogleAnalytics from "./components/front/GoogleAnalytics";

const noto_sans_thai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "700"],
});

const poppins = Poppins({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Playground by Chidahp | สนามเด็กเล่นโรงเรียนชูโล่",
  description: "Playground คือสนามเด็กเล่นของความคิดสร้างสรรค์ ข่าวสาร เรื่องเล่า และโปรเจกต์กวนประสาทจากจักรวาลชี้ดาบ — เพราะข่าวไม่จำเป็นต้องจริง แต่ต้องเท่!",  
  keywords: [
    "Playground",
    "Chidahp",
    "ข่าวกวน",
    "สำนักข่าวชี้ดาบ",
    "ชี้ดาบ",
    "เนื้อหาสร้างสรรค์",
    "บทความ",
    "โรงเรียนชูโล่",
    "โรงเรียนชูโล่วิทยาคม",
  ],
  authors: [{ name: "นักเรียนชูโล่", url: "https://www.chidahp.com/" }],
  metadataBase: new URL("https://playground.chidahp.com"),

  creator: "นักเรียนชูโล่",
  publisher: "โรงเรียนชูโล่วิทยาคม",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Playground by Chidahp",
    description: "พื้นที่ข่าวสารและแรงบันดาลใจจากสำนักพิมพ์ชี้ดาบ",
    url: "https://playground.chidahp.com/",
    siteName: "Chidahp Playground",
    type: "website",
    locale: "th_TH",
  },
  other: {
    'google-site-verification': 'SIUv3M2q5tyg08t9hOXAvldUH5cdXz3HMCuS5Rq3WV8',
    'stylesheet': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
  }
};

export const dynamic = 'force-dynamic'


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={`${noto_sans_thai.variable} ${poppins.variable} antialiased`}>
        <Header />
        <Menu categories={categories} />
        {children}
        <Footer categories={categories} />
      </body>
    </html>
  );
}
