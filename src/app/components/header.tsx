



export default function Header() {
  return (
    <section className="relative bg-black text-yellow-400 py-14 text-center border-b border-yellow-500">
      <div className="relative z-10 max-w-2xl mx-auto px-4 animate-fade-in-up">

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm">
          Playground
        </h1>

        <p className="text-[0.65rem] mt-1 text-yellow-600 italic tracking-widest uppercase">
          curated by chidahp
        </p>

        <blockquote className="italic text-yellow-300 text-base md:text-lg mt-6 px-6 max-w-xl mx-auto leading-relaxed">
          “พื้นที่เล่า พื้นที่เล่น พื้นที่ปล่อยของทุกอารมณ์”
        </blockquote>

      </div>
    </section>
  );
}