export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />

      {/* Message */}
      <p className="text-yellow-700 text-sm italic opacity-80">
        กำลังโหลดเรื่องซน ๆ ... <span className="font-medium">รอแป๊บนะครับ ☁️</span>
      </p>
    </div>
  );
}