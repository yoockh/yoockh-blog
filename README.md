# Yoockh Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![React Icons](https://img.shields.io/badge/React_Icons-5-E91E63?style=for-the-badge&logo=react&logoColor=white)

Personal portfolio website dengan desain futuristik Game UI / Dashboard OS. Built with modern web technologies untuk showcase skills, projects, dan certificates.

---

## Preview

> Portfolio dengan tema cyberpunk, glassmorphism effects, dan interactive elements.

---

## Tech Stack

### Frontend

| Technology | Description |
|------------|-------------|
| **Next.js 14** | React framework dengan App Router |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Animation library |
| **React Icons** | Official brand icons (Simple Icons) |
| **Lucide React** | Modern icon library |

### Services

| Service | Description |
|---------|-------------|
| **Formspree** | Contact form handling |
| **Next.js Image** | Image optimization |

---

## Features

### Core Sections

- **Hero Section** - Animated introduction dengan typing effect
- **Tech Stack Grid** - Bento grid layout dengan official brand icons
- **Project Showcase** - Modal popup dengan detail lengkap
- **Certificate Slider** - Infinite scroll dengan modal preview
- **Contact Form** - Integrated dengan Formspree

### Interactive Elements

- **Collapsible Sidebar** - Desktop navigation dengan tooltip
- **Mobile Bottom Nav** - Touch-friendly navigation
- **BugCrusher Game** - Mini game interaktif di dalam portfolio
  - 3 level difficulty (Junior, Mid, Senior)
  - Boss fight mode
  - Touch dan keyboard support

### Visual Effects

- Glassmorphism cards dengan gradient borders
- Animated glow effects
- Grid background pattern
- Smooth scroll navigation
- Responsive design untuk semua device

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles dan Tailwind config
│   ├── layout.tsx           # Root layout dengan sidebar
│   └── page.tsx             # Main page
├── components/
│   ├── games/
│   │   └── BugCrusher.tsx   # Interactive mini game
│   ├── layout/
│   │   └── Sidebar.tsx      # Futuristic sidebar navigation
│   └── sections/
│       ├── HeroSection.tsx       # Hero dengan terminal animation
│       ├── TechGrid.tsx          # Bento grid tech stack
│       ├── ProjectShowcase.tsx   # Project cards dengan modals
│       ├── CertificateSlider.tsx # Infinite marquee slider
│       └── ContactSection.tsx    # Contact form section
public/
└── assets/
    └── certificate/         # Certificate images
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yoockh/yoockh-blog.git

# Navigate to directory
cd yoockh-blog

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) di browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Connect repository di [Vercel Dashboard](https://vercel.com)
3. Deploy otomatis setiap push ke main branch

### Manual Deploy

```bash
npm run build
npm start
```

---

## Customization

### Update Personal Info

Edit the following files to customize:

| File | Content |
|------|---------|
| `HeroSection.tsx` | Name, role, tech stack |
| `Sidebar.tsx` | Social media links |
| `ProjectShowcase.tsx` | Your projects |
| `ContactSection.tsx` | Contact details |
| `CertificateSlider.tsx` | Certificates |

### Add Certificates

Place certificate images in `/public/assets/certificate/` dan update array di `CertificateSlider.tsx`

### Color Theme

Main colors di `tailwind.config.ts`:

| Color | Hex | Usage |
|-------|-----|-------|
| `cyber-blue` | #00d4ff | Primary accent |
| `cyber-purple` | #a855f7 | Secondary accent |
| `cyber-green` | #00ff88 | Success/highlight |
| `void` | #020617 | Background |

---

## Performance

- Optimized images dengan Next.js Image
- Dynamic imports untuk game component
- Minimal bundle size dengan tree-shaking
- Server-side rendering untuk initial load

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |

---

## License

MIT License - Feel free to use for personal portfolio.

---

## Author

**Aisiya Qutwatunnada** (yoockh)

[![GitHub](https://img.shields.io/badge/GitHub-yoockh-181717?style=flat-square&logo=github)](https://github.com/yoockh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Aisiya_Qutwatunnada-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/aisiya-qutwatunnada)
[![Instagram](https://img.shields.io/badge/Instagram-yoo.chan45-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/yoo.chan45)
[![Kaggle](https://img.shields.io/badge/Kaggle-aisiyaqutwatunnada-20BEFF?style=flat-square&logo=kaggle&logoColor=white)](https://www.kaggle.com/aisiyaqutwatunnada)

---

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Formspree](https://formspree.io/)
