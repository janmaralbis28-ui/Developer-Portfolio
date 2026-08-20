# Janmar Albis — Developer Portfolio

A responsive developer portfolio website built with HTML, CSS, and vanilla JavaScript.

## 📁 Directory Structure

```
Developer-Portfolio-/
├── index.html              # Home page (Hero, Projects, Experience)
├── 404.html                # Custom not-found page
├── robots.txt              # Search engine crawl rules
├── sitemap.xml             # Sitemap for search engines
├── netlify.toml            # Security headers + redirect rules (Netlify)
├── css/
│   └── style.css           # Custom styles + CSS variables (dark/light theme)
├── js/
│   └── main.js             # Theme toggle, mobile menu, contact form, scroll effects
├── assets/
│   └── images/             # Profile photos and project screenshots
├── pages/
│   ├── about.html          # About page with skills, bio, and map
│   ├── projects.html       # Full projects grid
│   ├── services.html       # Services, pricing, and FAQ
│   └── articles.html       # Blog articles listing
└── README.md
```

## 🚀 Features

- **Dark / Light theme toggle** (persisted via localStorage)
- **Fully responsive** — mobile, tablet, desktop layouts
- **Animated hero section** with floating portrait
- **Scroll-triggered fade-in** for cards and sections
- **Sticky navbar** with scroll shadow
- **Mobile slide-out menu** with overlay
- **Projects grid** with tech badges
- **Experience timeline** on home page
- **Skills card grid** on About page
- **About page slideshow** portrait with auto-transition
- **Interactive location map** (OpenStreetMap embed) on About page
- **Resume modal** with email + Facebook contact options
- **Contact form** with EmailJS + reCAPTCHA verification
- **Services page** with pricing cards, 3D hardware showcase, and FAQ accordion
- **Articles listing** page with expandable article cards

## 🛠️ Tech Stack

| Layer     | Tools                                      |
|-----------|--------------------------------------------|
| Markup    | HTML5, Semantic elements                   |
| Styling   | CSS3 Variables, Custom CSS, Bootstrap 5    |
| Icons     | Bootstrap Icons                            |
| Fonts     | Google Fonts (Bebas Neue + Nunito)         |
| Scripts   | Vanilla JavaScript (ES6+)                  |

## 🎨 Customization

1. **Portrait image**: Replace `assets/images/hero_home_transparent_final.png` with your own.
2. **About photos**: Replace `janmar_image.webp`, `Seated_image1.webp`, `Seated_image2.webp`.
3. **Social links**: Update Facebook and Gmail `href` values in all HTML files.
4. **Projects/Articles**: Edit the card content directly in the HTML files.
5. **Colors**: Modify `--bg`, `--accent`, etc. in `css/style.css` `:root` block.

## 📦 Getting Started

Just open `index.html` in any browser — no build step required!

For local development with live reload:
```bash
# Using VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"

# Or using Node.js http-server
npx http-server .
```

## 🚀 Deployment

Compatible with any static hosting:
- **GitHub Pages** — push to repo, enable Pages in Settings
- **Netlify** — drag and drop the folder
- **Vercel** — connect GitHub repo
