# NomnomAI Frontend Setup Guide

## 🚀 Quick Start

### 1. Create Project Directory
```bash
mkdir nomnomai-frontend
cd nomnomai-frontend
```

### 2. Initialize Project
```bash
npm create vite@latest . -- --template react
```

When prompted:
- Select "React"
- Select "JavaScript"

### 3. Install Dependencies
```bash
npm install react-router-dom axios date-fns lucide-react clsx
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Project Structure
Create the following folder structure:

```
nomnomai-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   │   └── Navbar.jsx
│   │   └── restaurant/
│   ├── context/
│   │   └── UserContext.jsx
│   ├── hooks/
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Channels.jsx
│   │   ├── RestaurantDetail.jsx
│   │   ├── Discovery.jsx
│   │   └── Profile.jsx
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### 5. Copy Configuration Files

Copy the contents of these files I created:
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `src/App.jsx`
- `src/context/UserContext.jsx`
- `src/components/layout/Navbar.jsx`
- `src/pages/Landing.jsx`

### 6. Update main.jsx

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 7. Update index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans antialiased;
  }
}

.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 8. Create .env File

```env
VITE_API_URL=http://localhost:8000
```

### 9. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

---

## 📂 Next Steps

### Create Remaining Pages:

1. **Channels Page** - WhatsApp-style restaurant list
2. **Restaurant Detail Page** - Visual feed + AI chat
3. **Discovery Page** - Instagram-style grid
4. **Profile Page** - User stats and preferences

### Create API Service Layer:

```javascript
// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Restaurant API calls
export const restaurantService = {
  getAll: () => api.get('/restaurants'),
  getById: (id) => api.get(`/restaurants/${id}`),
  follow: (id) => api.post(`/restaurants/${id}/follow`),
  unfollow: (id) => api.post(`/restaurants/${id}/unfollow`),
};

// Add more services...
```

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#0ea5e9)
- **Accent**: Red (#ef4444)
- **Dark**: Gray scale

### Typography
- **Headings**: Poppins
- **Body**: Inter

### Components
- Buttons, Cards, Modals, Forms
- Restaurant Cards
- Feed Posts
- Chat Interface

---

## 🔌 Backend Integration

Make sure your FastAPI backend is running on `http://localhost:8000`

The frontend will proxy API requests through Vite's dev server.

---

## 📱 Mobile Responsive

- Mobile-first design
- Bottom navigation for mobile
- Responsive grid layouts
- Touch-friendly interactions

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🐛 Troubleshooting

### Module not found errors
```bash
npm install
```

### Tailwind not working
- Check `tailwind.config.js` paths
- Restart dev server

### API connection issues
- Verify backend is running
- Check `.env` file
- Check CORS settings in backend

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)

---

Ready to build something amazing! 🚀