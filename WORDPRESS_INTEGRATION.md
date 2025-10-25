# 🔗 WordPress Integration Guide

## 🎯 ระบบใหม่: WordPress First, Supabase Second

### **🔄 Flow การทำงาน:**
1. **สร้างบทความที่ WordPress ก่อน** - ใช้ API endpoint จริง
2. **ถ้า WordPress สำเร็จ** - บันทึกลง Supabase
3. **ถ้า WordPress ล้มเหลว** - ไม่บันทึกใน Supabase เลย

## 📡 WordPress API Endpoint

### **URL:**
```
POST https://api.playground.chidahp.com/wp-json/chidahp-affiliate/v1/submit-post
```

### **Request Body:**
```json
{
  "user_id": 16,
  "title": "เทคนิคการรีวิวหนังสือให้ขายดี",
  "content": "<p>นี่คือเนื้อหาบทความฉบับเต็ม...</p>",
  "excerpt": "สรุปเทคนิคเขียนรีวิวให้น่าสนใจ",
  "categories": [107],
  "tags": ["review", "book", "chidahp"]
}
```

### **Response:**
```json
{
  "id": 12345,
  "title": "เทคนิคการรีวิวหนังสือให้ขายดี",
  "status": "draft",
  "link": "https://playground.chidahp.com/2024/01/15/technique-review-book/",
  "date": "2024-01-15T10:30:00Z"
}
```

## 🔧 การตั้งค่า

### **1. หมวดหมู่ (Categories):**
- **Category ID**: `107` (Chulo Reviewer)
- **Category Slug**: `chidahp-book-reviewer`
- **ชื่อ**: Chulo Reviewer

### **2. ผู้ใช้ (User ID):**
- **Default User ID**: `16` (Chulo Reviewer)
- **สามารถเปลี่ยนได้** ผ่าน `user_id` parameter

### **3. Tags:**
- **อัตโนมัติ**: `["Chulo Reviewer"]`
- **เพิ่มเติม**: ตามที่ user กรอก

## 🚀 การใช้งาน

### **1. สร้างบทความใหม่:**
```javascript
// Frontend ส่งข้อมูล
const articleData = {
  title: "รีวิวหนังสือ Atomic Habits",
  content: "<p>เนื้อหาบทความ...</p>",
  excerpt: "สรุปหนังสือ Atomic Habits",
  tags: ["หนังสือ", "นิสัย", "พัฒนาตนเอง"],
  status: "published"
};

// API จะส่งไป WordPress
const wordpressData = {
  user_id: 16,
  title: articleData.title,
  content: articleData.content,
  excerpt: articleData.excerpt,
  categories: [107], // Always 107
  tags: articleData.tags
};
```

### **2. Sync บทความที่มีอยู่:**
```javascript
// ใช้ sync button ในหน้า articles
// จะส่งข้อมูลไป WordPress และอัปเดต wordpress_id ใน Supabase
```

## 📊 Database Schema

### **Articles Table:**
```sql
CREATE TABLE public.articles (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  category VARCHAR(50) DEFAULT 'chulo-reviewer',
  tags TEXT[] DEFAULT '{}',
  author_id UUID,
  author_name VARCHAR(100) DEFAULT 'Chulo Reviewer',
  wordpress_id INTEGER, -- WordPress post ID
  wordpress_synced BOOLEAN DEFAULT FALSE,
  wordpress_category_id INTEGER DEFAULT 107,
  wordpress_category_slug VARCHAR(100) DEFAULT 'chidahp-book-reviewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔄 API Endpoints

### **1. สร้างบทความ:**
```
POST /api/articles
```
- สร้างที่ WordPress ก่อน
- บันทึกลง Supabase ถ้าสำเร็จ
- Return error ถ้า WordPress ล้มเหลว

### **2. Sync บทความ:**
```
POST /api/articles/[id]/sync-wordpress
```
- ส่งข้อมูลไป WordPress
- อัปเดต `wordpress_id` และ `wordpress_synced` ใน Supabase

### **3. ดึงข้อมูลบทความ:**
```
GET /api/articles
GET /api/articles/[id]
```
- ดึงจาก Supabase
- แสดงสถานะ WordPress sync

## ⚠️ Error Handling

### **1. WordPress API Error:**
```json
{
  "error": "WordPress creation failed: 500 - Internal Server Error"
}
```

### **2. Supabase Error:**
```json
{
  "error": "Failed to save article to database"
}
```

### **3. Network Error:**
```json
{
  "error": "Internal server error"
}
```

## 🎯 ข้อดีของระบบใหม่

### **✅ ความสอดคล้อง:**
- บทความใน Supabase = บทความใน WordPress
- ไม่มีบทความที่ sync ไม่สำเร็จ

### **✅ ความน่าเชื่อถือ:**
- ถ้า WordPress ล้มเหลว = ไม่บันทึกใน Supabase
- ป้องกันข้อมูลไม่สอดคล้อง

### **✅ การจัดการง่าย:**
- WordPress เป็น source of truth
- Supabase เป็น local cache

## 🔮 อนาคต

### **1. Authentication:**
```javascript
// เพิ่ม WordPress token
headers: {
  'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN || 'SKKouBZJHhWOwd4HWbybBv3xZBne9yjk'}`
}
```

### **4. Environment Variables:**
```bash
# WordPress API Configuration
WORDPRESS_API_URL=https://api.playground.chidahp.com/wp-json/chidahp-affiliate/v1/submit-post
WORDPRESS_API_TOKEN=SKKouBZJHhWOwd4HWbybBv3xZBne9yjk
WORDPRESS_DEFAULT_USER_ID=16
WORDPRESS_DEFAULT_CATEGORY_ID=107
WORDPRESS_DEFAULT_CATEGORY_SLUG=chidahp-book-reviewer
```

### **2. User Management:**
```javascript
// ดึง user_id จาก Supabase auth
const user = await supabase.auth.getUser();
const wordpressUserId = user.data.user?.user_metadata?.wordpress_user_id;
```

### **3. Error Recovery:**
```javascript
// ถ้า Supabase ล้มเหลว ให้ลบบทความจาก WordPress
if (supabaseError) {
  await deleteFromWordPress(wordpressId);
}
```

## 📝 สรุป

**ระบบใหม่ทำงานแบบ WordPress First!** 🎉

- ✅ สร้างที่ WordPress ก่อน
- ✅ บันทึกลง Supabase ถ้าสำเร็จ
- ✅ ไม่มีข้อมูลไม่สอดคล้อง
- ✅ ง่ายต่อการจัดการ
