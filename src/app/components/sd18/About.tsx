



export default function About() {
  return (
    <section
      id="about"
      className="relative py-36 bg-gradient-to-b from-[#0b0c16] via-[#1a0f2a] to-[#12071f] overflow-hidden"
    >
      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c16]/80 via-[#1a0f2a]/50 to-transparent animate-gradient-flow"></div>

      {/* Floating Glow */}
      <div className="absolute -top-32 -left-32 h-96 w-96 bg-fuchsia-600/25 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 bg-purple-500/20 blur-3xl animate-pulse"></div>

      {/* Content */}
      <div className="relative container mx-auto max-w-4xl px-6 md:px-10 text-center z-10">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent leading-snug animate-fade-in-up">
          เรื่องราว ‘Work and Travel’
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-gray-300 animate-fade-in-up delay-100 mb-10">
          จากผู้เขียน <span className="italic">“1 ปีกับชีวิตที่ผมอยู่ในอเมริกา”</span>
        </p>

        {/* Quote */}
        <div className="mt-12 relative">
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-9xl text-fuchsia-300/5 font-serif select-none">
            “
          </span>
          <p className="relative text-xl sm:text-2xl text-gray-100 font-medium leading-loose max-w-2xl mx-auto animate-fade-in-up delay-200 mb-10">
            ...รถบัสเดินทางฝ่าถนน ฝ่าภูมิประเทศที่เป็นดินแดนโล่งกว้างอยู่เกือบสองวัน
            ในที่สุดก็เข้าสู่วันใหม่ พอพ้นเนินเขา มันก็พาเข้าสู่ภูมิประเทศที่เป็นที่ราบกว้างใหญ่
            มีเนินเขาสีเขียวอยู่ไกลสุดสายตา
          </p>
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-9xl text-fuchsia-300/5 font-serif select-none">
            “
          </span>
        </div>

        {/* Story */}
        <div className="mt-10 space-y- text-gray-200 text-lg sm:text-xl leading-loose max-w-4xl mx-auto animate-fade-in-up delay-400">
          <p>
            กูเก็บไดอารี่ หลังสรุปความคิดลงสมุดว่ากูคิดแล้วว่ากูจะใช้ชีวิตที่นี่ยังไง กูจะสนุกให้สุด ลืมทุกอย่างที่ไทย
          </p>
          <p>
            พอกันที ไอ้ชีวิตที่ต้องกลัวแต่การทำให้ถูก ห้ามโน่นห้ามนี่
            กูบอกตัวเองว่าจะใช้ชีวิตให้สุด เหี้ยให้สมใจ
          </p>
          <p>
            ให้คุ้มกับการเป็นครั้งสุดท้าย ก่อนที่กูจะต้องไปเผชิญโลกแห่งความจริง
          </p>
        </div>
      </div>
    </section>
  )
}