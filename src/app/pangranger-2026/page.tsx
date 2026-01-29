"use client"

import React from 'react';
import Typewriter from 'typewriter-effect';
import TrackViewClient from '../components/TrackViewClient';
import Link from 'next/link';
import MatrixBackground from './MatrixBackground';
import Image from 'next/image';

const LAUNCH = false;
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
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 z-10 border-b border-[#00FF41]/30 overflow-hidden">
        {/* Cinematic Background Image from Cover */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pangranger-bg.png"
            alt="Matrix Corridor Background"
            fill
            className="object-cover opacity-60 mix-blend-screen"
            priority
          />
          {/* Gradients to blend the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.2)_0%,transparent_70%)]" />
        </div>
        
        {/* Characters Running Out (The Pangranger Group) */}
        <div className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="relative w-full max-w-7xl aspect-video mt-12 sm:mt-20 md:mt-40 scale-90 sm:scale-100 md:scale-110 lg:scale-125">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/pangranger-characters-final.png"
                alt="Pangranger Characters Running"
                width={1400}
                height={900}
                className="object-contain opacity-100 brightness-110 contrast-110 animate-slide-up-fade"
                style={{
                  maskImage: 'linear-gradient(to top, transparent 0%, black 25%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 25%, black 100%)'
                }}
              />
            </div>
            {/* Ground glow under characters */}
            <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-2/3 h-16 sm:h-24 md:h-32 bg-[#00FF41]/10 blur-[60px] sm:blur-[80px] rounded-full" />
          </div>
        </div>
        
        <div className="relative z-10 space-y-3 sm:space-y-4 md:space-y-6 max-w-5xl mx-auto mt-[-2vh] sm:mt-[-5vh] md:mt-[-8vh]">
          <div className="inline-block px-3 sm:px-4 py-1 border border-[#00FF41] text-[9px] sm:text-[10px] md:text-xs mb-2 animate-pulse tracking-[0.15em] sm:tracking-[0.2em] bg-black/50 backdrop-blur-sm">
            SYSTEM_PROTOCOL: FINAL_BELIEF_TERMINATED
          </div>
          
          <div className="flex flex-col items-center mb-32 sm:mb-48 md:mb-60">
            {/* Main Logo Image - Centered and slightly smaller to not cover characters too much */}
            <div className="relative group max-w-[85vw] sm:max-w-[80vw] md:max-w-[75vw] lg:max-w-2xl">
              <div className="absolute -inset-8 sm:-inset-12 md:-inset-16 bg-[#00FF41]/20 blur-[60px] sm:blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-1000 animate-pulse" />
              <Image
                src="/pangranger-logo.png"
                alt="สิ้นสุดทางเชื่อ"
                width={700}
                height={350}
                className="relative z-10 drop-shadow-[0_0_20px_rgba(0,255,65,0.7)] sm:drop-shadow-[0_0_30px_rgba(0,255,65,0.7)] animate-zoom-fade w-full h-auto object-contain brightness-110 contrast-125"
                priority
              />
            </div>
          </div>

          <div className="relative py-2 px-2 sm:px-4">
            <div className="absolute inset-0 bg-black/60 blur-2xl rounded-full" />
            <div className="noto-sans-thai relative min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] flex items-center justify-center">
              <p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#00FF41] max-w-3xl mx-auto leading-relaxed sm:leading-relaxed font-bold drop-shadow-[0_0_8px_rgba(0,255,65,0.5)] sm:drop-shadow-[0_0_10px_rgba(0,255,65,0.5)] break-words overflow-wrap-anywhere hyphens-none d"
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  willChange: 'contents',
                }}
              >
                <Typewriter
                  options={{
                    strings: ['เมื่อสิ่งที่เชื่อมาทั้งชีวิต อาจจะผิดมาตั้งแต่แรก...'],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                    cursor: '|',
                  }}
                />
              </p>
            </div>
          </div>

          <div className="pt-4 sm:pt-6 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4">
            <a 
              href="#pre-launch" 
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#00FF41] overflow-hidden transition-all duration-300 hover:bg-[#00FF41] hover:text-black bg-black/60 backdrop-blur-md w-full sm:w-auto"
            >
              <div className="absolute inset-0 w-0 bg-[#00FF41] transition-all duration-300 group-hover:w-full -z-10" />
              <span className="font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs md:text-sm">
                [ สั่งจอง คลิก! ]
              </span>
            </a>
          </div>
        </div>

        {/* Perspective elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </section>

      <section id="pre-launch" className="py-12 sm:py-16 md:py-20 lg:py-32 z-10 border-b border-[#00FF41]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00FF41]/5 animate-pulse opacity-30" />
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <div className="border border-[#00FF41]/40 p-5 sm:p-6 md:p-8 lg:p-12 bg-black/80 backdrop-blur-md relative overflow-hidden group">
            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00FF41]/20 animate-[scan_3s_linear_infinite] pointer-events-none" />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#00FF41]" />
            <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#00FF41]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#00FF41]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#00FF41]" />

            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 flex-shrink-0">
                <div className="absolute inset-0 bg-[#00FF41]/20 rounded-full blur-2xl animate-pulse" />
                <Image
                  src="/chidahp.png"
                  alt="Chidahp Logo"
                  width={200}
                  height={200}
                  className="relative z-10 object-contain brightness-110 drop-shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                />
              </div>

              <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
                <div className="inline-block px-2 sm:px-3 py-1 bg-[#00FF41] text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2">
                  PRIVILEGED_ACCESS: CHULO_PROTOCOL
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
                  PRE-ORDER <br className="hidden md:block" />
                  <span className="text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.5)] sm:drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">สำหรับชาวชูโล่</span>
                </h2>
                <div className="space-y-3 sm:space-y-4 text-[#00FF41]/80 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                  <p>
                    ช่องทางพิเศษสำหรับ <span className="text-[#00FF41] font-bold">ชาวชูโล่</span> เพื่อสั่งจองผลงานล่าสุด 
                    <span className="text-white font-bold ml-1">สิ้นสุดทางเชื่อ</span> 
                  </p>
                </div>
                
                <div className="pt-3 sm:pt-4">
                  <a 
                    href="https://chidahp.page365.net/products/81069622" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 overflow-hidden w-full sm:w-auto text-center"
                  >
                    <div className="absolute inset-0 border-2 border-[#00FF41] group-hover:bg-[#00FF41] transition-all duration-300" />
                    <span className="relative z-10 font-bold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase text-[10px] sm:text-xs md:text-sm group-hover:text-black transition-colors">
                      [ CLICK_HERE ]
                    </span>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-[#00FF41] blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 text-[9px] sm:text-[10px] text-[#00FF41]/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2">
            <span className="flex items-center gap-1 whitespace-nowrap"><span className="w-1 h-1 bg-[#00FF41] rounded-full animate-pulse" /> STATUS: READY_FOR_UPLINK</span>
            <span className="whitespace-nowrap">SECURED_BY: CHID_ENCRYPTION_v2</span>
            <span className="whitespace-nowrap">TIMESTAMP: 2026.01.25.13.00</span>
          </div>
        </div>
      </section>
      
      {LAUNCH && (
        <>
          {/* About Section */}
          <section id="about" className="relative py-12 sm:py-16 md:py-24 lg:py-36 z-10 border-b border-[#00FF41]/30 bg-black/80">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-10">
              <div className="border-l-4 border-[#00FF41] pl-4 sm:pl-6 md:pl-10 space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider sm:tracking-widest text-white drop-shadow-[0_0_8px_rgba(0,255,65,0.5)] sm:drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">
                  &gt; ความจริงที่ถูกซ่อนไว้
                </h2>
                
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-[#00FF41]/90">
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

                <div className="mt-8 sm:mt-12 p-4 sm:p-6 border border-[#00FF41]/30 bg-[#00FF41]/5">
                  <p className="italic text-sm sm:text-base md:text-lg leading-relaxed">
                    &quot;...รถบัสเดินทางฝ่าถนน ฝ่าภูมิประเทศที่เป็นดินแดนโล่งกว้างอยู่เกือบสองวัน ในที่สุดก็เข้าสู่วันใหม่ พอพ้นเนินเขา มันก็พาเข้าสู่ภูมิประเทศที่เป็นที่ราบกว้างใหญ่ มีเนินเขาสีเขียวอยู่ไกลสุดสายตา&quot;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews" className="py-12 sm:py-16 md:py-24 z-10 bg-black">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.4)] px-2">
                  [ บันทึกจากผู้เข้าชมระบบ ]
                </h2>
                <p className="text-[#00FF41]/60 tracking-wider sm:tracking-widest uppercase text-[10px] sm:text-xs">REVIEWS COLLECTED FROM THE GRID</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {longReviews.map((review, index) => (
                  <div 
                    key={`long-${index}`}
                    className="group border border-[#00FF41]/30 p-4 sm:p-6 hover:bg-[#00FF41]/5 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-2 text-[9px] sm:text-[10px] text-[#00FF41]/30">
                      REF_ID: 0x{index.toString(16)}
                    </div>
                    
                    <div className="flex items-center mb-3 sm:mb-4 space-x-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} className="text-[#00FF41] text-sm sm:text-base">★</span>
                      ))}
                    </div>
                    
                    <blockquote className="text-[#00FF41]/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed before:content-['\u201C'] after:content-['\u201D']">
                      {review.text}
                    </blockquote>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-[10px] sm:text-xs border-t border-[#00FF41]/20 pt-3 sm:pt-4">
                      <div className="flex items-center space-x-2">
                        <span className="bg-[#00FF41] text-black px-1 font-bold">{review.author.startsWith('@') ? review.author.substring(1, 2).toUpperCase() : review.author.charAt(0)}</span>
                        <span className="font-bold break-all">{review.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-4">
                        <span className="text-[#00FF41]/50 uppercase whitespace-nowrap">{review.platform}</span>
                        {review.platform === "Playground" && (
                          <Link
                            href="/category/southdakota/south-dakota-by-one-thoundsand" 
                            target="_blank" 
                            className="text-[#00FF41] hover:underline whitespace-nowrap"
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
          <section className="py-12 sm:py-16 md:py-24 z-10 border-y border-[#00FF41]/30 bg-[#00FF41]/5">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-8 sm:mb-10 md:mb-12 tracking-tight sm:tracking-tighter px-2">
                UPLOAD YOUR FEEDBACK
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16">
                {/* Email */}
                <div className="border border-[#00FF41] p-6 sm:p-8 space-y-4 sm:space-y-6 flex flex-col items-center">
                  <div className="text-3xl sm:text-4xl">✉</div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase">SECURE_CHANNEL: EMAIL</h3>
                  <p className="text-xs sm:text-sm text-[#00FF41]/70">ส่งรีวิวส่วนตัวผ่านเข้ารหัสอีเมล์</p>
                  <a 
                    href="mailto:story@mail.playground.chidahp.com?subject=รีวิว South Dakota 18%2B&body=สวัสดีครับ/ค่า%0A%0Aผมได้อ่าน South Dakota 18%2B จบแล้ว และอยากแชร์ความรู้สึกดังนี้%3A%0A%0A" 
                    className="w-full py-2.5 sm:py-3 bg-[#00FF41] text-black font-bold uppercase hover:bg-black hover:text-[#00FF41] border border-[#00FF41] transition-all text-sm sm:text-base"
                  >
                    CONNECT
                  </a>
                </div>

                {/* Social */}
                <div className="border border-[#00FF41] p-6 sm:p-8 space-y-4 sm:space-y-6 flex flex-col items-center">
                  <div className="text-3xl sm:text-4xl">#</div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase">BROADCAST: SOCIAL</h3>
                  <p className="text-xs sm:text-sm text-[#00FF41]/70">แชร์ประสบการณ์บนโครงข่าย Social Media</p>
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
                    className="w-full py-2.5 sm:py-3 bg-black text-[#00FF41] font-bold uppercase hover:bg-[#00FF41] hover:text-black border border-[#00FF41] transition-all text-sm sm:text-base"
                  >
                    BROADCAST
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="buy" className="py-16 sm:py-20 md:py-24 lg:py-32 z-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#00FF41]/5 animate-pulse" />
            <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
              <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight sm:tracking-tighter px-2">
                    CHOOSE YOUR PILL
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-[#00FF41]/80 px-2">
                    เปิดหน้าแรกและเจอกับเรื่องราวที่จะเปลี่ยนมุมมองของคุณ
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                  <a 
                    href="https://chidahp.page365.net/products/81069622" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative px-6 sm:px-8 md:px-12 py-4 sm:py-5 overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 border-2 border-[#00FF41] animate-[borderFlow_2s_linear_infinite]" />
                    <span className="relative z-10 text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] group-hover:scale-110 transition-transform inline-block">
                      [ ACQUIRE_KNOWLEDGE ]
                    </span>
                  </a>
                  <div className="text-[10px] sm:text-xs text-[#00FF41]/40 animate-pulse px-2">
                    &gt;&gt; REDIRECTING TO SECURE CHECKOUT &lt;&lt;
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <footer className="py-8 sm:py-10 md:py-12 text-center text-[9px] sm:text-[10px] text-[#00FF41]/30 z-10 relative border-t border-[#00FF41]/10 uppercase tracking-wider sm:tracking-widest px-4">
        © 2026 FINAL BELIEF SYSTEMS. ALL RIGHTS RESERVED. | v2.0.26-ALPHA
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
        @keyframes zoomFade {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); }
          100% { opacity: 0.9; transform: translateY(0) scale(1); }
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-zoom-fade {
          animation: zoomFade 1.5s ease-out forwards;
        }
        .animate-slide-up-fade {
          animation: slideUpFade 2s ease-out 0.5s forwards;
        }
        
        /* iOS Font Rendering Fixes */
        @supports (-webkit-touch-callout: none) {
          .typewriter-ios-fix,
          .typewriter-ios-fix .Typewriter__wrapper,
          .typewriter-ios-fix .Typewriter__cursor {
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            text-rendering: optimizeLegibility !important;
            transform: translateZ(0) !important;
            -webkit-transform: translateZ(0) !important;
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
            perspective: 1000px;
            -webkit-perspective: 1000px;
          }
        }
        
        /* Typewriter Component iOS Fixes */
        .Typewriter__wrapper {
          display: inline-block !important;
          word-break: break-word !important;
          overflow-wrap: break-word !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
          -moz-hyphens: none !important;
          -ms-hyphens: none !important;
          white-space: normal !important;
          line-height: inherit !important;
        }
        
        .Typewriter__cursor {
          display: none !important;
        }
        
        /* Additional iOS Safari fixes */
        @supports (-webkit-touch-callout: none) {
          .typewriter-ios-fix {
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
          }
          
          .typewriter-ios-fix .Typewriter__wrapper span {
            display: inline-block;
            vertical-align: baseline;
          }
        }
      `}</style>
    </div>
  );
}
