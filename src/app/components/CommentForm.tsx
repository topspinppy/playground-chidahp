"use client"

import { useState } from "react"

export default function CommentForm({
  postId,
}: {
  postId: number
}) {
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!name || !content) return

    await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post: postId,
        author_name: name,
        author_email: "dummy@chidahp.com",
        content: content,
      }),
    })

    setName("")
    setContent("")
    setSubmitted(true)
  }

  return (
    <div className="bg-white border border-yellow-300 p-4 rounded-lg shadow-sm space-y-4 mb-8">
      <p className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded-md border border-yellow-200">
        ✨ ความคิดเห็นของคุณจะปรากฏหลังจากได้รับการตรวจสอบจากทีมงาน เพื่อรักษาบรรยากาศอบอุ่นในสนามเด็กเล่นแห่งนี้นะค้าบ ☁️
      </p>

      <input
        type="text"
        placeholder="ชื่อของคุณ"
        className="w-full px-4 py-2 border border-yellow-400 rounded-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        rows={4}
        placeholder="พิมพ์คอมเมนต์ของคุณที่นี่..."
        className="w-full px-4 py-2 border border-yellow-400 rounded-md"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!name || !content}
      >
        ส่งคอมเมนต์
      </button>

      {submitted && (
        <p className="text-green-700 text-sm mt-2">
          ✅ คอมเมนต์ของคุณถูกส่งเรียบร้อยแล้ว กำลังรอการอนุมัติจากทีมงานค้าบ!
        </p>
      )}
    </div>
  )
}
