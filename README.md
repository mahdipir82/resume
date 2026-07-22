# Mahdi Pirhayati Portfolio

یک وب‌سایت رزومه و نمونه‌کار تک‌صفحه‌ای، فارسی و RTL برای مهدی پیرحیاتی.

## Tech Stack

- React
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React
- JavaScript

## Setup

```bash
npm install
python -m pip install -r requirements.txt
python backend/manage.py migrate
```

## Development

در یک ترمینال بک‌اند را اجرا کنید:

```bash
npm run backend:dev
```

در ترمینال دیگر فرانت‌اند را اجرا کنید:

```bash
npm run dev
```

## Lint

```bash
npm run lint
```

## Production Build

```bash
npm run build
```

## Backend API

بک‌اند با Django و Django REST Framework ساخته شده و روی این آدرس اجرا می‌شود:

```text
http://127.0.0.1:8000/api
```

Endpointهای اصلی:

- `GET /api/site-content/`
- `PUT /api/site-content/`
- `POST /api/site-content/reset/`
- `GET /api/admin/status/`
- `POST /api/admin/setup/`
- `POST /api/admin/login/`
- `POST /api/admin/logout/`

پنل ادمین سایت برای ذخیره تنظیمات باید به بک‌اند وصل باشد. اولین بار از داخل پنل یک رمز ادمین می‌سازید؛ رمز در دیتابیس Django به‌صورت هش‌شده ذخیره می‌شود.

## Preview Production Build

```bash
npm run preview
```

## Customize Personal Information

اطلاعات اصلی در این فایل‌ها قرار دارد:

- `src/components/sections/Hero.jsx`
- `src/components/sections/About.jsx`
- `src/components/sections/Contact.jsx`
- `src/components/layout/Footer.jsx`
- `index.html`

## Edit Skills

مهارت‌ها از فایل زیر خوانده می‌شوند:

```text
src/data/skills.js
```

برای تغییر سطح مهارت‌ها، مقدار `level` را ویرایش کنید. از درصدهای اغراق‌آمیز استفاده نشده است.

## Add a New Project

پروژه‌ها از فایل زیر خوانده می‌شوند:

```text
src/data/projects.js
```

برای افزودن پروژه جدید، یک آبجکت با ساختار زیر به آرایه `projects` اضافه کنید:

```js
{
  id: 'project-id',
  title: 'English Project Title',
  persianTitle: 'عنوان فارسی پروژه',
  shortDescription: 'توضیح کوتاه',
  fullDescription: 'توضیح کامل',
  image: '',
  imageAlt: 'متن جایگزین تصویر',
  technologies: ['Python', 'Django'],
  features: ['ویژگی اول', 'ویژگی دوم'],
  githubUrl: '',
  liveUrl: '',
  status: 'در حال توسعه',
  featured: false,
}
```

اگر `githubUrl` یا `liveUrl` خالی باشد، دکمه مربوط به آن نمایش داده نمی‌شود.

## Resume PDF

برای فعال شدن لینک دانلود رزومه، فایل رزومه را با نام زیر قرار دهید:

```text
public/resume.pdf
```

تا زمانی که این فایل وجود ندارد، دکمه رزومه به‌صورت غیرفعال نمایش داده می‌شود.

## Security Notes

- فایل‌های `.env` و `.env.*` در Git نادیده گرفته می‌شوند.
- هیچ API Key، Token یا اطلاعات محرمانه‌ای در کد قرار ندهید.
- پوشه‌های `node_modules` و `dist` نباید Commit شوند.
- فایل `backend/db.sqlite3` دیتابیس محلی است و Commit نمی‌شود.
