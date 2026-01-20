# Denuwan Yasanga - Portfolio Website

A modern, interactive personal portfolio website built with React, Tailwind CSS, and Framer Motion. Features a futuristic dark theme with neon accents, smooth animations, and 3D particle effects.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)

## 🌐 Live Demo

**[View Portfolio](https://denuwan9.github.io/Portfolio_Denuwan/)**

## ✨ Features

- **Modern UI/UX** - Ultra-modern, futuristic design with Apple + Cyberpunk inspired aesthetics
- **Dark Mode First** - Premium dark theme with neon cyan, purple, and pink accents
- **Smooth Animations** - Framer Motion powered micro-interactions and transitions
- **3D Effects** - Three.js particle background with floating orbs
- **Custom Cursor** - Interactive cursor with hover effects (desktop only)
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **SEO Optimized** - Comprehensive meta tags, structured data, and sitemap
- **Performance Focused** - Lazy loading, code splitting, and optimized assets
- **Accessibility** - ARIA labels, keyboard navigation, and reduced motion support

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, JavaScript (ES6+) |
| **Styling** | Tailwind CSS, CSS3 |
| **Animations** | Framer Motion |
| **3D Graphics** | Three.js, React Three Fiber |
| **Build Tool** | Vite |
| **Deployment** | GitHub Pages |
| **Icons** | React Icons |
| **Forms** | React Hook Form |

## 📁 Project Structure

```
Portfolio_Denuwan/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Experience.jsx
│   │   ├── FloatingActions.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageTransition.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── Projects.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── Skills.jsx
│   ├── hooks/
│   │   ├── useMousePosition.js
│   │   ├── useScrollProgress.js
│   │   └── useSmoothScroll.js
│   ├── utils/
│   │   └── cn.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/denuwan9/Portfolio_Denuwan.git
   cd Portfolio_Denuwan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment

### GitHub Pages (Automatic)

Push to `main` branch and GitHub Actions will automatically build and deploy.

### GitHub Pages (Manual)

```bash
npm run deploy
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Background | `#0a0a0f` | Primary background |
| Dark Secondary | `#16161f` | Cards, sections |
| Neon Cyan | `#00f5ff` | Primary accent |
| Neon Purple | `#bf00ff` | Secondary accent |
| Neon Pink | `#ff00f5` | Tertiary accent |
| Neon Green | `#00ff80` | Status indicators |

## 📝 Sections

1. **Hero** - Animated introduction with typing effect and 3D particle background
2. **About** - Story-driven introduction with stats and highlights
3. **Skills** - Interactive skill cards with progress rings
4. **Projects** - 3D tilt cards showcasing featured work
5. **Experience** - Timeline-based work and education history
6. **Contact** - Form with validation and social links

## ⚡ Performance

- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices, SEO)
- Lazy loading for below-the-fold components
- Code splitting for Three.js and Framer Motion
- Optimized images and assets
- Reduced motion support for accessibility

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/denuwan9/Portfolio_Denuwan/issues).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Denuwan Yasanga**

- GitHub: [@denuwan9](https://github.com/denuwan9)
- LinkedIn: [Denuwan Yasanga](https://www.linkedin.com/in/denuwan-yasanga-9a4442309/)

---

⭐ Star this repo if you find it helpful!
