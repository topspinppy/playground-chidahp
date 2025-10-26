# API Update Article Example

## Endpoint
```
PUT /api/articles/[id]
```

## Example Request

### URL
```
PUT https://your-domain.com/api/articles/123
```

### Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "title": "Updated Post",
  "content": "Updated content with new information",
  "excerpt": "Updated excerpt",
  "tags": ["tag1", "tag2", "new-tag"],
  "status": "published"
}
```

## WordPress Integration

เมื่ออัพเดท article ผ่าน API นี้ ระบบจะ:

1. **อัพเดทใน Supabase** - อัพเดทข้อมูลในฐานข้อมูล Supabase ก่อน
2. **ตรวจสอบ WordPress Sync** - ตรวจสอบว่า article นี้ sync กับ WordPress หรือไม่
3. **อัพเดทใน WordPress** - ถ้า sync แล้ว จะอัพเดทใน WordPress ด้วย

### WordPress Update API Call
```
POST https://api.playground.chidahp.com/wp-json/chidahp-affiliate/v1/update-post
```

### WordPress Request Body
```json
{
  "post_id": 970,
  "title": "Updated Post",
  "content": "Updated content with new information",
  "excerpt": "Updated excerpt",
  "tags": ["tag1", "tag2", "new-tag"]
}
```

## Response

### Success Response (200)
```json
{
  "article": {
    "id": "123",
    "title": "Updated Post",
    "slug": "updated-post",
    "content": "Updated content with new information",
    "excerpt": "Updated excerpt",
    "tags": ["tag1", "tag2", "new-tag"],
    "status": "published",
    "category": "chulo-reviewer",
    "wordpress_id": 970,
    "wordpress_synced": true,
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error Response (400)
```json
{
  "error": "Slug must contain only lowercase English letters, numbers, and hyphens"
}
```

### Error Response (404)
```json
{
  "error": "Article not found"
}
```

## Usage Examples

### JavaScript/Fetch
```javascript
const updateArticle = async (articleId, updateData) => {
  try {
    const response = await fetch(`/api/articles/${articleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Article updated:', result.article);
    return result.article;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

// Usage
updateArticle('123', {
  title: "Updated Post",
  content: "Updated content",
  excerpt: "Updated excerpt",
  tags: ["tag1", "tag2"]
});
```

### cURL
```bash
curl -X PUT "https://your-domain.com/api/articles/123" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Post",
    "content": "Updated content",
    "excerpt": "Updated excerpt",
    "tags": ["tag1", "tag2"]
  }'
```

## Notes

- ระบบจะอัพเดทใน Supabase ก่อนเสมอ
- ถ้า article sync กับ WordPress แล้ว จะอัพเดทใน WordPress ด้วย
- ถ้า WordPress update ล้มเหลว จะไม่ทำให้ API call ล้มเหลว (จะ log error เท่านั้น)
- `slug` ต้องเป็นภาษาอังกฤษตัวเล็ก ตัวเลข และขีดกลางเท่านั้น
- `category` จะถูกบังคับเป็น `chulo-reviewer` เสมอ
