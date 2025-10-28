مستند نصب و راه‌اندازی پروژه GameHub Vault

https://img.shields.io/badge/GameHub-Vault-blue?style=for-the-badge
https://img.shields.io/badge/Next.js-13-black?style=for-the-badge
https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge

فهرست مطالب

· معرفی پروژه
· پیش‌نیازها
· نصب و راه‌اندازی
· پیکربندی
· اجرا
· تست
· استقرار
· عیب‌یابی

معرفی پروژه

GameHub Vault یک پلتفرم بازی غیرمتمرکز است که با فناوری‌های مدرن توسعه یافته است:

قابلیت‌های اصلی:

· 🎮 سیستم رأی‌دهی برای بازی‌ها
· 📊 داشبورد مدیریت و آمار
· 🏆 جدول رده‌بندی بازیکنان
· 🛒 بازار خرید و فروش آیتم‌های بازی
· 📱 طراحی واکنش‌گرا
· 🔗 یکپارچه‌سازی با ENS و IPFS
· 🤖 پشتیبانی از نوتیفیکیشن

تکنولوژی‌های استفاده شده:

· Frontend: Next.js 13, TypeScript, Tailwind CSS
· Backend: API Routes (Next.js)
· Database: MongoDB (پیش‌فرض)
· Blockchain: Ethereum, ENS, IPFS
· Notifications: Telegram, Push Protocol

پیش‌نیازها

قبل از نصب، مطمئن شوید سیستم شما دارای این موارد است:

نرم‌افزارهای ضروری:

· Node.js (نسخه 18 یا بالاتر)
· npm یا yarn یا pnpm
· Git
· MongoDB (محلی یا ابری)

بررسی نسخه‌ها:

```bash
# بررسی نسخه Node.js
node --version

# بررسی نسخه npm
npm --version

# بررسی نسخه Git
git --version
```

نصب و راه‌اندازی

روش ۱: نصب خودکار (توصیه شده)

```bash
# دریافت پروژه
git clone <repository-url>
cd gamehub-vault

# اجرای اسکریپت نصب خودکار
chmod +x install.sh
./install.sh
```

روش ۲: نصب دستی

```bash
# دریافت پروژه
git clone <repository-url>
cd gamehub-vault

# نصب وابستگی‌ها
npm install
# یا
yarn install
# یا
pnpm install

# ساخت پوشه‌های ضروری (در صورت نیاز)
mkdir -p logs uploads temp
```

پیکربندی

۱. فایل محیطی (Environment Variables)

فایل .env.local را در ریشه پروژه ایجاد کنید:

```env
# پایگاه داده
MONGODB_URI=mongodb://localhost:27017/gamehub-vault
# یا برای MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gamehub-vault

# کلیدهای API
ETHERSCAN_API_KEY=your_etherscan_api_key
INFURA_PROJECT_ID=your_infura_project_id
ALCHEMY_API_KEY=your_alchemy_api_key

# شبکه بلاکچین
NEXT_PUBLIC_NETWORK=mainnet
# یا برای تست‌نت
NEXT_PUBLIC_NETWORK=goerli

# ENS
NEXT_PUBLIC_ENS_RPC=https://mainnet.infura.io/v3/your_project_id

# IPFS
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
IPFS_API_URL=https://ipfs.infura.io:5001
IPFS_PROJECT_ID=your_ipfs_project_id
IPFS_PROJECT_SECRET=your_ipfs_secret

# تلگرام
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Push Protocol
PUSH_PROTOCOL_API_KEY=your_push_protocol_api_key

# کلیدهای امنیتی
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# سایر تنظیمات
NEXT_PUBLIC_APP_URL=http://localhost:3000
MAX_FILE_SIZE=10485760
```

۲. پیکربندی MongoDB

```bash
# اگر از MongoDB محلی استفاده می‌کنید
sudo systemctl start mongod
# یا
brew services start mongodb/brew/mongodb-community
```

۳. پیکربندی مانفیست PWA

فایل public/manifest.json را بررسی کنید:

```json
{
  "name": "GameHub Vault",
  "short_name": "GameHub",
  "description": "Decentralized Gaming Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a202c",
  "theme_color": "#3182ce",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

اجرا

حالت توسعه (Development)

```bash
# اجرای سرور توسعه
npm run dev
# یا
yarn dev
# یا
pnpm dev

