"use client"

interface Comment {
  id?: number
  name: string
  content: string
  date: string
}

export default function CommentListClient({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-yellow-50 border border-yellow-200 p-4 rounded shadow-sm"
        >
          <p className="text-sm font-semibold text-yellow-800">{comment.name}</p>
          <p className="text-sm text-yellow-700 mt-1">{comment.content}</p>
          <p className="text-xs text-yellow-500 mt-2">{comment.date}</p>
        </div>
      ))}
    </div>
  )
}
