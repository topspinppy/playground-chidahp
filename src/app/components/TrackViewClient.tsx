"use client";

import { useTrackView } from "@/app/hooks/useTrackView";

export default function TrackViewClient({ postId }: { postId: string | number }) {
  useTrackView(postId); // ✅ ถูกต้อง
  return null;
}