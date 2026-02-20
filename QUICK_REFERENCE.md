# Quick Reference Guide

## 🚀 Quick Start (2 minutes)

```bash
# Navigate to project
cd ~/Documents/DSC/dsc-website

# Install dependencies
npm install

# Start development server
npm start

# Open browser
http://localhost:8000
```

## 📁 File Structure At-a-Glance

```
dsc-website/
├── index.html                 → Home page
├── join.html                  → Membership registration
├── contact.html               → Contact form
│
├── about/
│   ├── index.html            → About overview
│   ├── mission-vision.html    → Mission & vision
│   ├── executive-board.html   → Team members
│   └── achievements.html      → Achievements
│
├── events/
│   ├── index.html            → Event listing
│   ├── nextgen-fest.html      → NextGen Fest
│   ├── academic-events.html   → Workshops
│   └── past-events.html       → Past events
│
├── projects/
│   ├── index.html            → Projects overview
│   ├── products-tools.html    → Tools & products
│   └── research-publications.html → Papers
│
├── resources/
│   ├── index.html            → Resource hub
│   ├── tutorials.html         → Tutorials
│   ├── articles.html          → Articles
│   ├── quizzes.html           → Quizzes
│   └── model-papers.html      → Practice papers
│
├── css/
│   ├── components.css         → Reusable components
│   └── styles.css             → Main styles
│
├── js/
│   ├── main.js               → Core functionality
│   └── payment-redirect.js    → Payment integration
│
└── assets/
    ├── images/               → Place images here
    ├── icons/                → Place icons here
    └── docs/                 → Place documents here
```

## 🎨 Customize Colors

Edit `css/styles.css`:
```css
:root {
  --primary: #3b82f6;        /* Main blue */
  --secondary: #60a5fa;      /* Light blue */
  --accent: #f59e0b;         /* Orange */
}
```

## 📝 Update Organization Name

Search & replace "Data Science Club" with your club name:
```bash
grep -r "Data Science Club" .
```

## 🔧 Common Edits

### Change Contact Info
- File: `contact.html` and footer in all pages
- Update: email, phone, address

### Update Team Members
- File: `about/executive-board.html`
- Update: names, positions, descriptions

### Add Events
- File: `events/index.html`
- Copy event card and update details

### Update Membership Prices
- File: `join.html`
- Update: amounts in LKR

### Change Colors
- File: `css/styles.css`
- Update: CSS variables

## 💳 Payment Integration

1. Edit `js/payment-redirect.js`
2. Update these lines:
```javascript
this.gatewayURL = "https://your-gateway.com";
merchantId: "YOUR_MERCHANT_ID"
```

## 📱 Test Responsive Design

Press `F12` in browser → Click device toggle button → Select devices

## 📤 Deploy to GitHub

```bash
git add .
git commit -m "Deploy site"
git push origin main
```

Then enable GitHub Pages in repository settings.

## 🔗 Create Links

### Internal links:
```html
<a href="page.html">Link</a>
<a href="about/mission-vision.html">About</a>
```

### Anchor links:
```html
<a href="#section-id">Jump to section</a>
<section id="section-id">Content</section>
```

## 📸 Add Images

1. Place image in `assets/images/`
2. Add to HTML:
```html
<img src="assets/images/photo.jpg" alt="Description" />
```

## 🎯 Key Classes

### Buttons
```html
<a class="btn btn-primary">Primary Button</a>
<a class="btn btn-secondary">Secondary Button</a>
<a class="btn btn-large">Large Button</a>
```

### Cards
```html
<div class="card">
  <h3>Title</h3>
  <p>Content</p>
</div>
```

### Grids
```html
<div class="grid-2">    <!-- 2 columns -->
<div class="grid-3">    <!-- 3 columns -->
<div class="grid-4">    <!-- 4 columns -->
```

### Alerts
```html
<div class="alert alert-info">Info message</div>
<div class="alert alert-success">Success message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-error">Error message</div>
```

## 🧩 Components

### Hero Section
```html
<section class="hero">
  <div class="hero-content">
    <h1>Title</h1>
    <p>Subtitle</p>
    <a href="#" class="btn">CTA</a>
  </div>
</section>
```

### Section Title
```html
<h2 class="section-title">Section Name</h2>
<p class="section-subtitle">Subtitle</p>
```

### Team Member
```html
<div class="team-member">
  <img src="photo.jpg" class="team-member-image" alt="Name" />
  <h4>Member Name</h4>
  <div class="role">Position</div>
</div>
```

### Event Card
```html
<div class="event-card">
  <div class="event-image"></div>
  <div class="event-content">
    <span class="event-date">Date</span>
    <h3 class="event-title">Title</h3>
    <p class="event-description">Description</p>
  </div>
</div>
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Images not showing | Check file path in src |
| Styles not loading | Check CSS file path |
| Mobile menu not working | Check screen size < 768px |
| Page not loading | Check file name and path |
| Broken links | Update href paths |

## 📞 Support Files

- **README.md** - Full documentation
- **DEPLOYMENT.md** - Deployment guide
- **IMPLEMENTATION_GUIDE.md** - Customization guide
- **PROJECT_SUMMARY.md** - Project overview

## ⚡ Performance Tips

1. Compress images before uploading
2. Use reasonable image sizes
3. Minimize CSS/JS for production
4. Cache resources with versioning
5. Avoid large videos

## ✅ Launch Checklist

- [ ] All content updated
- [ ] Links tested
- [ ] Images added
- [ ] Mobile responsive verified
- [ ] Payment gateway configured
- [ ] Contact form working
- [ ] Analytics set up
- [ ] Domain configured
- [ ] SSL certificate active

## 📊 Analytics

Add Google Analytics tracking ID to see:
- Page views
- User engagement
- Event tracking
- Conversion rates

## 🔐 Security

- Always use HTTPS
- Validate forms
- Don't store sensitive data
- Update dependencies regularly
- Backup files regularly

## 💡 Pro Tips

1. Use browser DevTools (F12) for debugging
2. Test on multiple devices
3. Use Chrome Lighthouse for audits
4. Monitor page load time
5. Keep content fresh and updated

---

**Last Updated**: February 20, 2026
**Version**: 1.0.0
