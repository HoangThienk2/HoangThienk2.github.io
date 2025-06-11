#!/bin/bash

echo "🚀 Deploying to GitHub Pages..."

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
    git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
fi

# Add all files
git add .

# Commit changes
git commit -m "Deploy SquidGame to GitHub Pages - $(date)"

# Push to GitHub
git push -u origin main

echo "✅ Deployed to GitHub Pages!"
echo "🌐 Your game will be available at: https://USERNAME.github.io"
