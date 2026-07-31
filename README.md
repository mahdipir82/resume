# Mahdi Pirhayati

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

## PostgreSQL

برای ذخیره تنظیمات و پروژه‌ها در PostgreSQL، فایل `.env` را بر اساس `.env.example` بسازید:

```text
POSTGRES_DB=mahdi_portfolio
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-postgres-password
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
```

سپس دیتابیس را در PostgreSQL بسازید و Migrationها را اجرا کنید:

```bash
createdb -U postgres mahdi_portfolio
npm run backend:migrate
```

اگر `POSTGRES_DB` تنظیم نشده باشد، Django برای توسعه محلی از SQLite استفاده می‌کند.

## Theme Settings

از داخل پنل ادمین می‌توانید این موارد را تغییر دهید و در دیتابیس ذخیره کنید:

- رنگ شروع و پایان پس‌زمینه
- رنگ Accent اصلی
- رنگ نور پس‌زمینه
- رنگ Accent دوم
- رنگ میانی پس‌زمینه
- فعال یا غیرفعال بودن انیمیشن
- سرعت انیمیشن
- شدت نور و ذرات

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

پروژه‌ها از بک‌اند خوانده می‌شوند و از داخل پنل ادمین قابل افزودن، ویرایش و حذف هستند.

برای اضافه کردن پروژه:

1. بک‌اند و فرانت‌اند را اجرا کنید.
2. وارد پنل ادمین شوید.
3. در بخش «مدیریت پروژه‌ها» اطلاعات پروژه را وارد کنید.
4. روی «اضافه کردن پروژه» بزنید.

Endpointهای پروژه:

```text
GET /api/projects/
POST /api/projects/
PUT /api/projects/<id>/
DELETE /api/projects/<id>/
```

برای درخواست‌های `POST`، `PUT` و `DELETE` باید در پنل ادمین لاگین باشید.

ساختار داده پروژه:

```js
{
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
  sortOrder: 0,
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
