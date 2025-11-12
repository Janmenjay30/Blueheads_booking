<<<<<<< HEAD
# Blueheads_booking
=======
# BlueHeads - Digital Marketing Services Platform

A full-stack MERN application for browsing digital marketing services, calculating pricing, and booking consultation calls.

## 🚀 Features

- **Service Catalog**: Browse 8+ digital marketing services across multiple categories
- **Dynamic Pricing Calculator**: Select services and add-ons with real-time price calculation
- **Smart Cart System**: Add/remove services and customize with add-ons
- **Call Booking**: Schedule consultation calls with preferred date/time
- **Email Notifications**: Automatic confirmation emails sent to clients
- **Responsive Design**: Beautiful Tailwind CSS UI works on all devices
- **RESTful API**: Clean Express.js backend with MongoDB
- **Input Validation**: Both client and server-side validation

## 🛠️ Tech Stack

### Frontend
- **React 18** with React Router for navigation
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Icons** for UI icons

### Backend
- **Node.js** + **Express.js** for server
- **MongoDB** with **Mongoose** ODM
- **Nodemailer** for email notifications
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** enabled

## 📁 Project Structure
# BlueHeads - Digital Marketing Services Platform

A full-stack MERN application for browsing digital marketing services, calculating pricing, and booking consultation calls.

## 🚀 Features

- **Service Catalog**: Browse 8+ digital marketing services across multiple categories
- **Dynamic Pricing Calculator**: Select services and add-ons with real-time price calculation
- **Smart Cart System**: Add/remove services and customize with add-ons
- **Call Booking**: Schedule consultation calls with preferred date/time
- **Email Notifications**: Automatic confirmation emails sent to clients
- **Responsive Design**: Beautiful Tailwind CSS UI works on all devices
- **RESTful API**: Clean Express.js backend with MongoDB
- **Input Validation**: Both client and server-side validation

## 🛠️ Tech Stack

### Frontend
- **React 18** with React Router for navigation
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Icons** for UI icons

### Backend
- **Node.js** + **Express.js** for server
- **MongoDB** with **Mongoose** ODM
- **Nodemailer** for email notifications
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** enabled

## 📁 Project Structure

```
BlueHeads/
├── backend/
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── seeds/              # Database seeding
│   ├── utils/              # Helper functions
   ├── server.js           # Express app
    ├── package.json
    └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── services/       # API service layer
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # Entry point
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 1. Clone or Navigate to Project

```powershell
cd "d:\E Drive\programming\webdev\BlueHeads"
```

### 2. Backend Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env
```

**Edit `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital-marketing-services
NODE_ENV=development

# Email (optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourcompany.com
```

**Start MongoDB** (if running locally):
```powershell
# Start MongoDB service (Windows)
net start MongoDB
```

**Seed the database:**
```powershell
npm run seed
```

**Start backend server:**
```powershell
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

Open a **new terminal**:

```powershell
# Navigate to frontend
cd "d:\E Drive\programming\webdev\BlueHeads\frontend"

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 🎯 Usage

1. **Browse Services**: Visit `http://localhost:3000` to see all services
2. **Filter & Search**: Use category filters or search bar
3. **Add to Cart**: Click "Add to Cart" on services you want
4. **Customize**: Select add-ons for each service in the cart
5. **Book Call**: Fill out the booking form with your details
6. **Confirmation**: Receive booking confirmation on screen and via email

## 📡 API Endpoints

### Services
- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/category/:category` - Get services by category
- `POST /api/services` - Create new service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings (Admin)
- `GET /api/bookings/:id` - Get booking by ID (Admin)
- `PATCH /api/bookings/:id/status` - Update booking status (Admin)
- `DELETE /api/bookings/:id` - Delete booking (Admin)

## 📊 Database Models

### Service Model
```javascript
{
  name: String,
  description: String,
  category: String,
  basePrice: Number,
  pricingModel: String,
  features: [String],
  addons: [{name, price, description}],
  duration: {value, unit},
  isActive: Boolean,
  icon: String
}
```

### Booking Model
```javascript
{
  clientName: String,
  clientEmail: String,
  clientPhone: String,
  companyName: String,
  services: [{serviceId, serviceName, basePrice, selectedAddons, quantity}],
  totalPrice: Number,
  preferredCallDate: Date,
  preferredCallTime: String,
  message: String,
  status: String
}
```

## 🔒 Security Features

- Helmet.js for HTTP headers
- Input validation with express-validator
- MongoDB injection protection
- CORS configuration
- Environment variables for sensitive data

## 🎨 Customization

### Add New Services
1. Use the seed script or add via API
2. Categories: SEO, Social Media, Content Marketing, PPC, Email Marketing, Web Design, Analytics, Branding

### Modify Styling
- Edit `frontend/tailwind.config.js` for theme colors
- Modify `frontend/src/index.css` for global styles

### Email Configuration
For production, configure SMTP settings in `.env`:
- Gmail: Use App Password (not regular password)
- SendGrid: Get API key from SendGrid
- Other: Update `backend/utils/emailService.js`

## 🚀 Deployment

### Backend (Heroku/Render/Railway)
1. Set environment variables
2. Deploy from Git repository
3. Run seed command: `npm run seed`

### Frontend (Netlify/Vercel)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Database (MongoDB Atlas)
1. Create free cluster
2. Get connection string
3. Update `MONGODB_URI` in backend `.env`

## 🧪 Testing

### Test API endpoints:
```powershell
# Health check
curl http://localhost:5000/api/health

# Get all services
curl http://localhost:5000/api/services
```

## 📝 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

This is an intern project. Feel free to fork and enhance!

## 📧 Support

For questions: info@blueheads.com

---

**Built with ❤️ using MERN Stack**
