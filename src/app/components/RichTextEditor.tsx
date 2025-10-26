'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {TextStyle} from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  Code, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  Palette,
  Highlighter
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  authToken?: string;
}

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = "เขียนเนื้อหาบทความที่นี่...",
  className = "",
  authToken
}: RichTextEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
        placeholder: placeholder,
      },
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const addLink = () => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkDialog(false);
    }
  };

  const addImage = () => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageDialog(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_data: base64,
          filename: file.name,
          title: file.name,
          alt_text: file.name
        }),
      });

      console.log(response);

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      
      if (data.url && editor) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    } else {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
    }
  };

  if (!editor) {
    return null;
  }

  const MenuButton = ({ 
    onClick, 
    isActive = false, 
    children, 
    title 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode; 
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600'
      }`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div className={`border border-yellow-300 rounded-lg focus-within:ring-2 focus-within:ring-yellow-500 focus-within:border-yellow-500 ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-yellow-200 p-2 flex flex-wrap gap-1 bg-gray-50">
        {/* Text Formatting */}
        <div className="flex border-r border-gray-200 pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="ตัวหนา"
          >
            <Bold className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="ตัวเอียง"
          >
            <Italic className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="ขีดเส้นใต้"
          >
            <UnderlineIcon className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="ขีดฆ่า"
          >
            <Strikethrough className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="โค้ด"
          >
            <Code className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Headings */}
        <div className="flex border-r border-gray-200 pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="หัวข้อ 1"
          >
            <Heading1 className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="หัวข้อ 2"
          >
            <Heading2 className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="หัวข้อ 3"
          >
            <Heading3 className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Lists */}
        <div className="flex border-r border-gray-200 pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="รายการแบบจุด"
          >
            <List className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="รายการแบบตัวเลข"
          >
            <ListOrdered className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="อ้างอิง"
          >
            <Quote className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Alignment */}
        <div className="flex border-r border-gray-200 pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="จัดซ้าย"
          >
            <AlignLeft className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="จัดกลาง"
          >
            <AlignCenter className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="จัดขวา"
          >
            <AlignRight className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            title="จัดเต็ม"
          >
            <AlignJustify className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Links and Images */}
        <div className="flex border-r border-gray-200 pr-2 mr-2">
          <MenuButton
            onClick={() => setShowLinkDialog(true)}
            isActive={editor.isActive('link')}
            title="เพิ่มลิงก์"
          >
            <LinkIcon className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => setShowImageDialog(true)}
            title="เพิ่มรูปภาพจาก URL"
          >
            <ImageIcon className="h-4 w-4" />
          </MenuButton>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <MenuButton
              onClick={() => {}}
              title={isUploading ? "กำลังอัปโหลด..." : "อัปโหลดรูปภาพ"}
            >
              {isUploading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </MenuButton>
          </div>
        </div>

        {/* Colors */}
        <div className="flex border-r border-gray-200 pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().setColor('#ef4444').run()}
            isActive={editor.isActive('textStyle', { color: '#ef4444' })}
            title="สีแดง"
          >
            <Palette className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setHighlight({ color: '#fef08a' }).run()}
            isActive={editor.isActive('highlight')}
            title="ไฮไลท์"
          >
            <Highlighter className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Undo/Redo */}
        <div className="flex">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            title="ย้อนกลับ"
          >
            <Undo className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            title="ทำซ้ำ"
          >
            <Redo className="h-4 w-4" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[200px]">
        <EditorContent 
          editor={editor} 
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4"
        />
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">เพิ่มลิงก์</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowLinkDialog(false);
                  setLinkUrl('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={addLink}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                เพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">เพิ่มรูปภาพ</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowImageDialog(false);
                  setImageUrl('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                เพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