# برنامه در آدرس زیر قابل دسترسی خواهد بود:
# http://localhost:3000
```

حالت تولید (Production)

```bash
# ساخت نسخه تولید
npm run build

# اجرای نسخه تولید
npm start
# یا
yarn start
```

اجرای همراه با PM2 (برای سرور)

```bash
# نصب PM2
npm install -g pm2

# اجرای برنامه با PM2
pm2 start npm --name "gamehub-vault" -- start

# مدیریت فرآیندها
pm2 status
pm2 logs gamehub-vault
pm2 restart gamehub-vault
```

تست

اجرای تست‌ها

```bash
# تست‌های واحد
npm run test

# تست‌های E2E
npm run test:e2e

# تست با coverage
npm run test:coverage
```

تست دستی قابلیت‌ها

۱. صفحه اصلی: بررسی نمایش صحیح Splash Screen
۲.داشبورد: ورود و مشاهده آمار
۳.سیستم رأی‌دهی: ثبت رأی و مشاهنت نتایج
۴.بازار: مشاهده و جستجوی آیتم‌ها
۵.جدول رده‌بندی: مشاهده رتبه‌بندی بازیکنان

استقرار

استقرار روی Vercel (توصیه شده)

```bash
# نصب Vercel CLI
npm i -g vercel

# استقرار
vercel --prod
```

استقرار روی Netlify

```bash
# ساخت پروژه
npm run build

# آپلود پوشه out روی Netlify
```

استقرار روی سرور اختصاصی

```bash
# کپی فایل‌ها روی سرور
scp -r ./gamehub-vault user@server:/path/to/app

# نصب وابستگی‌ها
cd /path/to/app/gamehub-vault
npm install --production

# ساخت و اجرا
npm run build
npm start
```

عیب‌یابی

مشکلات رایج و راه‌حل‌ها

۱. خطای اتصال به MongoDB

```
Error: Could not connect to MongoDB
```

راه‌حل:

· مطمئن شوید MongoDB در حال اجراست
· رشته اتصال را در .env.local بررسی کنید
· پورت 27017 باز باشد

۲. خطای وابستگی‌ها

```
Module not found
```

راه‌حل:

```bash
rm -rf node_modules package-lock.json
npm install
```

۳. خطای ساخت

```
Build failed
```

راه‌حل:

· TypeScript errors را بررسی کنید
· مطمئن شوید تمام فایل‌های ضروری موجودند
· لاگ ساخت را بررسی کنید

۴. مشکل در API Routes

```
API route not working
```

راه‌حل:

· مطمئن شوید فایل‌ها در pages/api/ قرار دارند
· middlewareها را بررسی کنید
· console.log را برای دیباگ اضافه کنید

لاگ‌ها و مانیتورینگ

```bash
# مشاهده لاگ‌های برنامه
npm run logs
# یا
tail -f logs/app.log

# مانیتورینگ منابع
npm run monitor
```

نگهداری و به‌روزرسانی

به‌روزرسانی وابستگی‌ها

```bash
# بررسی وابستگی‌های قدیمی
npm outdated

# به‌روزرسانی وابستگی‌ها
npm update

# به‌روزرسانی Next.js
npm install next@latest
```

پشتیبان‌گیری

```bash
# اسکریپت پشتیبان‌گیری از دیتابیس
npm run backup

# پشتیبان‌گیری دستی
mongodump --uri="mongodb://localhost:27017/gamehub-vault"
```

ساختار پروژه

```
gamehub-vault/
├── public/          # فایل‌های استاتیک
├── pages/           # صفحات و API routes
├── components/      # کامپوننت‌های ری‌اکت
├── lib/             # utilities و کتابخانه‌ها
├── models/          # مدل‌های دیتابیس
├── styles/          # استایل‌ها
├── install.sh       # اسکریپت نصب
└── README.md        # مستندات
```

پشتیبانی

در صورت بروز مشکل:

۱. مستندات: این فایل را مطالعه کنید
۲.Issues: مشکلات را در GitHub گزارش دهید
۳.Community: از جامعه توسعه‌دهندگان کمک بگیرید

مجوز

این پروژه تحت مجوز [MIT License] منتشر شده است.

---

توسعه داده شده با ❤️ برای جامعه بازی‌های غیرمتمرکز