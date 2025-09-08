"use client"

import React from 'react';
import Hero from '../components/sd18/Hero';
import About from '../components/sd18/About';
import TrackViewClient from '../components/TrackViewClient';
import Link from 'next/link';

export default function SouthDakotaPage() {

  const longReviews = [
    {
      text: "อ่านจบอย่างบ้าคลั่งใน 1 วัน ต้องยอมรับเลยว่าเขียนและถ่ายทอดจนคนอ่านรู้สึกเหมือนเข้าไปนั่งอยู่ในใจเลยอ่ะ เว่อร์ป่ะ เล่าได้เห็นภาพสุดๆ",
      author: "@Kiksylittlechick",
      platform: "Instagram",
      rating: 5
    },
    {
      text: "ความน่าสนใจคือ พี่เจมมักทิ้งปมไว้ทั้งในหนังสือและ Podcast ว่า หลายอย่างในชีวิตเริ่มต้นที่ South Dakota ผมก็สงสัยมาตลอดว่ามันจะขนาดไหน พออ่านก็ต้องยอมรับเลยว่า ใช่ครับ ทุกอย่างมันเริ่มต้นจากตรงนี้จริงๆ",
      author: "@stamp.phongpisit_read",
      platform: "Instagram",
      rating: 5
    },
    {
      text: "จบตั้งแต่วันแรกเลยครับ สไตล์การเขียนคือเจม ชี้่ดาบคนเดิม ลุ้น ตื่นเต้น ตามทั้งเรื่องยา เรื่องผู้หญิง อธิบายอารมณ์ความรู้สึกได้กระจ่างมาก อยากให้วัยรุ่นไทยได้อ่านหนังสือชี้ดาบเยอะๆ คิดว่าให้อะไรมากกว่าแค่ความบันเทิง รอเล่มหน้าที่จะเล่าเรื่องร็อบบี้นะครับ",
      author: "Kajonsak Sutinwong",
      platform: "Facebook",
      rating: 5
    },
    {
      text: "อิงมองว่า 1 ปีอเมริกา คือ “การเติบโต” ของเจม แต่ South Dakota คือ “การเรียนรู้” คาดว่าเจมจะได้บทเรียนเปลี่ยนมุมมอง แต่ช่วงท้ายกลับสับสนและผิดหวังในตัวเองการอ่านรอบสองทำให้เข้าใจว่าเนื้อเรื่องมีหลายเลเยอร์ และนี่คือสิ่งที่พี่เจมตั้งใจสื่อ",
      author: "oneทาวสัน",
      platform: "Playground",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <TrackViewClient postId={'sd-18'} />
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Reviews Section */}
      <section id="reviews" className="py-16 md:py-20 bg-gradient-to-br from-purple-900/50 to-indigo-900/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              เสียงจากผู้อ่านบางส่วน
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              ฟังเสียงจากผู้ที่ได้สัมผัสกับ #southdakota18
            </p>
          </div>

          {/* Long Reviews Section */}
          <div className="mb-12 md:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              {longReviews.map((review, index) => (
                <div 
                  key={`long-${index}`}
                  className="bg-gradient-to-br from-purple-800/30 to-indigo-800/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 md:p-6 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-[1.02] mx-2 md:mx-0"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-purple-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-100 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                    &quot;{review.text}&quot;
                  </blockquote>
                  
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {review.author.charAt(1).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-purple-300 font-medium text-xs md:text-sm">{review.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 bg-purple-800/30 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                        {review.platform}
                      </span>
                      {review.platform === "Playground" && (
                        <Link
                          href="/category/southdakota/south-dakota-by-one-thoundsand" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-2 md:px-3 py-1 rounded-full text-white text-xs md:text-sm font-medium transition-all duration-200 hover:scale-105"
                        >
                          อ่านเต็ม
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="text-center mt-8 md:mt-12 px-4">
            <p className="text-gray-400 text-base md:text-lg">
              มีบางอย่างที่รอคุณอยู่ในหน้าถัดไป...
            </p>
          </div>
        </div>
      </section>

      {/* Review Invitation Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-pink-900/30 to-purple-900/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-6">
                📖 อ่านจบแล้ว รู้สึกอย่างไร?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 px-2">
                เราอยากรู้ความรู้สึกของคุณ! แค่ไม่กี่บรรทัดก็เพียงพอ<br className="hidden md:block"/>
                <span className="md:hidden"> </span>มาร่วมเป็นส่วนหนึ่งของชุมชนนักอ่าน #southdakota18 กันเถอะ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              {/* Email Review */}
              <div className="bg-gradient-to-br from-purple-800/40 to-pink-800/30 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 md:p-8 hover:border-purple-300/50 transition-all duration-300 group hover:scale-[1.02] mx-2 md:mx-0">
                <div className="mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">ส่งรีวิวส่วนตัว</h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4 md:mb-6">
                    เล่าให้เราฟังผ่านอีเมล์แบบส่วนตัว ไม่ยาว ไม่สั้น แค่จากใจก็เพียงพอ
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                  <p className="text-purple-300 font-mono text-xs md:text-sm break-all">
                    📧 story@mail.playground.chidahp.com
                  </p>
                </div>
                <a href="mailto:story@mail.playground.chidahp.com?subject=รีวิว South Dakota 18%2B&body=สวัสดีครับ/ค่า%0A%0Aผมได้อ่าน South Dakota 18%2B จบแล้ว และอยากแชร์ความรู้สึกดังนี้%3A%0A%0A" className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 text-sm md:text-base">
                  เขียนรีวิวทางอีเมล์
                </a>
              </div>

              {/* Social Media Review */}
              <div className="bg-gradient-to-br from-indigo-800/40 to-purple-800/30 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 md:p-8 hover:border-purple-300/50 transition-all duration-300 group hover:scale-[1.02] mx-2 md:mx-0">
                <div className="mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h6a2 2 0 002-2V7H7zM9 9h6M9 13h6M9 17h6" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">แชร์บน Social Media</h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4 md:mb-6">
                    โพสต์รีวิวบน Facebook, Instagram, Twitter หรือ TikTok พร้อม hashtag พิเศษ
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                  <p className="text-blue-300 font-mono text-xs md:text-sm break-all">
                    #southdakota18 #หนังสือดี #รีวิวหนังสือ
                  </p>
                </div>
                <button 
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 text-sm md:text-base"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'รีวิว South Dakota 18+',
                        text: 'เพิ่งอ่าน South Dakota 18+ จบ รู้สึก... #southdakota18',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText('#southdakota18 #หนังสือดี #รีวิวหนังสือ');
                      alert('คัดลอก hashtag แล้ว!');
                    }
                  }}
                >
                  แชร์บน Social Media
                </button>
              </div>
            </div>

            <div className="text-center px-4">
              <p className="text-gray-400 text-base md:text-lg mb-4">
                💝 ทุกรีวิวมีค่าสำหรับเรา ไม่ว่าจะเป็นคำชื่นชม คำติชม หรือแค่ความรู้สึก
              </p>
              <p className="text-purple-300 font-medium">
                ขอบคุณที่เป็นส่วนหนึ่งของการเดินทางนี้ ✨
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="buy" className="py-20 bg-gradient-to-r from-pink-600/20 to-purple-600/20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              พร้อมเริ่มการเดินทางแล้วหรือยัง?
            </h2>
            <p className="text-xl text-gray-300">
              เปิดหน้าแรกและเจอกับเรื่องราวที่จะเปลี่ยนมุมมองของคุณ
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://chidahp.page365.net/products/79228651" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg inline-block">
                สั่งซื้อหนังสือ
              </a>
            </div>
          </div>
        </div>
      </section>    
    </div>
  );
}