import { notFound } from 'next/navigation';
import MainCategory from './components/page/MainCategory';
import SubCategory from './components/page/SubCategory';
import Post from './components/page/Post';
import { getCategoriesAll } from '@/lib/api';

export const dynamic = 'force-dynamic';

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
      return <SubCategory slug={second} />;
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