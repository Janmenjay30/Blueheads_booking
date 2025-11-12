# ✅ Startup Checklist - Run Your App in 5 Minutes

## Prerequisites Check

Before you start, make sure you have:
- [ ] Node.js installed (v16+) - Check: `node --version`
- [ ] npm installed - Check: `npm --version`
- [ ] MongoDB installed OR MongoDB Atlas account
- [ ] A code editor (VS Code recommended)
- [ ] 2 terminal windows available

---

## 🚀 5-Minute Startup Guide

### Step 1: Start MongoDB (30 seconds)

**Option A - Local MongoDB (Windows):**
```powershell
net start MongoDB
```

**Option B - MongoDB Atlas (Cloud):**
1. Already have connection string? Skip to Step 2
2. Don't have one? Takes 5 min to setup at mongodb.com/cloud/atlas
3. Update `backend/.env` with your connection string

---

### Step 2: Backend Setup (2 minutes)

**Terminal 1:**
```powershell
# Navigate to backend
cd "d:\E Drive\programming\webdev\BlueHeads\backend"

# Verify .env file exists (should already be there)
# If not, copy from .env.example: copy .env.example .env

# Seed database with sample services
npm run seed
```

**Expected Output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing services
✅ Successfully seeded 8 services

📋 Services by category:
   SEO: 1 service(s)
   Social Media: 1 service(s)
   Content Marketing: 1 service(s)
   PPC: 1 service(s)
   Email Marketing: 1 service(s)
   Web Design: 1 service(s)
   Branding: 1 service(s)
   Analytics: 1 service(s)
```

**Start the backend:**
```powershell
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📍 Environment: development
```

✅ **Backend is running!** Keep this terminal open.

---

### Step 3: Frontend Setup (2 minutes)

**Terminal 2 (NEW TERMINAL):**
```powershell
# Navigate to frontend
cd "d:\E Drive\programming\webdev\BlueHeads\frontend"

# Start the development server
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

✅ **Frontend is running!** Keep this terminal open.

---

### Step 4: Open & Test (30 seconds)

1. **Open browser:** http://localhost:3000
2. **You should see:** 
   - BlueHeads header with logo
   - "Digital Marketing Services" heading
   - 8 service cards in a grid
   - Search bar and category filters

3. **Quick Test:**
   - Click "Add to Cart" on any service
   - Cart count should increase
   - Click "Book Now" or "Proceed to Booking"
   - Fill out the booking form
   - Submit and see success page

✅ **App is working!**

---

## 🎯 Quick Health Check

Run these checks to verify everything works:

### Backend Health Check
```powershell
# In browser or use curl
curl http://localhost:5000/api/health
```
**Should return:** `{"status":"OK","message":"Server is running"}`

### Get Services
```powershell
curl http://localhost:5000/api/services
```
**Should return:** JSON array with 8 services

### Frontend Check
- Visit: http://localhost:3000
- Should load homepage with services
- No errors in browser console (F12)

---

## 📊 Monitoring Your App

### Backend Terminal
You'll see logs for:
- MongoDB connection status
- API requests (GET, POST)
- Any errors that occur

### Frontend Terminal  
You'll see:
- Vite dev server status
- Hot module replacement updates
- Build/compile status

### Browser Console (F12)
- Check for any JavaScript errors
- Network tab shows API calls
- React DevTools for component inspection

---

## 🛑 How to Stop

When you're done:

1. **Stop Frontend:** Press `Ctrl + C` in Terminal 2
2. **Stop Backend:** Press `Ctrl + C` in Terminal 1
3. **Stop MongoDB (optional):** `net stop MongoDB`

---

## 🔄 Restart Checklist

Next time you want to run the app:

```powershell
# Terminal 1 - Backend
cd "d:\E Drive\programming\webdev\BlueHeads\backend"
npm run dev

# Terminal 2 - Frontend (NEW TERMINAL)
cd "d:\E Drive\programming\webdev\BlueHeads\frontend"
npm run dev
```

No need to run `npm install` or `npm run seed` again!

---

## 🐛 Troubleshooting Quick Fixes

### "MongoDB connection error"
```powershell
# Start MongoDB service
net start MongoDB

# OR check if already running
mongosh
```

### "Port 5000 already in use"
```powershell
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### "Port 3000 already in use"
- Edit `frontend/vite.config.js`
- Change `port: 3000` to `port: 3001`

### "Cannot GET /api/services"
- Make sure backend is running on port 5000
- Check backend terminal for errors
- Verify MongoDB is connected

### Services not showing
```powershell
# Re-run seed script
cd backend
npm run seed
```

### "npm: command not found"
- Node.js not installed properly
- Restart terminal/VS Code
- Reinstall Node.js

---

## 📝 Daily Development Workflow

### Starting Work
1. ✅ Start MongoDB (if local)
2. ✅ `cd backend && npm run dev` (Terminal 1)
3. ✅ `cd frontend && npm run dev` (Terminal 2)
4. ✅ Open http://localhost:3000

### During Development
- Edit files in VS Code
- Frontend auto-reloads on save (Vite HMR)
- Backend auto-restarts on save (nodemon)
- Check terminals for errors

### Ending Work
1. ✅ Ctrl+C in both terminals
2. ✅ Commit changes to git (if using)
3. ✅ Optional: Stop MongoDB

---

## 🎨 Customization Quick Start

### Add Your Own Service
1. Edit: `backend/seeds/seedServices.js`
2. Add new service object
3. Run: `npm run seed`
4. Refresh frontend

### Change Colors
1. Edit: `frontend/tailwind.config.js`
2. Modify `colors.primary` values
3. Frontend auto-reloads

### Change Company Name
1. Edit: `frontend/src/components/Header.jsx`
2. Change "BlueHeads" to your name
3. Edit: `frontend/src/components/Footer.jsx`
4. Update footer text

---

## ✅ Success Indicators

Your app is working correctly when:

- ✅ Backend shows "MongoDB connected successfully"
- ✅ Frontend shows Vite dev server running
- ✅ Homepage loads with 8 services
- ✅ Search and filters work
- ✅ Can add services to cart
- ✅ Can submit booking form
- ✅ See success confirmation
- ✅ No console errors

---

## 🎉 You're All Set!

Your full-stack MERN application is now running!

**What to do next:**
1. Explore all features
2. Try booking a service
3. Check MongoDB to see stored bookings
4. Customize to your needs
5. Deploy to production (see README.md)

**Have fun building! 🚀**

---

**Pro Tip:** Bookmark http://localhost:3000 for quick access!
