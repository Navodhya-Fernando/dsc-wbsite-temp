# GitHub Pages Deployment Guide

## Quick Setup (5 minutes)

### 1. Create GitHub Repository

```bash
# Navigate to your project directory
cd dsc-website

# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: DSC Website"

# Add remote repository
git remote add origin https://github.com/yourusername/dsc-website.git

# Rename branch if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch (or your preferred branch)
5. Select **/ (root)** folder
6. Click **Save**
7. GitHub will build and deploy your site
8. Your site will be available at: `https://yourusername.github.io/dsc-website/`

### 3. Verify Deployment

- Wait 2-3 minutes for deployment
- Visit your site URL
- Check if all pages load correctly
- Test responsive design on mobile

## Automated Deployment

Every time you push to the main branch, GitHub will automatically rebuild and deploy your site.

### Push Updates

```bash
# Make changes to files
# Then push to GitHub

git add .
git commit -m "Updated event information"
git push origin main
```

## Custom Domain (Optional)

### Add Custom Domain

1. Purchase a domain (GoDaddy, Namecheap, etc.)
2. Go to repository Settings → Pages
3. Under "Custom domain", enter your domain (e.g., `dsc.nibm.lk`)
4. Save
5. Update DNS records at your domain provider:
   - **A Records**:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME Record** (if using subdomain):
     ```
     yourusername.github.io
     ```

6. Wait 24 hours for DNS propagation
7. GitHub will automatically create SSL certificate

## Project Settings

### Update package.json

If deploying as subdomain, update homepage:

```json
{
  "homepage": "https://dsc.nibm.lk",
  ...
}
```

### .gitignore Configuration

Already configured to ignore:
- Node modules
- Build artifacts
- IDE files
- OS files
- Environment variables

## Troubleshooting

### Site Not Showing

- Wait 2-3 minutes for deployment
- Check GitHub Actions tab for build errors
- Verify `index.html` is in root directory
- Clear browser cache

### Assets Not Loading

- Ensure relative paths are correct
- Check file extensions match
- Verify files are committed to git

### Custom Domain Issues

- Verify DNS records are correct
- Check email for GitHub verification
- Wait for DNS propagation (up to 48 hours)

### 404 Page Not Found

- Ensure routing uses `index.html` structure
- Check file names for typos
- Verify case sensitivity (Linux servers are case-sensitive)

## Performance Tips

1. **Compress Images**
   ```bash
   # Using ImageMagick
   convert large-image.jpg -quality 85 -resize 1920x1080 optimized.jpg
   ```

2. **Minimize CSS/JS** (for production)
   ```bash
   npm install -g minify
   minify css/styles.css > css/styles.min.css
   minify js/main.js > js/main.min.js
   ```

3. **Enable Gzip Compression**
   - GitHub Pages enables this automatically

4. **Cache Busting**
   - Add version number to files: `styles.css?v=1.0.0`

## Backup & Recovery

### Create Backup

```bash
# Clone latest version
git clone https://github.com/yourusername/dsc-website.git backup/

# Or create local backup
cp -r dsc-website/ dsc-website-backup/
```

### Restore from Backup

```bash
# Revert to previous commit
git log --oneline  # Find commit hash
git revert <commit-hash>
git push origin main
```

## Advanced: GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        run: |
          echo "Deploying to GitHub Pages"
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
```

## Monitoring & Analytics

### Add Google Analytics

1. Create Google Analytics account
2. Get Tracking ID (format: UA-XXXXXXXXX-X)
3. Add to all pages:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXXX-X');
</script>
```

## Maintenance Schedule

- **Weekly**: Check for broken links
- **Monthly**: Update event information
- **Quarterly**: Review analytics and performance
- **Annually**: Security audit and dependency updates

## Support

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Email: dsc@nibm.lk

---

**Last Updated**: February 2026
