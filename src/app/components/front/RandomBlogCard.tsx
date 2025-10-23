'use client';

import { useState, useEffect } from 'react'
import GoogleAdsense from '../GoogleAdsense';


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

