# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js app to GitHub Pages for free.

## Prerequisites
- A GitHub account
- Git installed on your machine

## Step-by-Step Deployment Instructions

### 1. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - ready for GitHub Pages"
```

### 2. Create a GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `orlando-trip` (or any name you prefer)
3. **Do NOT** initialize with README, .gitignore, or license (since you already have files)
4. Keep it **public** (required for free GitHub Pages)

### 3. Connect Your Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### 4. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically trigger on your next push

### 5. Wait for Deployment
- Go to the **Actions** tab in your repository
- You'll see the "Deploy to GitHub Pages" workflow running
- Wait for it to complete (usually 2-5 minutes)

### 6. Access Your Site
Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Important Notes

### Base Path Configuration
The app is configured to work with a repository-based URL (e.g., `/orlando-trip`). If you want to use a custom domain or deploy to `username.github.io` (root domain):

1. Remove the basePath from `next.config.mjs`:
   ```javascript
   basePath: '', // Keep empty for root domain
   ```

2. Update the workflow file (`.github/workflows/deploy.yml`):
   ```yaml
   NEXT_PUBLIC_BASE_PATH: '' # Remove or set to empty
   ```

### Troubleshooting

**Build fails?**
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Make sure there are no TypeScript errors (or they're ignored in config)

**404 errors on routes?**
- GitHub Pages doesn't support client-side routing by default
- The current setup should handle this, but if issues persist, you may need to add a custom 404.html

**Assets not loading?**
- Ensure `images.unoptimized: true` is in `next.config.mjs` (already configured)
- Check that asset paths are relative, not absolute

## Local Testing
To test the static export locally before deploying:

```bash
pnpm run build
npx serve out
```

This will serve your static site at `http://localhost:3000`

## Re-deploying
Every time you push to the `main` branch, GitHub Actions will automatically rebuild and redeploy your site:

```bash
git add .
git commit -m "Update site"
git push
```

## Manual Deployment Trigger
You can also manually trigger deployment from the GitHub Actions tab by clicking "Run workflow".
