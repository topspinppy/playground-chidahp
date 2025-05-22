import type { Metadata } from "next";
import { Kanit } from "next/font/google"; // <-- เพิ่มตรงนี้
import "./globals.css";
import Header from "./components/header";
import { getCategories } from "@/lib/api";
import Menu from "./components/menu";
import Footer from "./components/footer";
const kanit = Kanit({
  variable: "--font-kanit", // <-- ตั้งชื่อ custom property
  subsets: ["thai", "latin"], // <-- ถ้าต้องรองรับภาษาไทยด้วย
  weight: ["300", "400", "500", "700"], // <-- กำหนดน้ำหนักที่ต้องใช้
});

export const metadata: Metadata = {
  title: "Playground by Chidahp",
  description: "เตรียมพบกับพื้นที่ทดลองแนวคิด ข่าวสาร ความคิดสร้างสรรค์ และโปรเจกต์ใหม่จากจักรวาลชี้ดาบ ที่จะทำให้คุณรู้ว่า ข่าวไม่จำเป็นต้องจริง แต่ต้องเท่!",
  keywords: ["Chidahp", "Playground", "สำนักข่าว", "ชี้ดาบ", "ข่าวสายกวน", "coming soon", "สำนักพิมพ์"],
  authors: [{ name: "นักเรียนชูโล่", url: "https://www.chidahp.com/" }],
  creator: "นักเรียนชูโล่",
  openGraph: {
    title: "Playground by Chidahp",
    description: "พื้นที่ข่าวสารและแรงบันดาลใจจากสำนักพิมพ์ชี้ดาบ",
    url: "https://playground.chidahp.com/",
    siteName: "Chidahp Playground",
    type: "website",
    locale: "th_TH",
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body
        className={`${kanit.variable} antialiased`}
      >
        <Header />
        <Menu categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
