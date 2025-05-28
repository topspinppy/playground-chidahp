let cachedSubscribers: number | null = null;
let cachedAt: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 นาที

export async function GET() {
  const now = Date.now();
  const channelId = 'UCLBk6yKZHadl1y25Zwu6z_Q';

  // ถ้ามี cache และยังไม่หมดอายุ
  if (cachedSubscribers !== null && now - cachedAt < CACHE_TTL) {
    return Response.json({ subscribers: cachedSubscribers });
  }

  const socialCountsUrl = `https://api.socialcounts.org/youtube-live-subscriber-count/${channelId}`;

  try {
    // 1. พยายาม fetch จาก SocialCounts ก่อน
    const response = await fetch(socialCountsUrl, { cache: "no-store" });
    if (!response.ok) throw new Error('SocialCounts fetch failed');
    const data = await response.json();

    const subscribers = Number(data.est_sub ?? 0);

    return Response.json({ subscribers });
  } catch (error) {
    return Response.json({ subscribers: 0 });
  }
}
