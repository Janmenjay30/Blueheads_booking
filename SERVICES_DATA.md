# Sample Services Data

This document shows the structure and sample data for services in the application.

## Service Categories

1. **SEO** - Search Engine Optimization
2. **Social Media** - Social Media Marketing
3. **Content Marketing** - Content Creation
4. **PPC** - Pay-Per-Click Advertising
5. **Email Marketing** - Email Campaigns
6. **Web Design** - Website & Landing Pages
7. **Analytics** - Data & Reporting
8. **Branding** - Brand Identity

## Sample Service Structure

```json
{
  "name": "SEO Optimization - Starter",
  "description": "Basic SEO package including keyword research, on-page optimization, and monthly reporting.",
  "category": "SEO",
  "basePrice": 499,
  "pricingModel": "monthly",
  "features": [
    "Keyword research (up to 20 keywords)",
    "On-page SEO optimization",
    "Meta tags optimization",
    "Monthly performance report",
    "Google Analytics setup"
  ],
  "addons": [
    {
      "name": "Extra 10 keywords",
      "price": 100,
      "description": "Additional keyword targeting"
    },
    {
      "name": "Backlink building",
      "price": 200,
      "description": "10 quality backlinks per month"
    }
  ],
  "duration": {
    "value": 1,
    "unit": "months"
  },
  "icon": "🔍",
  "isActive": true
}
```

## All Pre-loaded Services

### 1. SEO Optimization - Starter 🔍
- **Price:** $499/month
- **Category:** SEO
- **Add-ons:** 2 available
- **Features:** 5 core features

### 2. Social Media Management 📱
- **Price:** $799/month
- **Category:** Social Media
- **Add-ons:** 2 available (extra platform, video content)
- **Features:** 5 core features

### 3. Content Marketing Package ✍️
- **Price:** $599/month
- **Category:** Content Marketing
- **Add-ons:** 2 available (extra posts, newsletter)
- **Features:** 5 core features

### 4. Google Ads Campaign 💰
- **Price:** $899/month
- **Category:** PPC
- **Add-ons:** 2 available (Facebook Ads, Display)
- **Features:** 6 core features

### 5. Email Marketing Campaign 📧
- **Price:** $399/month
- **Category:** Email Marketing
- **Add-ons:** 2 available (automation, extra campaigns)
- **Features:** 5 core features

### 6. Landing Page Design 🎨
- **Price:** $1,299 (one-time)
- **Category:** Web Design
- **Add-ons:** 2 available (A/B variant, tracking)
- **Features:** 6 core features

### 7. Brand Identity Package 🎯
- **Price:** $1,999 (one-time)
- **Category:** Branding
- **Add-ons:** 2 available (extra concepts, mockup)
- **Features:** 6 core features

### 8. Analytics & Reporting Setup 📊
- **Price:** $699 (one-time)
- **Category:** Analytics
- **Add-ons:** 2 available (Tag Manager, Heatmaps)
- **Features:** 6 core features

## Pricing Models

- **monthly**: Recurring monthly subscription
- **per-project**: One-time project fee
- **hourly**: Hourly rate (not used in current services)
- **fixed**: Fixed price (alias for per-project)

## Adding Custom Services

To add your own services, you can:

### Option 1: Update Seed File
Edit `backend/seeds/seedServices.js` and add new service objects.

### Option 2: Use API
```javascript
POST /api/services
Content-Type: application/json

{
  "name": "Your Service Name",
  "description": "Service description",
  "category": "SEO", // or other category
  "basePrice": 999,
  "pricingModel": "monthly",
  "features": ["Feature 1", "Feature 2"],
  "addons": [
    {
      "name": "Add-on name",
      "price": 200,
      "description": "Add-on description"
    }
  ],
  "duration": {"value": 1, "unit": "months"},
  "icon": "🚀",
  "isActive": true
}
```

## Icon Options

Use emojis for service icons:
- SEO: 🔍 🔎 📈
- Social Media: 📱 📲 💬
- Content: ✍️ 📝 ✏️
- PPC: 💰 💵 💳
- Email: 📧 ✉️ 📨
- Web Design: 🎨 🖌️ 💻
- Analytics: 📊 📈 📉
- Branding: 🎯 🏆 ⭐

## Typical Price Ranges

Based on market research:
- SEO: $300-$2,000/month
- Social Media: $500-$3,000/month
- Content Marketing: $400-$2,500/month
- PPC Management: $500-$5,000/month (+ ad spend)
- Email Marketing: $300-$1,500/month
- Landing Page: $500-$5,000 one-time
- Branding: $1,000-$10,000 one-time
- Analytics Setup: $500-$2,000 one-time

---

**Note:** All prices in USD. Adjust based on your market and expertise level.
