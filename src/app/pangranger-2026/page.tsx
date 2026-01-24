"use client"

import React from 'react';
import Typewriter from 'typewriter-effect';
import TrackViewClient from '../components/TrackViewClient';
import Link from 'next/link';
import MatrixBackground from './MatrixBackground';

export default function Pangranger2026Page() {

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
    <div className="min-h-screen bg-black text-[#00FF41] font-mono selection:bg-[#00FF41] selection:text-black overflow-x-hidden">
      <TrackViewClient postId={'pangrenger-2026'} />
      <MatrixBackground />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 z-10 border-b border-[#00FF41]/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1)_0%,transparent_70%)]" />
        
        <div className="relative z-10 space-y-6">
          <div className="inline-block px-4 py-1 border border-[#00FF41] text-xs mb-4 animate-pulse">
            SYSTEM STATUS: OPERATIONAL
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">
            <Typewriter
              options={{
                strings: ['พังเรนเจอร์ 2026'],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
              }}
            />
          </h1>

          <p className="text-lg md:text-2xl text-[#00FF41]/80 max-w-3xl mx-auto leading-relaxed">
            เมื่อสิ่งที่เชื่อมาทั้งชีวิต อาจจะผิดมาตั้งแต่แรก...
          </p>

          <div className="pt-8">
            <a 
              href="#about" 
              className="px-8 py-3 border border-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all duration-300 font-bold tracking-widest uppercase text-sm"
            >
              [ ENTER THE SYSTEM ]
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 md:py-36 z-10 border-b border-[#00FF41]/30 bg-black/80">
        <div className="container mx-auto max-w-4xl px-6 md:px-10">
          <div className="border-l-4 border-[#00FF41] pl-6 md:pl-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest">
              &gt; THE STORY
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl leading-loose text-[#00FF41]/90">
              <p className="opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
                กูเก็บไดอารี่ หลังสรุปความคิดลงสมุดว่ากูคิดแล้วว่ากูจะใช้ชีวิตที่นี่ยังไง กูจะสนุกให้สุด ลืมทุกอย่างที่ไทย
              </p>
              <p className="opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
                พอกันที ไอ้ชีวิตที่ต้องกลัวแต่การทำให้ถูก ห้ามโน่นห้ามนี่ กูบอกตัวเองว่าจะใช้ชีวิตให้สุด เหี้ยให้สมใจ
              </p>
              <p className="opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards] font-bold">
                ให้คุ้มกับการเป็นครั้งสุดท้าย ก่อนที่กูจะต้องไปเผชิญโลกแห่งความจริง
              </p>
            </div>

            <div className="mt-12 p-6 border border-[#00FF41]/30 bg-[#00FF41]/5">
              <p className="italic text-base md:text-lg">
                &quot;...รถบัสเดินทางฝ่าถนน ฝ่าภูมิประเทศที่เป็นดินแดนโล่งกว้างอยู่เกือบสองวัน ในที่สุดก็เข้าสู่วันใหม่ พอพ้นเนินเขา มันก็พาเข้าสู่ภูมิประเทศที่เป็นที่ราบกว้างใหญ่ มีเนินเขาสีเขียวอยู่ไกลสุดสายตา&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 z-10 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-4">
              [ TRANSMISSIONS FROM THE SOURCE ]
            </h2>
            <p className="text-[#00FF41]/60">REVIEWS COLLECTED FROM THE GRID</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {longReviews.map((review, index) => (
              <div 
                key={`long-${index}`}
                className="group border border-[#00FF41]/30 p-6 hover:bg-[#00FF41]/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 text-[10px] text-[#00FF41]/30">
                  REF_ID: 0x{index.toString(16)}
                </div>
                
                <div className="flex items-center mb-4 space-x-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-[#00FF41]">★</span>
                  ))}
                </div>
                
                <blockquote className="text-[#00FF41]/90 text-base md:text-lg mb-8 leading-relaxed before:content-['\u201C'] after:content-['\u201D']">
                  {review.text}
                </blockquote>
                
                <div className="flex items-center justify-between text-xs border-t border-[#00FF41]/20 pt-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#00FF41] text-black px-1 font-bold">{review.author.startsWith('@') ? review.author.substring(1, 2).toUpperCase() : review.author.charAt(0)}</span>
                    <span className="font-bold">{review.author}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-[#00FF41]/50 uppercase">{review.platform}</span>
                    {review.platform === "Playground" && (
                      <Link
                        href="/category/southdakota/south-dakota-by-one-thoundsand" 
                        target="_blank" 
                        className="text-[#00FF41] hover:underline"
                      >
                        [ READ_FULL ]
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Invitation Section */}
      <section className="py-24 z-10 border-y border-[#00FF41]/30 bg-[#00FF41]/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-12 tracking-tighter">
            UPLOAD YOUR FEEDBACK
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Email */}
            <div className="border border-[#00FF41] p-8 space-y-6 flex flex-col items-center">
              <div className="text-4xl">✉</div>
              <h3 className="text-xl font-bold uppercase">SECURE_CHANNEL: EMAIL</h3>
              <p className="text-sm text-[#00FF41]/70">ส่งรีวิวส่วนตัวผ่านเข้ารหัสอีเมล์</p>
              <a 
                href="mailto:story@mail.playground.chidahp.com?subject=รีวิว South Dakota 18%2B&body=สวัสดีครับ/ค่า%0A%0Aผมได้อ่าน South Dakota 18%2B จบแล้ว และอยากแชร์ความรู้สึกดังนี้%3A%0A%0A" 
                className="w-full py-3 bg-[#00FF41] text-black font-bold uppercase hover:bg-black hover:text-[#00FF41] border border-[#00FF41] transition-all"
              >
                CONNECT
              </a>
            </div>

            {/* Social */}
            <div className="border border-[#00FF41] p-8 space-y-6 flex flex-col items-center">
              <div className="text-4xl">#</div>
              <h3 className="text-xl font-bold uppercase">BROADCAST: SOCIAL</h3>
              <p className="text-sm text-[#00FF41]/70">แชร์ประสบการณ์บนโครงข่าย Social Media</p>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'รีวิว South Dakota 18+',
                      text: 'เพิ่งอ่าน South Dakota 18+ จบ รู้สึก... #southdakota18',
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText('#southdakota18 #หนังสือดี #รีวิวหนังสือ');
                    alert('HASH_TAGS COPIED TO CLIPBOARD');
                  }
                }}
                className="w-full py-3 bg-black text-[#00FF41] font-bold uppercase hover:bg-[#00FF41] hover:text-black border border-[#00FF41] transition-all"
              >
                BROADCAST
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="buy" className="py-32 z-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00FF41]/5 animate-pulse" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                CHOOSE YOUR PILL
              </h2>
              <p className="text-xl text-[#00FF41]/80">
                เปิดหน้าแรกและเจอกับเรื่องราวที่จะเปลี่ยนมุมมองของคุณ
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-6">
              <a 
                href="https://chidahp.page365.net/products/79228651" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative px-12 py-5 overflow-hidden"
              >
                <div className="absolute inset-0 border-2 border-[#00FF41] animate-[borderFlow_2s_linear_infinite]" />
                <span className="relative z-10 text-2xl font-bold uppercase tracking-[0.3em] group-hover:scale-110 transition-transform inline-block">
                  [ ACQUIRE_KNOWLEDGE ]
                </span>
              </a>
              <div className="text-xs text-[#00FF41]/40 animate-pulse">
                &gt;&gt; REDIRECTING TO SECURE CHECKOUT &lt;&lt;
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-[10px] text-[#00FF41]/30 z-10 relative border-t border-[#00FF41]/10 uppercase tracking-widest">
        © 2026 PANGRANGER SYSTEMS. ALL RIGHTS RESERVED. | v2.0.26-ALPHA
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderFlow {
          0% { clip-path: inset(0 0 95% 0); }
          25% { clip-path: inset(0 95% 0 0); }
          50% { clip-path: inset(95% 0 0 0); }
          75% { clip-path: inset(0 0 0 95%); }
          100% { clip-path: inset(0 0 95% 0); }
        }
      `}</style>
    </div>
  );
}
