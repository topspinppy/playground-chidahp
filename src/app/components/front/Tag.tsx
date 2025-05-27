import { event } from 'nextjs-google-analytics'
import { Node } from "@/types/types";
import Link from "next/link";

export default function Tag(props: { nodes: Node[] }) {
  const { nodes } = props;

  return (
    <>
      {nodes?.length > 0 && (
        <div className="mt-12">
          <h4 className="text-sm font-semibold text-yellow-600 mb-2">
            TAGS
          </h4>
          <ul className="flex flex-wrap gap-2">
            {nodes.map((tag: Node) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                onClick={() =>
                  event('click_tag', {
                    category: 'Interaction',
                    label: tag.name,
                  })
                }
                className="bg-yellow-700 hover:bg-yellow-600 text-yellow-100 text-xs font-medium px-3 py-1 rounded-full transition"
              >
                {tag.name}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
