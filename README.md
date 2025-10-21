# VVX Frontend 

## ✨ Features

- 🛍️ **Modern E-commerce UI** - Clean, responsive design with Persian language support
- 🔄 **RTL Support** - Full right-to-left layout for Persian/Farsi content
- 🎨 **Beautiful Design** - Modern UI components with smooth animations
- 📱 **Mobile-First** - Fully responsive design for all devices
- ⚡ **Fast Performance** - Optimized with Next.js 13 and static export
- 🛒 **Shopping Features** - Cart, wishlist, product comparison, and checkout
- 🔍 **Advanced Search** - Product search with filtering and sorting
- 🌙 **Dark Mode** - Built-in dark/light theme support
- ♿ **Accessible** - WCAG compliant with proper ARIA labels

## 🚀 Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with Zod validation
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Font**: [Vazirmatn](https://github.com/rastikerdar/vazirmatn) (Persian font)

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/barbodimani81/VVX-frontend.git
   cd VVX-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

### Project Structure

```
VVX-frontend/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── account/           # User account page
│   ├── api/               # API routes
│   ├── checkout/          # Checkout process
│   ├── products/          # Product catalog & detail pages
│   ├── search/            # Search results
│   └── wishlist/          # User wishlist
├── components/            # Reusable UI components
│   ├── cart/              # Shopping cart components
│   ├── checkout/          # Checkout form components
│   ├── layout/            # Layout components (header, footer, nav)
│   ├── product/           # Product-specific components
│   ├── ui/                # Base UI components (buttons, inputs, etc.)
│   └── ...
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🎨 Design System

The project uses a comprehensive design system built on:

- **Color Palette**: Custom CSS variables for theming
- **Typography**: Vazirmatn font family with multiple weights
- **Spacing**: Consistent spacing scale using Tailwind
- **Components**: Reusable UI components with variants
- **Animations**: Smooth transitions and micro-interactions

### Theme Support

The application supports both light and dark themes with automatic system preference detection.

## 🌐 Internationalization

- **Language**: Persian (Farsi)
- **Direction**: Right-to-left (RTL)
- **Currency**: Iranian Toman (تومان)
- **Date Format**: Persian calendar support

## 🛒 E-commerce Features

### Product Catalog
- Product listing with pagination
- Advanced filtering (category, color, size, price)
- Search functionality
- Product comparison
- Recently viewed products

### Shopping Experience
- Add to cart functionality
- Wishlist management
- Product variants (color, size)
- Product galleries with image zoom
- Customer reviews and ratings

### Checkout Process
- Multi-step checkout
- Address management
- Shipping options
- Payment integration ready

## 🐳 Docker Support

### Development
```bash
docker-compose --profile dev up
```

### Production
```bash
docker-compose --profile prod up
```

## 📱 API Documentation

The project includes a comprehensive API for product management. See [API.md](./API.md) for detailed documentation.

### Key Endpoints
- `GET /api/products` - Product catalog with filtering
- `GET /api/products/[slug]` - Individual product details

## 🚀 Deployment

### Static Export (Recommended)
```bash
npm run build
# Deploy the 'out' folder to any static hosting service
```

### Vercel
```bash
# Connect your GitHub repository to Vercel
# Automatic deployments on push to main branch
```

### Docker
```bash
docker build -t vvx-frontend .
docker run -p 3000:80 vvx-frontend
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Vazirmatn](https://github.com/rastikerdar/vazirmatn) for the beautiful Persian font

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact the development team
- Check the documentation in the `/docs` folder

---

<div dir="rtl">

**نکته**: این پروژه برای بازار فارسی طراحی شده و از راست‌به‌چپ پشتیبانی می‌کند. برای بهترین تجربه، از مرورگرهای مدرن استفاده کنید.

</div>

---

Made with ❤️ for the Persian e-commerce community
