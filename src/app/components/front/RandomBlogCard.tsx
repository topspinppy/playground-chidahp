'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import GoogleAdsense from '../GoogleAdsense';

// ข้อมูลสุ่มสำหรับ Blog Cards
const randomBlogData = [
  {
    title: "เทคนิคการเขียนโค้ดที่คุณต้องรู้",
    excerpt: "เรียนรู้เทคนิคการเขียนโค้ดที่สำคัญสำหรับนักพัฒนาทุกคน รวมถึง best practices และ tips ที่จะช่วยให้คุณเขียนโค้ดได้ดีขึ้น",
    category: "Programming",
    author: "ชิดาห์พี",
    image: "/chidahp.png",
    slug: "programming-tips",
    categoryBg: "bg-blue-100 text-blue-800"
  },
  {
    title: "การออกแบบ UI/UX ที่ทันสมัย",
    excerpt: "แนวคิดและหลักการออกแบบ UI/UX ที่จะช่วยให้เว็บไซต์ของคุณดูทันสมัยและใช้งานง่ายมากขึ้น",
    category: "Design",
    author: "ชิดาห์พี",
    image: "/chidahp.png",
    slug: "ui-ux-design",
    categoryBg: "bg-purple-100 text-purple-800"
  },
  {
    title: "การจัดการฐานข้อมูลอย่างมีประสิทธิภาพ",
    excerpt: "เทคนิคการออกแบบและจัดการฐานข้อมูลที่จะช่วยให้แอปพลิเคชันของคุณทำงานได้เร็วและเสถียร",
    category: "Database",
    author: "ชิดาห์พี",
    image: "/chidahp.png",
    slug: "database-management",
    categoryBg: "bg-green-100 text-green-800"
  },
  {
    title: "การพัฒนา Mobile App ด้วย React Native",
    excerpt: "เรียนรู้การสร้างแอปมือถือข้ามแพลตฟอร์มด้วย React Native ตั้งแต่เริ่มต้นจนถึงการ deploy",
    category: "Mobile",
    author: "ชิดาห์พี",
    image: "/chidahp.png",
    slug: "react-native-mobile",
    categoryBg: "bg-orange-100 text-orange-800"
  },
  {
    title: "การทำ SEO ให้เว็บไซต์ติดหน้าแรก Google",
    excerpt: "เทคนิคและกลยุทธ์การทำ SEO ที่จะช่วยให้เว็บไซต์ของคุณติดอันดับต้นๆ ใน Google Search",
    category: "SEO",
    author: "ชิดาห์พี",
    image: "/chidahp.png",
    slug: "seo-optimization",
    categoryBg: "bg-teal-100 text-teal-800"
  }
];

// สุ่มลำดับการแสดงผล
const getRandomOrder = () => {
  return Math.random() > 0.5 ? 'normal' : 'reverse';
};

export function RandomBlogCard() {
  const [order, setOrder] = useState(getRandomOrder());

  useEffect(() => {
    // สุ่มข้อมูลใหม่ทุก 5 วินาที
    const interval = setInterval(() => {
      setOrder(getRandomOrder());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <article className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 ${order === 'reverse' ? 'transform scale-95' : ''}`}>
      <GoogleAdsense adSlot="3979811480" />
    </article>
  );
}

