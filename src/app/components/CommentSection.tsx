import CommentForm from "./CommentForm"
import CommentListClient from "./CommentListClient"

interface Comment {
  id?: number
  name: string
  content: string
  date: string
}

export default async function CommentSection({ postId }: { postId: number }) {
  const res = await fetch(
    `http://localhost:3000/api/comment?post=${postId}&per_page=20`
  )

  const data = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const comments: Comment[] = data
  .map((c: any) => ({
    id: c.id,
    name: c.author_name,
    content: c.content?.rendered?.replace(/<\/?[^>]+(>|$)/g, ""),
    date: new Date(c.date).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    dateObj: new Date(c.date), // เพิ่มไว้ใช้สำหรับ sort
  }))
  .sort((a: { dateObj: { getTime: () => number } }, b: { dateObj: { getTime: () => number } }) => b.dateObj.getTime() - a.dateObj.getTime()) // เรียงจากใหม่ -> เก่า
  .map(({ ...rest }) => rest) // ตัด dateObj ทิ้งก่อนใช้จริง

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-yellow-600 mb-4">💬 แสดงความคิดเห็น</h2>
      <CommentForm postId={postId} />
      <CommentListClient comments={comments} />
    </section>
  )
}
