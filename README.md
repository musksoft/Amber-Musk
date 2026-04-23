# 🌸 Amber&Musk Online Perfume Store

A modern full-stack perfume e-commerce web application built with React, Supabase, and Tailwind CSS.  
It includes product browsing, cart system, authentication, admin dashboard, and personalized fragrance experience features.

---

## 🔗 GitHub Repository
https://github.com/musksoft/Amber-Musk

---

---

## ⚙️ Setup Instructions

### 1. Clone the repository
bash
git clone https://github.com/musksoft/Amber-Musk.git

### Navigate into project
cd Amber-Musk

### Install Dependencies
npm install

### Initialise Tailwind
npx tailwindcss init -p

### Setup Environment variables
Create a .env file: 
- VITE_SUPABASE_URL=your_supabase_url
- VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

### Run the development server on your localhost
npm run dev

## Features

### Customer Features
- Product listing with images and details
- Product detail view
- Shopping cart system
- Checkout flow
- Order history tracking
- User registration & login
- Fragrance recommendation quiz (Scent Quiz)
- Reviews system
- Fragrance notes exploration page
- Responsive UI for all devices

---

###  Authentication & Roles
- User authentication (Login/Register)
- Admin login page
- Protected admin routes (`AdminRoute`)
- Role-based access control (Admin/User)

---

###  Admin Features
- Admin dashboard for managing data
- Secure admin login system
- Order and product overview 
- Controlled access to sensitive data

---

###  Testing
- Database connection test using:
  - `TestDBConnection.test.jsx`

---

###  Database
- SQL scripts included:
  - `users.sql` → user schema
  - `policy.sql` → access rules / policies
- Supabase integration via:
  - `supabaseClient.js`

---

###  UI/UX
- Built with Tailwind CSS and GSAP animation
- Responsive layout
- Clean modern perfume brand aesthetic
- Reusable components (ProductCard, ProductDetail)

---

##  Project Structure


project-root/
│
├── public/
│   ├── images/
│   │   ├── perfumes/
│   └── index.html
│
├── src/
│   │
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   └── ProductDetail.jsx
│   ├── test/
│   │   └── TestDBConnection.test.jsx
│   ├── sqlquery/
│   │   ├── users.sql
│   │   └── policy.sql
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Hero.jsx
│   │   ├── Shop.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Footer.jsx
│   │   ├── Orders.jsx
│   │   ├── Navbar.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── Wardrobe.jsx
│   │   ├── Reviews.jsx
│   │   ├── ScentQuiz.jsx
│   │   ├── FragranceNotes.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Vendor.jsx
│   │   └── AdminRoute.jsx
│   │
│   ├── config/
│   │   └── supabaseClient.js
│   │
│   ├── App.jsx
│   ├── tailwind.config.js
│   └── main.jsx

## Tech Stack
### Frontend
- React
- React DOM
0 React Router DOM (client-side routing)
### Styling & UI
- Tailwind CSS
- PostCSS & Autoprefixer
- tailwind-merge (utility class merging)
- class-variance-authority (component variants)
- @radix-ui/react-slot (UI composition primitives)
### Animations
- GSAP (advanced animations)
### Backend / Database
- Supabase (@supabase/supabase-js) for:
-- Authentication
-- Database (PostgreSQL)
-- API integration
### UX Enhancements
Lucide React (icon system)
### Development Tools
Vite (build tool & dev server)
ESLint (code linting)
Tailwind CSS tooling
React Refresh plugin (fast reload)

📌 Future Improvements
Payment gateway integration
Advanced recommendation AI quiz
Inventory management system
Vendor dashboard separation
Performance optimization for assets

Muskan Nisar

Built with 🌸 for a modern perfume shopping experience.
