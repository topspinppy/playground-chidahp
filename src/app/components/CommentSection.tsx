import CommentForm from "./CommentForm"
import CommentListClient from "./CommentListClient"

interface Comment {
  id?: number
  name: string
  content: string
  date: string
}

interface RawComment {
  id: number
  author_name: string
  content?: {
    rendered?: string
  }
  date: string
}

function stripHtmlTags(html: string): string {
  return html.replace(/<\/?[^>]+(>|$)/g, "")
}

function formatThaiDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  })
}

function transformComment(rawComment: RawComment): Comment & { dateObj: Date } {
  return {
    id: rawComment.id,
    name: rawComment.author_name,
    content: stripHtmlTags(rawComment.content?.rendered || ""),
    date: formatThaiDateTime(rawComment.date),
    dateObj: new Date(rawComment.date),
  }
}

export default async function CommentSection({ postId }: { postId: number }) {
  try {
    const res = await fetch(
      `${process.env.WEB_URL}/api/comment?post=${postId}&per_page=20`,
      {
        next: { revalidate: 60 } // Cache 1 นาที
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch comments: ${res.status}`)
    }

    const rawComments: RawComment[] = await res.json()
    const comments: Comment[] = rawComments
      .map(transformComment)
      .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime()) // เรียงจากใหม่ -> เก่า
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ dateObj, ...comment }) => comment) // ลบ dateObj ก่อน return

    return (
      <section className="mt-12">
        <CommentForm postId={postId} />
        <CommentListClient comments={comments} />
      </section>
    )
  } catch (error) {
    console.error("Error fetching comments:", error)
    return (
      <section className="mt-12">
        <CommentForm postId={postId} />
        <div className="text-red-500 p-4">
          ไม่สามารถโหลดความคิดเห็นได้ กรุณาลองใหม่อีกครั้ง
        </div>
      </section>
    )
  }
}