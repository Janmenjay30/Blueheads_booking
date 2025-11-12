# 🚀 Quick Start Guide

## Step 1: Install MongoDB

### Option A: MongoDB Local (Windows)
Download and install from: https://www.mongodb.com/try/download/community

After installation, start MongoDB:
```powershell
net start MongoDB
```

### Option B: MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster
4. Get connection string
5. Update `backend/.env` with your connection string

## Step 2: Start Backend

```powershell
# Terminal 1
cd "d:\E Drive\programming\webdev\BlueHeads\backend"

# Seed database with sample services
npm run seed

# Start backend server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

## Step 3: Start Frontend

```powershell
# Terminal 2 (new terminal)
cd "d:\E Drive\programming\webdev\BlueHeads\frontend"

# Start frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

## Step 4: Open Application

Visit: **http://localhost:3000**

## 🎯 What You Can Do

1. **Browse Services** - See 8 pre-loaded digital marketing services
2. **Filter** - Click category buttons or use search
3. **Add to Cart** - Select services you want
4. **Customize** - Add extra features (add-ons) to services
5. **Book Call** - Fill form and submit booking
6. **See Pricing** - Real-time price calculation

## 🧪 Quick Test

1. Add "SEO Optimization - Starter" to cart
2. Add "Social Media Management" to cart
3. Click "Proceed to Booking"
4. Check/uncheck add-ons to see price change
5. Fill the booking form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Date: Tomorrow
   - Time: 9:00 AM - 11:00 AM
6. Click "Confirm Booking"
7. You'll see success page!

## 📊 View Data in MongoDB

### Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. View database: `digital-marketing-services`
4. Collections: `services`, `bookings`

### Using Command Line
```powershell
mongosh
use digital-marketing-services
db.services.find().pretty()
db.bookings.find().pretty()
```

## 🛠️ Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongosh` (should connect)
- Check port 5000 is free
- Check `.env` file exists in backend folder

### Frontend won't start
- Check port 3000 is free
- Delete `node_modules` and run `npm install` again
- Check backend is running first

### Can't see services
- Run seed command: `npm run seed` in backend folder
- Check MongoDB connection in backend logs

### Booking fails
- Check backend logs for errors
- Ensure all required form fields are filled
- Date must be in the future

## 📧 Email Notifications (Optional)

To enable email confirmations:

1. Edit `backend/.env`
2. Add Gmail credentials (use App Password):
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourcompany.com
```

3. Restart backend server

## 🎨 Customization Ideas

- Add more services in seed file
- Change theme colors in `tailwind.config.js`
- Add authentication for admin panel
- Add payment integration (Stripe)
- Add calendar integration (Google Calendar)

## 📱 Test on Mobile

1. Find your local IP: `ipconfig` (look for IPv4)
2. Update frontend to allow external access
3. Visit from phone: `http://YOUR_IP:3000`

---

**Need help?** Check the main README.md for detailed documentation!
