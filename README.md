# Data Science Club - Official Website

A modern, responsive, and feature-rich website for the Data Science Club at NIBM, built with vanilla HTML5, CSS3, and JavaScript.

## 🌟 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Payment Integration**: Secure integration with payment gateways for membership registration
- **Event Management**: Comprehensive event listing, details, and registration
- **Resource Library**: Tutorials, articles, quizzes, and model papers
- **Project Showcase**: Display of club projects and research publications
- **Team Management**: Executive board and team member profiles
- **Contact Forms**: Easy communication with form validation
- **Performance Optimized**: Lightweight, fast-loading pages
- **SEO Friendly**: Proper meta tags and structure for search engines

## 📋 Website Structure

```
├── index.html                 # Home page
├── join.html                  # Membership registration
├── contact.html               # Contact page
│
├── about/
│   ├── index.html            # About main page
│   ├── mission-vision.html    # Mission & vision
│   ├── executive-board.html   # Team members
│   └── achievements.html      # Achievements & timeline
│
├── events/
│   ├── index.html            # Events listing
│   ├── nextgen-fest.html      # NextGen Fest details
│   ├── academic-events.html   # Workshops & seminars
│   └── past-events.html       # Previous events
│
├── projects/
│   ├── index.html            # Projects overview
│   ├── products-tools.html    # Tools & products
│   └── research-publications.html # Research papers
│
├── resources/
│   ├── index.html            # Resources hub
│   ├── tutorials.html         # Learning tutorials
│   ├── articles.html          # Articles & guides
│   ├── quizzes.html           # Knowledge quizzes
│   └── model-papers.html      # Practice papers
│
├── css/
│   ├── styles.css            # Main stylesheet
│   └── components.css        # Reusable components
│
├── js/
│   ├── main.js               # Core functionality
│   └── payment-redirect.js    # Payment gateway integration
│
├── assets/
│   ├── docs/                 # Documentation files
│   ├── icons/                # Icon files
│   └── images/               # Image assets
│
├── package.json              # NPM dependencies
└── requirements.txt          # Python dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (for local development server)
- A web browser
- Git (for version control)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dsc-website.git
cd dsc-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The site will be available at `http://localhost:8000`

### Build & Deployment

#### GitHub Pages (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy DSC website"
git push origin main
```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages
   - Select source branch (main)
   - Your site will be live at `https://yourusername.github.io/dsc-website/`

#### Other Hosting Platforms

- **Netlify**: Connect your GitHub repo, Netlify automatically deploys on push
- **Vercel**: Similar to Netlify, push to deploy
- **Traditional Hosting**: Upload files via FTP/SFTP to your web server

## 🔒 Payment Gateway Integration

### Setup Instructions

1. **Sign up with payment provider**
   - Register for a certified payment gateway (e.g., PayHere, Instamojo, etc.)
   - Get your merchant credentials

2. **Configure payment settings**
   - Open `js/payment-redirect.js`
   - Update the following:
   ```javascript
   this.gatewayURL = "https://your-payment-gateway.com/checkout";
   this.config = {
     merchantId: "YOUR_MERCHANT_ID",
     // ... other settings
   };
   ```

3. **Set return URLs**
   - Update `returnURL`, `cancelURL`, and `notifyURL` in payment-redirect.js
   - Create `payment-confirmation.html` for payment success page

4. **Testing**
   - Test with sandbox credentials first
   - Verify transaction flow before going live

### Security Notes

- **No financial data storage**: All payment processing is handled by external gateways
- **HTTPS only**: Ensure your domain has HTTPS certificate
- **PCI Compliance**: Use certified payment providers

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: Below 768px

## 🎨 Customization

### Colors & Theme

Edit `css/styles.css` CSS variables section:
```css
:root {
  --primary: #3b82f6;
  --secondary: #60a5fa;
  --accent: #f59e0b;
  /* ... more colors */
}
```

### Fonts

Change font-family in CSS variables:
```css
--font-family: "Your Font", sans-serif;
```

### Content

Edit HTML files directly to update:
- Text and descriptions
- Team member information
- Event details
- Links and navigation

## 📊 Analytics & Tracking

Add Google Analytics or similar:

1. Get tracking ID from analytics provider
2. Add to all pages in `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_ID');
</script>
```

## 🔧 Maintenance

### Regular Updates

- Update event information regularly
- Add new resources to library
- Refresh team member profiles
- Update contact information

### Performance

- Optimize images (compress before uploading)
- Minimize CSS/JS files for production
- Use browser caching headers
- Monitor page load times

### Security

- Keep dependencies updated
- Use HTTPS everywhere
- Validate all user inputs
- Regular security audits

## 📞 Support & Contact

For issues or questions:
- Email: dsc@nibm.lk
- Phone: +94 70 123 4567
- Location: National Innovation Centre, NIBM

## 📄 License

MIT License - Feel free to use and modify

## 👥 Contributors

- DSC Executive Board
- Web Development Team
- Design Team

## 🙏 Acknowledgments

- NIBM Administration for support
- Contributors and community members
- Open source libraries used (AOS, Swiper)

---

**Last Updated**: February 2026
**Version**: 1.0.0
