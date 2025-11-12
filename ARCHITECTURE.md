# Application Architecture & Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                        │
│                     http://localhost:3000                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   REACT FRONTEND (Vite)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Components:                                            │ │
│  │  • Header (with cart count)                            │ │
│  │  • ServiceCard (reusable)                              │ │
│  │  • Footer                                              │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  Pages:                                                │ │
│  │  • HomePage (service catalog + filters)                │ │
│  │  • BookingPage (cart + form)                           │ │
│  │  • SuccessPage (confirmation)                          │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  Services:                                             │ │
│  │  • api.js (Axios HTTP client)                          │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ REST API Calls
                           │ /api/services, /api/bookings
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   EXPRESS.JS BACKEND                         │
│                   http://localhost:5000                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Routes:                                               │ │
│  │  • /api/services (GET, POST, PUT, DELETE)              │ │
│  │  • /api/bookings (GET, POST, PATCH, DELETE)            │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  Controllers:                                          │ │
│  │  • serviceController.js                                │ │
│  │  • bookingController.js                                │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  Models (Mongoose):                                    │ │
│  │  • Service.js                                          │ │
│  │  • Booking.js                                          │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  Utils:                                                │ │
│  │  • emailService.js (Nodemailer)                        │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ MongoDB Driver (Mongoose)
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      MONGODB DATABASE                        │
│              mongodb://localhost:27017                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Collections:                                          │ │
│  │  • services (8 pre-loaded services)                    │ │
│  │  • bookings (client booking records)                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 User Flow

### 1. Browse Services Flow
```
User visits homepage
    ↓
Load all services from API (GET /api/services)
    ↓
Display services in grid layout
    ↓
User can:
  • Filter by category
  • Search by keyword
  • View service details
  • Add to cart
```

### 2. Booking Flow
```
User adds service to cart
    ↓
Cart state updates (React State)
    ↓
User clicks "Proceed to Booking"
    ↓
Navigate to /booking
    ↓
User can:
  • Select/deselect add-ons
  • Remove services
  • See live price calculation
    ↓
Fill booking form:
  • Name, Email, Phone
  • Company (optional)
  • Preferred call date/time
  • Message (optional)
    ↓
Form validation (client-side)
    ↓
Submit booking (POST /api/bookings)
    ↓
Server validation (express-validator)
    ↓
Save to MongoDB
    ↓
Send confirmation email (optional)
    ↓
Return success response
    ↓
Navigate to /success
    ↓
Display confirmation message
```

## 📊 Data Flow

### Service Data Flow
```
MongoDB → Mongoose Model → Controller → Express Route → API Response → Axios → React State → UI
```

### Booking Data Flow
```
User Input → React Form → Validation → Axios POST → Express Route → Controller → Validation → Mongoose Model → MongoDB
```

## 🔌 API Endpoints Map

```
Frontend                    Backend                     Database
--------                    -------                     --------

HomePage                    GET /api/services           services
  └─> Fetch services   →                         →     collection

ServiceCard                 
  └─> Display data

BookingPage                 POST /api/bookings          bookings
  └─> Submit form     →                          →     collection
                           
SuccessPage
  └─> Show confirmation
```

## 📁 File Structure Details

```
BlueHeads/
│
├── backend/
│   ├── controllers/
│   │   ├── serviceController.js    # CRUD for services
│   │   └── bookingController.js    # CRUD for bookings
│   │
│   ├── models/
│   │   ├── Service.js              # Service schema
│   │   └── Booking.js              # Booking schema
│   │
│   ├── routes/
│   │   ├── serviceRoutes.js        # /api/services routes
│   │   └── bookingRoutes.js        # /api/bookings routes
│   │
│   ├── seeds/
│   │   └── seedServices.js         # Database seeding
│   │
│   ├── utils/
│   │   └── emailService.js         # Email notifications
│   │
│   ├── server.js                   # Express app entry
│   ├── package.json
│   └── .env                        # Environment config
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx          # Navigation + cart
    │   │   ├── Footer.jsx          # Footer links
    │   │   └── ServiceCard.jsx     # Service display card
    │   │
    │   ├── pages/
    │   │   ├── HomePage.jsx        # Service catalog
    │   │   ├── BookingPage.jsx     # Cart + booking form
    │   │   └── SuccessPage.jsx     # Confirmation
    │   │
    │   ├── services/
    │   │   └── api.js              # Axios instance + API calls
    │   │
    │   ├── App.jsx                 # Router + main app
    │   ├── main.jsx                # React entry point
    │   └── index.css               # Tailwind styles
    │
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## 🎨 Component Hierarchy

```
App
├── Router
│   └── Routes
│       ├── Route "/" → HomePage
│       │   ├── Header (cartCount)
│       │   ├── Hero Section
│       │   ├── Search & Filters
│       │   ├── ServiceCard[] (grid)
│       │   └── Footer
│       │
│       ├── Route "/booking" → BookingPage
│       │   ├── Header (cartCount)
│       │   ├── Order Summary (sticky)
│       │   │   └── Cart Items with add-ons
│       │   ├── Booking Form
│       │   │   ├── Personal Info
│       │   │   ├── Date/Time Selection
│       │   │   └── Message
│       │   └── Footer
│       │
│       └── Route "/success" → SuccessPage
│           ├── Header
│           ├── Success Message
│           ├── Next Steps
│           └── Footer
```

## 🔐 Security Layers

```
User Input
    ↓
1. React Form Validation (client-side)
    ↓
2. Express-Validator (server-side)
    ↓
3. Mongoose Schema Validation
    ↓
4. MongoDB (final storage)
```

## 📈 State Management

```
App Level State:
  • cart (array of selected services)
  • setCart (update function)

HomePage State:
  • services (from API)
  • filteredServices (after filters)
  • loading, error
  • selectedCategory
  • searchTerm

BookingPage State:
  • formData (booking form inputs)
  • errors (validation errors)
  • loading (submission state)
```

## ⚡ Performance Optimization

1. **Frontend:**
   - Vite for fast HMR
   - Lazy loading (could add)
   - Tailwind CSS purging
   - React.memo for components (could add)

2. **Backend:**
   - MongoDB indexes on frequently queried fields
   - Connection pooling
   - Middleware optimization

3. **Database:**
   - Indexed queries
   - Lean queries for read operations

---

This architecture supports scalability and can easily be extended with authentication, payments, and more features!
