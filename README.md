# NomNom AI - Restaurant Discovery Platform

A comprehensive AI-powered restaurant discovery and recommendation system built with modern web technologies.

## 🏗️ Project Structure

This repository contains multiple modules of the NomNom AI platform:

### 📁 Modules

- **Frontend (`frontend` branch)** - React 18 + Vite frontend application
- **Backend** (Coming soon) - Node.js/Python API server
- **AI Engine** (Coming soon) - Restaurant recommendation AI
- **Mobile App** (Coming soon) - React Native mobile application

## 🚀 Frontend Module

The frontend module is a modern React application featuring:

- **React 18** with modern hooks and functional components
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS** with custom theming and dark mode
- **React Router v6** for seamless navigation
- **AI Chat Interface** for restaurant interactions
- **Geolocation Services** for location-based recommendations
- **Responsive Design** for all device types

## 📱 Pages & Features

### Core Pages
- **Landing Page** (`/`) - Main restaurant discovery interface with AI chat
- **Channels** (`/channels`) - Restaurant communication channels
- **Restaurant Detail** (`/restaurant/:slug`) - Detailed restaurant information
- **Discovery** (`/discovery`) - Browse and discover restaurants
- **Profile** (`/profile`) - User profile management
- **Resto Agents** (`/agents`) - AI agent interactions
- **Restaurant Chat** (`/chat/:slug`) - Direct chat with restaurant agents

### Key Components
- **Location Services** - Get user location for personalized recommendations
- **AI Chat Interface** - Interactive chat with restaurant AI agents
- **Responsive Navigation** - Mobile-friendly navigation with dark mode toggle
- **Restaurant Cards** - Beautiful restaurant display cards
- **Search & Filters** - Advanced restaurant search functionality

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite 5.4.21** - Build tool and dev server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Lucide React** - Icon library
- **PostCSS & Autoprefixer** - CSS processing

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/icannDevTeam/nomnom-ai.git
   cd nomnom-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/
│   └── layout/
│       └── Navbar.jsx
├── context/
│   └── UserContext.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Channels.jsx
│   ├── RestaurantDetail.jsx
│   ├── Discovery.jsx
│   ├── Profile.jsx
│   ├── RestoAgents.jsx
│   └── RestaurantChat.jsx
├── App.jsx
└── main.jsx
```

## 🎨 Styling

The project uses Tailwind CSS with a custom configuration supporting:
- Dark/light mode theming
- Custom color palette for restaurant branding
- Responsive breakpoints
- Custom utility classes

## 🔧 Configuration

### Vite Configuration
- Path aliases for clean imports (`@`, `@components`, `@pages`, etc.)
- Development server with HMR
- Proxy configuration for API calls
- Production build optimization

### Tailwind Configuration
- Custom color scheme
- Dark mode support
- Extended spacing and typography
- Responsive utilities

## 🌐 API Integration

The frontend is configured to work with a backend API:
- Proxy setup in Vite config for `/api` routes
- Context providers for state management
- Service layer ready for API integration

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly interactions
- Mobile-optimized navigation
- PWA-ready structure

## 🔍 Location Features

- HTML5 Geolocation API integration
- Location-based restaurant recommendations
- Area detection and display
- Privacy-conscious location handling

## 🤖 AI Integration

- Chat interface ready for AI agents
- Restaurant-specific conversation contexts
- Real-time messaging capabilities
- Agent personality customization

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The built files in `dist/` are ready for deployment to any static hosting service.

## 🔄 Development Status

- ✅ Core routing and navigation
- ✅ Responsive UI components
- ✅ Location services integration
- ✅ AI chat interface foundation
- ✅ Dark/light mode theming
- ✅ Mobile-responsive design
- 🔄 Backend API integration (pending)
- 🔄 Real-time chat functionality (pending)
- 🔄 Restaurant data integration (pending)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the NomNom AI ecosystem.

---

**Built with ❤️ by the iCann Dev Team**