# 🔧 Environment Variables Setup

## Required Environment Variables

สร้างไฟล์ `.env.local` ใน root directory และเพิ่มตัวแปรต่อไปนี้:

### 1. Supabase Configuration (จำเป็น)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 2. JWT Secret (จำเป็น)
```bash
JWT_SECRET=your_very_secure_jwt_secret_key_here_at_least_32_characters
```

### 3. Chidahp API Configuration (ไม่จำเป็น - สำหรับอนาคต)
```bash
# CHIDAHP_API_URL=https://api.playground.chidahp.com
# CHIDAHP_USERNAME=tl.topspin.48@gmail.com
# CHIDAHP_PASSWORD=Topspin432018!
```

## Optional Environment Variables

### WordPress Configuration (ถ้าใช้ WordPress)
```bash
WORDPRESS_URL=https://your-wordpress-site.com
WORDPRESS_USERNAME=your_wordpress_username
WORDPRESS_PASSWORD=your_wordpress_password
```

### GraphQL Configuration
```bash
WPGRAPHQL_URL=https://your-site.com/graphql
```

### Web URL
```bash
WEB_URL=https://your-domain.com
```

### Environment
```bash
NODE_ENV=development
```

## วิธีตั้งค่า

1. **สร้างไฟล์ `.env.local`:**
   ```bash
   touch .env.local
   ```

2. **คัดลอกตัวแปรข้างต้นไปใส่ในไฟล์**

3. **แทนที่ค่าต่างๆ ด้วยค่าจริง:**
   - Supabase: ไปที่ [supabase.com](https://supabase.com) สร้างโปรเจคใหม่
   - JWT_SECRET: สร้าง random string ยาวๆ (อย่างน้อย 32 ตัวอักษร)
   - Chidahp API: ขอ API key จากทีม backend

4. **รีสตาร์ท development server:**
   ```bash
   npm run dev
   ```

## ⚠️ ข้อควรระวัง

- **ห้าม commit ไฟล์ `.env.local`** ลง git
- ใช้ค่าที่ปลอดภัยสำหรับ production
- JWT_SECRET ควรเป็น random string ที่ยาวและซับซ้อน
