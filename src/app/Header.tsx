import Head from 'next/head'

// app/head.tsx
export default function Header() {
  return (
    <Head>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8360416910031647"
        crossOrigin="anonymous"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MediaOrganization",
            "name": "โรงเรียนชูโล่วิทยาคม",
            "description": "Playground คือสนามทดลองข่าว บทความ Podcast และเรื่องซน ๆ จากจักรวาลชี้ดาบ - จัดทำโดย นักเรียนชูโล่วิทยาคม",
            "alternativeName": "Playground by Chidahp",
            "url": "https://playground.chidahp.com",
            "sameAs": [
              "https://www.instagram.com/chidahp",
              "https://www.youtube.com/@chidahp",
              "https://www.facebook.com/CHIDAHP"
            ],
            "logo": {
              "@type": "ImageObject",
              "url": "https://playground.chidahp.com/chidahp.png",
              "width": 512,
              "height": 512
            },
            "parentOrganization": {
              "@type": "Organization",
              "name": "สำนักพิมพ์ชี้ดาบ",
              "url": "https://www.chidahp.com"
            }
          })
        }}
      />
    </Head>
  );
}