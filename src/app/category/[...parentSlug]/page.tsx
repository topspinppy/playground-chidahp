import { notFound } from 'next/navigation';
import MainCategory from './components/page/MainCategory';
import Post from './components/page/Post';
import { getCategoryDetail, getCategoriesAll, getSinglePost } from '@/lib/api';

export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
  const { parentSlug } = await params;

  const [slugLv1, slugLv2, slugLv3] = parentSlug;
  const childCategoriesRaw = await getCategoriesAll();
  const childCategories = childCategoriesRaw
    .filter((category) => category.parent !== null)
    .map((category) => category.slug);

  if (slugLv1 && !slugLv2) {
    const slug = await getCategoryDetail(slugLv1);
    return {
      title: `หมวดหมู่: ${slug.name}`,
      description: slug.description,
      keywords: [
        slug.slug,
        'หมวดหมู่',
        'ชูโล่',
        'นักเรียนชูโล่',
        'โรงเรียนชูโล่วิทยาคม',
        'โรงเรียนชูโล่',
        'สนามเด็กเล่นโรงเรียนชูโล่',
        'สนามเด็กเล่นชูโล่',
        'พอดแคสต์แรงบันดาลใจ',
        'Podcast ภาษาไทย',
        'Podcast เรื่องชีวิต',
        'ฟังพอดแคสต์ฟรี',
        'Podcast นักเขียน',
        'เรื่องเล่าพัฒนาตัวเอง',
        'ชีวิตวัยรุ่น',
        'เสียงจากใจ',
        'บันทึกชีวิต',
        'Chidahp Podcast',
        'podcast แรงบันดาลใจไทย',
        'เล่าเรื่องชีวิตจริง'
      ].join(', '),
      openGraph: {
        title: slug.name,
        description: slug.description,
        type: 'website',
        url: `https://playground.chidahp.com/category/${slugLv1}`,
        images: [
          {
            url: `https://playground.chidahp.com/api/og?title=${slug.name}&author=นักเรียนชูโล่`,
            width: 1200,
            height: 630,
            alt: slug.slug,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: slug.name,
        description: slug.description,
        images: [
          `https://playground.chidahp.com/api/og?title=${slug.name}&author=นักเรียนชูโล่`,
        ],
      },
      alternates: {
        canonical: `https://playground.chidahp.com/category/${slugLv1}`,
      },
    };
  }

  if (slugLv1 && slugLv2 && !slugLv3) {
    if (childCategories.includes(slugLv2)) {
      const slug = await getCategoryDetail(slugLv2);
      return {
        title: `หมวดหมู่: ${slugLv1} / ${slugLv2}`,
        description: slug.description,
        keywords: [
          slug.slug,
          'หมวดหมู่',
          'ชูโล่',
          'นักเรียนชูโล่',
          'โรงเรียนชูโล่วิทยาคม',
          'โรงเรียนชูโล่',
          'สนามเด็กเล่นโรงเรียนชูโล่',
          'สนามเด็กเล่นชูโล่',
          'พอดแคสต์แรงบันดาลใจ',
          'Podcast ภาษาไทย',
          'Podcast เรื่องชีวิต',
          'ฟังพอดแคสต์ฟรี',
          'Podcast นักเขียน',
          'เรื่องเล่าพัฒนาตัวเอง',
          'ชีวิตวัยรุ่น',
          'เสียงจากใจ',
          'บันทึกชีวิต',
          'Chidahp Podcast',
          'podcast แรงบันดาลใจไทย',
          'เล่าเรื่องชีวิตจริง'
        ].join(', '),
        openGraph: {
          title: `${slug.name}`,
          description: slug.description,
          type: 'website',
          url: `https://playground.chidahp.com/category/${slugLv1}/${slugLv2}`,
          images: [
            { 
              url: `https://playground.chidahp.com/api/og?title=หมวดหมู่ - ${slugLv1} / ${slugLv2}&author=นักเรียนชูโล่`,
              width: 1200,
              height: 630,
              alt: slug.slug,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${slug.name}`,
          description: slug.description,
          images: [
            {
              url: `https://playground.chidahp.com/api/og?title=หมวดหมู่ - ${slugLv1} / ${slugLv2}&author=นักเรียนชูโล่`,
              width: 1200,
              height: 630,
              alt: slug.slug,
            }
          ],
        },
        alternates: {
          canonical: `https://playground.chidahp.com/category/${slugLv1}/${slugLv2}`,
        },
      }
    } else {
      // If slugLv2 is not a child category, treat it as a post
      const slug = await getSinglePost(slugLv2, slugLv1);
      return {
        title: slug.title ?? '',
        description: slug.excerpt.replace(/<[^>]*>/g, ''),
        keywords: [
          slug.slug,
          'หมวดหมู่',
          'ชูโล่',
          'นักเรียนชูโล่',
          'โรงเรียนชูโล่วิทยาคม',
          'โรงเรียนชูโล่',
          'สนามเด็กเล่นโรงเรียนชูโล่',
          'สนามเด็กเล่นชูโล่',
          'พอดแคสต์แรงบันดาลใจ',
          'Podcast ภาษาไทย',
          'Podcast เรื่องชีวิต',
          'ฟังพอดแคสต์ฟรี',
          'Podcast นักเขียน',
          'เรื่องเล่าพัฒนาตัวเอง',
          'ชีวิตวัยรุ่น',
          'เสียงจากใจ',
          'บันทึกชีวิต',
          'Chidahp Podcast',
          'podcast แรงบันดาลใจไทย',
          'เล่าเรื่องชีวิตจริง'
        ].join(', '),
        openGraph: {
          title: slug.title,
          description: slug.excerpt.replace(/<[^>]*>/g, ''),
          type: 'website',
          url: `https://playground.chidahp.com/category/${slugLv1}/${slugLv2}`,
          images: [
            {
              url: `https://playground.chidahp.com/api/og?title=${slug.name}&author=นักเรียนชูโล่`,
              width: 1200,
              height: 630,
              alt: slug.title,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: slug.title,
          description: slug.excerpt.replace(/<[^>]*>/g, ''),
          images: [
            `https://playground.chidahp.com/api/og?title=${slug.name}&author=นักเรียนชูโล่`,
          ],
        },
        alternates: {
          canonical: `https://playground.chidahp.com/category/${slugLv1}/${slugLv2}/${slugLv3}`,
        },
      };
    }
  }

  if (slugLv1 && slugLv2 && slugLv3) {
    const slug = await getSinglePost(slugLv3, slugLv2);

    return {
      title: slug.title,
      description: slug.excerpt.replace(/<[^>]*>/g, ''),
      keywords: [
        slug.slug,
        'หมวดหมู่',
        'ชูโล่',
        'นักเรียนชูโล่',
        'โรงเรียนชูโล่วิทยาคม',
        'โรงเรียนชูโล่',
        'สนามเด็กเล่นโรงเรียนชูโล่',
        'สนามเด็กเล่นชูโล่',
        'พอดแคสต์แรงบันดาลใจ',
        'Podcast ภาษาไทย',
        'Podcast เรื่องชีวิต',
        'ฟังพอดแคสต์ฟรี',
        'Podcast นักเขียน',
        'เรื่องเล่าพัฒนาตัวเอง',
        'ชีวิตวัยรุ่น',
        'เสียงจากใจ',
        'บันทึกชีวิต',
        'Chidahp Podcast',
        'podcast แรงบันดาลใจไทย',
        'เล่าเรื่องชีวิตจริง'
      ].join(', '),
      openGraph: {
        title: slug.title,
        description: slug.excerpt.replace(/<[^>]*>/g, ''),
        type: 'article',
        url: `https://playground.chidahp.com/category/${slugLv1}/${slugLv2}/${slugLv3}`,
        images: [
          {
            url: `https://playground.chidahp.com/api/og?title=${slug.title}&author=${slug.author.node.name}`,
            width: 1200,
            height: 630,
            alt: slug.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: slug.title,
        description: slug.excerpt.replace(/<[^>]*>/g, ''),
        images: [
          `https://playground.chidahp.com/api/og?title=${slug.title}&author=${slug.author.node.name}`,
        ],
      },
      alternates: {
        canonical: `https://playground.chidahp.com/category/${slugLv1}/${slugLv2}/${slugLv3}`,
      },
    };
  }

  // fallback กรณีผิดปกติ
  return {
    title: 'หมวดหมู่: ไม่สามารถระบุได้',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const childCategoriesRaw = await getCategoriesAll();
  const childCategories = childCategoriesRaw
    .filter((category) => category.parent !== null)
    .map((category) => category.slug);

  const { parentSlug } = await params;
  if (!parentSlug || parentSlug.length === 0) return notFound();

  const [mainSlug, second] = parentSlug;

  if (parentSlug.length === 1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <MainCategory slug={mainSlug} />;
  }
  if (parentSlug.length === 2) {
    if (childCategories.includes(second)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <MainCategory slug={second} />;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <Post parentSlug={parentSlug} />;
    }
  }

  if (parentSlug.length === 3) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Post parentSlug={parentSlug} third={true} />;
  }

  return notFound();
}