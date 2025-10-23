import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "./components/ConditionalHeader";
import { getAllCategoriesWithChildren } from "@/lib/api";
import Footer from "./components/footer";
import { Noto_Sans_Thai, Poppins } from "next/font/google";
import Head from "./Header";
import CookieConcent from "./components/CookieConsent";

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
    // 🎭 Writer Brand Identity
    "ชี้ดาบ",
    "โรงเรียนชูโล่", 
    "โรงเรียนชูโล่วิทยาคม",
    "chidahp",
    "chidahp playground",
    "สนามเด็กเล่นชูโล่",
    "ชี้ดาบ สมัครสมาชิก",
    "ชี้ดาบ login",

    // 📚 Books & Publications
    "southdakota18+",
    "south dakota 18+", 
    "SouthDakota18+",
    "southdakota18+ รีวิว",
    "southdakota18+ อ่านออนไลน์",
    "south dakota 18+ pdf",
    "บล็อคน่าอ่าน",
    "เนื้อหาน่าอ่าน",
    "south dakota 18+ ชี้ดาบ",
    "หนังสือใหม่ 2025",
    "เซ้าท์ดาโกต้า",
    "fictionlab",
    "filp frames",
    "filpframes",
    "oneทาวสัน",
    "EMAG",
    "JamesIsBack",
    "ลูกรักBTS",

    // ✍️ Writer Community Keywords  
    "ชุมชนนักเขียน",
    "นักเขียนไทย",
    "นิยายออนไลน์",
    "เรื่องสั้นไทย",
    "บทความสร้างสรรค์",
    "ข่าวสายกวน",
    "นักเขียนมือใหม่เริ่มต้นยังไง",
    
    // 🔍 Discovery Keywords
    "หนังสือใหม่ 2025",
    "นิยายไทยน่าอ่าน", 
    "เขียนหนังสือออนไลน์",
    "แพลตฟอร์มนักเขียน",
    "อ่านนิยายฟรี",
    "อ่านนิยายที่ไม่มีโฆษณา",
    "หาที่เผยแพร่งานเขียน",
    "อยากเป็นนักเขียนเริ่มยังไง",
    "งานสัปดาห์หนังสือ 2025",
    "นิยายไทย 2025",
    "แพลตฟอร์มนักเขียนไทย",
    "อีบุ๊ค",
    "e-book ไทย"
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
  }
};

export const dynamic = 'force-dynamic'


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getAllCategoriesWithChildren();

  return (
    <html lang="en">
      <Head />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8360416910031647"
        crossOrigin="anonymous"
      />
      <link rel="canonical" href="https://chidahp.com/playground" />

      <body className={`${noto_sans_thai.variable} ${poppins.variable} antialiased`}>
        <ConditionalHeader categories={categories} />
        {children}
        <Footer categories={categories} />
        <CookieConcent />
      </body>
    </html>
  );
}
