export async function GET() {
  const channelId = 'UCLBk6yKZHadl1y25Zwu6z_Q';

  const socialCountsUrl = `https://api.socialcounts.org/youtube-live-subscriber-count/${channelId}`;

  try {
    const response = await fetch(socialCountsUrl, { cache: "no-store" });
    if (!response.ok) throw new Error('SocialCounts fetch failed');
    const data = await response.json();

    const subscribers = Number(data.est_sub ?? 0);

    return Response.json({ subscribers });
  } catch (error) {
    return Response.json({ subscribers: 0 });
  }
}
