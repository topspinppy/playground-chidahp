import { useMemo } from "react";
import DOMPurify from 'isomorphic-dompurify';


interface WordPressContentProps {
  content: string;
  className?: string;
  contentType?: 'gutenberg' | 'classic' | 'prose';
  enableSantization?: boolean;
}


export default function WordPressContent(props: WordPressContentProps) {
  const { content, className, contentType = 'gutenberg', enableSantization = true } = props;

  // Base article styles
  const articleClassName = `
    [&_iframe]:w-full
    [&_iframe]:aspect-video
    [&_iframe]:max-w-full
    [&_iframe]:mx-auto
    [&_iframe]:rounded-lg
    [&_iframe]:shadow-sm
  `;

  // Gutenberg Block Styles
  const gutenbergClassName = `
    wp-content text-gray-700 leading-relaxed
    
    // WordPress Block Editor Styles
    [&_.wp-block-paragraph]:text-gray-700 [&_.wp-block-paragraph]:leading-relaxed [&_.wp-block-paragraph]:mb-4
    [&_.wp-block-heading]:text-yellow-700 [&_.wp-block-heading]:font-bold [&_.wp-block-heading]:mb-4
    [&_.wp-block-quote]:border-l-4 [&_.wp-block-quote]:border-yellow-500 [&_.wp-block-quote]:pl-6 [&_.wp-block-quote]:italic [&_.wp-block-quote]:text-gray-600 [&_.wp-block-quote]:bg-yellow-50/50 [&_.wp-block-quote]:py-4 [&_.wp-block-quote]:my-6 [&_.wp-block-quote]:rounded-r-lg
    [&_.wp-block-list]:text-gray-700 [&_.wp-block-list]:space-y-2 [&_.wp-block-list]:pl-6
    [&_.wp-block-list_li]:mb-1 [&_.wp-block-list_li]:leading-relaxed
    
    // Image Blocks
    [&_.wp-block-image]:my-6 [&_.wp-block-image]:text-center
    [&_.wp-block-image_img]:rounded-lg [&_.wp-block-image_img]:shadow-md [&_.wp-block-image_img]:max-w-full [&_.wp-block-image_img]:h-auto [&_.wp-block-image_img]:mx-auto
    [&_.wp-block-image_figcaption]:text-sm [&_.wp-block-image_figcaption]:text-gray-500 [&_.wp-block-image_figcaption]:mt-2 [&_.wp-block-image_figcaption]:text-center [&_.wp-block-image_figcaption]:italic
    
    // Gallery Block
    [&_.wp-block-gallery]:my-6
    [&_.wp-block-gallery_figure]:margin-0
    [&_.blocks-gallery-grid]:grid [&_.blocks-gallery-grid]:gap-4
    [&_.blocks-gallery-grid.columns-2]:grid-cols-2
    [&_.blocks-gallery-grid.columns-3]:grid-cols-3
    [&_.blocks-gallery-grid.columns-4]:grid-cols-4
    
    // Code Blocks
    [&_.wp-block-code]:bg-gray-900 [&_.wp-block-code]:text-gray-100 [&_.wp-block-code]:border [&_.wp-block-code]:border-gray-700 [&_.wp-block-code]:rounded-lg [&_.wp-block-code]:p-4 [&_.wp-block-code]:font-mono [&_.wp-block-code]:text-sm [&_.wp-block-code]:overflow-x-auto [&_.wp-block-code]:my-6
    [&_.wp-block-preformatted]:bg-gray-100 [&_.wp-block-preformatted]:border [&_.wp-block-preformatted]:border-gray-300 [&_.wp-block-preformatted]:rounded-lg [&_.wp-block-preformatted]:p-4 [&_.wp-block-preformatted]:font-mono [&_.wp-block-preformatted]:text-sm [&_.wp-block-preformatted]:overflow-x-auto [&_.wp-block-preformatted]:my-6
    
    // Table Block
    [&_.wp-block-table]:my-6 [&_.wp-block-table]:overflow-x-auto [&_.wp-block-table]:shadow-sm [&_.wp-block-table]:rounded-lg [&_.wp-block-table]:border [&_.wp-block-table]:border-gray-200
    [&_.wp-block-table_table]:w-full [&_.wp-block-table_table]:border-collapse [&_.wp-block-table_table]:bg-white
    [&_.wp-block-table_thead]:bg-gray-50
    [&_.wp-block-table_th]:border [&_.wp-block-table_th]:border-gray-300 [&_.wp-block-table_th]:px-4 [&_.wp-block-table_th]:py-3 [&_.wp-block-table_th]:font-semibold [&_.wp-block-table_th]:text-left [&_.wp-block-table_th]:text-gray-900
    [&_.wp-block-table_td]:border [&_.wp-block-table_td]:border-gray-300 [&_.wp-block-table_td]:px-4 [&_.wp-block-table_td]:py-3 [&_.wp-block-table_td]:text-gray-700
    
    // Columns Block
    [&_.wp-block-columns]:flex [&_.wp-block-columns]:flex-wrap [&_.wp-block-columns]:gap-6 [&_.wp-block-columns]:my-6
    [&_.wp-block-column]:flex-1 [&_.wp-block-column]:min-w-0
    [&_.wp-block-column]:break-inside-avoid
    
    // Group Block
    [&_.wp-block-group]:my-6
    [&_.wp-block-group.has-background]:p-6 [&_.wp-block-group.has-background]:rounded-lg
    
    // Separator Block
    [&_.wp-block-separator]:border-0 [&_.wp-block-separator]:border-t-2 [&_.wp-block-separator]:border-gray-300 [&_.wp-block-separator]:my-8 [&_.wp-block-separator]:w-full
    [&_.wp-block-separator.is-style-wide]:border-t-4 [&_.wp-block-separator.is-style-wide]:border-yellow-500
    [&_.wp-block-separator.is-style-dots]:border-0 [&_.wp-block-separator.is-style-dots]:text-center [&_.wp-block-separator.is-style-dots]:text-2xl [&_.wp-block-separator.is-style-dots]:text-gray-400
    
    // Spacer Block
    [&_.wp-block-spacer]:my-4
    
    // Media & Text Block
    [&_.wp-block-media-text]:flex [&_.wp-block-media-text]:gap-6 [&_.wp-block-media-text]:items-center [&_.wp-block-media-text]:my-8 [&_.wp-block-media-text]:bg-gray-50 [&_.wp-block-media-text]:p-6 [&_.wp-block-media-text]:rounded-lg
    [&_.wp-block-media-text.has-media-on-the-right]:flex-row-reverse
    [&_.wp-block-media-text__media]:flex-shrink-0 [&_.wp-block-media-text__media]:max-w-xs [&_.wp-block-media-text__media]:rounded-lg [&_.wp-block-media-text__media]:overflow-hidden
    [&_.wp-block-media-text__content]:flex-1
    
    // Button Block
    [&_.wp-block-button]:my-4
    [&_.wp-block-button__link]:inline-block [&_.wp-block-button__link]:px-6 [&_.wp-block-button__link]:py-3 [&_.wp-block-button__link]:bg-yellow-500 [&_.wp-block-button__link]:text-white [&_.wp-block-button__link]:font-semibold [&_.wp-block-button__link]:rounded-lg [&_.wp-block-button__link]:no-underline [&_.wp-block-button__link]:transition-colors [&_.wp-block-button__link]:shadow-sm
    hover:[&_.wp-block-button__link]:bg-yellow-600 hover:[&_.wp-block-button__link]:shadow-md
    
    // Embed Blocks
    [&_.wp-block-embed]:my-6 [&_.wp-block-embed]:rounded-lg [&_.wp-block-embed]:overflow-hidden [&_.wp-block-embed]:shadow-sm
    [&_.wp-block-embed__wrapper]:relative [&_.wp-block-embed__wrapper]:aspect-video
    [&_.wp-block-embed_iframe]:absolute [&_.wp-block-embed_iframe]:inset-0 [&_.wp-block-embed_iframe]:w-full [&_.wp-block-embed_iframe]:h-full
    
    // Alignment Classes
    [&_.alignleft]:float-left [&_.alignleft]:mr-6 [&_.alignleft]:mb-4 [&_.alignleft]:max-w-sm
    [&_.alignright]:float-right [&_.alignright]:ml-6 [&_.alignright]:mb-4 [&_.alignright]:max-w-sm
    [&_.aligncenter]:mx-auto [&_.aligncenter]:text-center [&_.aligncenter]:block [&_.aligncenter]:clear-both
    [&_.alignwide]:w-full [&_.alignwide]:max-w-none [&_.alignwide]:my-8
    [&_.alignfull]:w-screen [&_.alignfull]:max-w-none [&_.alignfull]:ml-[calc(-50vw+50%)] [&_.alignfull]:mr-[calc(-50vw+50%)] [&_.alignfull]:my-8
    
    // Size Classes
    [&_.size-large]:max-w-2xl [&_.size-large]:h-auto
    [&_.size-medium]:max-w-lg [&_.size-medium]:h-auto
    [&_.size-small]:max-w-xs [&_.size-small]:h-auto
    [&_.size-thumbnail]:max-w-[150px] [&_.size-thumbnail]:h-auto
    
    // Classic Editor Fallback
    [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0
    [&_h1]:text-yellow-700 [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-3xl [&_h1]:leading-tight
    [&_h2]:text-yellow-700 [&_h2]:font-bold [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:leading-tight
    [&_h3]:text-yellow-700 [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:leading-snug
    [&_h4]:text-yellow-700 [&_h4]:font-bold [&_h4]:mb-3 [&_h4]:text-lg [&_h4]:leading-snug
    [&_h5]:text-yellow-700 [&_h5]:font-bold [&_h5]:mb-3 [&_h5]:text-base [&_h5]:leading-snug
    [&_h6]:text-yellow-700 [&_h6]:font-bold [&_h6]:mb-2 [&_h6]:text-sm [&_h6]:leading-snug
    [&_a]:text-yellow-600 [&_a]:font-medium [&_a]:no-underline [&_a]:transition-colors hover:[&_a]:text-yellow-700 hover:[&_a]:underline
    [&_strong]:text-gray-900 [&_strong]:font-semibold
    [&_em]:text-gray-700 [&_em]:italic
    [&_ul]:text-gray-700 [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:list-disc
    [&_ol]:text-gray-700 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal
    [&_li]:mb-1 [&_li]:leading-relaxed
    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-sm
    [&_blockquote]:border-l-4 [&_blockquote]:border-yellow-500 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:bg-yellow-50/50 [&_blockquote]:py-4 [&_blockquote]:my-6 [&_blockquote]:rounded-r-lg
    [&_hr]:border-0 [&_hr]:border-t-2 [&_hr]:border-gray-300 [&_hr]:my-8
    [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm [&_pre]:my-6
    [&_code]:bg-yellow-100 [&_code]:text-yellow-800 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm
  `;

  // Classic WordPress Content Styles
  const classicClassName = `
    wp-content text-gray-700 leading-relaxed
    [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
    [&_h1]:text-yellow-700 [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-2xl
    [&_h2]:text-yellow-700 [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:text-xl
    [&_h3]:text-yellow-700 [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:text-lg
    [&_a]:text-yellow-600 hover:[&_a]:text-yellow-700 [&_a]:transition-colors [&_a]:no-underline hover:[&_a]:underline
    [&_strong]:text-gray-900 [&_em]:text-gray-700
    [&_ul]:text-gray-700 [&_ol]:text-gray-700 [&_ul]:space-y-1 [&_ol]:space-y-1 [&_ul]:pl-6 [&_ol]:pl-6
    [&_li]:mb-1
    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-sm
    [&_blockquote]:border-l-4 [&_blockquote]:border-yellow-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:bg-yellow-50/50 [&_blockquote]:py-2 [&_blockquote]:my-4
  `;

  // Prose Styles (for custom content)
  const proseClassName = `
    prose prose-yellow max-w-none leading-relaxed text-gray-800
    prose-headings:text-yellow-700 prose-headings:font-bold
    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
    prose-a:text-yellow-600 hover:prose-a:text-yellow-700 prose-a:transition-colors prose-a:no-underline hover:prose-a:underline
    prose-strong:text-gray-900 prose-em:text-gray-700
    prose-code:text-yellow-700 prose-code:bg-yellow-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
    prose-blockquote:border-l-yellow-500 prose-blockquote:text-gray-600 prose-blockquote:bg-yellow-50/50 prose-blockquote:py-2
    prose-ul:text-gray-700 prose-ol:text-gray-700
    prose-li:mb-1
  `;


    // Process content based on type
  const processedContent = useMemo(() => {
    if (!content) return '';
    
    let processedHtml = content;
    
    // Sanitize if enabled
    if (enableSantization) {
      processedHtml = DOMPurify.sanitize(processedHtml, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src']
      });
    }

    // Additional processing for better compatibility
    if (contentType === 'gutenberg') {
      // Fix common Gutenberg block issues
      processedHtml = processedHtml
        // Add missing classes for better styling
        .replace(/<p(?![^>]*class)/g, '<p class="wp-block-paragraph"')
        .replace(/<blockquote(?![^>]*class)/g, '<blockquote class="wp-block-quote"')
        .replace(/<ul(?![^>]*class)/g, '<ul class="wp-block-list"')
        .replace(/<ol(?![^>]*class)/g, '<ol class="wp-block-list"')
        // Fix image alignment
        .replace(/class="([^"]*)?aligncenter([^"]*)?"/g, 'class="$1aligncenter$2" style="display: block; margin: 0 auto;"')
        // Handle figure captions
        .replace(/<figcaption>/g, '<figcaption class="wp-block-image__caption">');
    }

    return processedHtml;
  }, [content, contentType, enableSantization]);

  const getContentClassName = () => {
    switch (contentType) {
      case 'prose':
        return proseClassName;
      case 'classic':
        return classicClassName;
      case 'gutenberg':
      default:
        return gutenbergClassName;
    }
  };

  const combinedClassName = [
    getContentClassName(),
    articleClassName,
    className
  ].join(' ');

  return (
    <article
      className={combinedClassName}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}