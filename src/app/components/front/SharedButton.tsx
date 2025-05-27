'use client'

import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
  FacebookIcon,
  // TwitterIcon,
  XIcon,
  LineIcon
} from 'react-share'

export default function ShareButtons({ url, title }: { url: string, title: string }) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <XIcon size={32} round />
      </TwitterShareButton>

      <LineShareButton url={url} title={title}>
        <LineIcon size={32} round />
      </LineShareButton>
    </div>
  )
}