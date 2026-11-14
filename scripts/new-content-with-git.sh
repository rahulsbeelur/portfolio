#!/bin/bash

# Script to create a new branch from develop, add content, commit, and push
# Usage: ./scripts/new-content-with-git.sh [blog|quick-read]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository"
    exit 1
fi

# Check if develop branch exists
if ! git show-ref --verify --quiet refs/heads/develop; then
    print_error "Develop branch does not exist"
    exit 1
fi

# Get current branch
current_branch=$(git branch --show-current)
print_status "Current branch: $current_branch"

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_warning "You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Determine content type
content_type="${1:-blog}"
if [ "$content_type" != "blog" ] && [ "$content_type" != "quick-read" ]; then
    print_error "Invalid content type. Use 'blog' or 'quick-read'"
    exit 1
fi

# Generate branch name based on content type and timestamp
branch_name="content/$(date +%Y%m%d-%H%M%S)-$content_type"
print_status "Creating new branch: $branch_name"

# Switch to develop and pull latest
git checkout develop
git pull origin develop

# Create new branch
git checkout -b "$branch_name"

# Run the appropriate content creation script
print_status "Creating new $content_type..."
if [ "$content_type" = "blog" ]; then
    npm run new:blog
else
    npm run new:quick-read
fi

# Check if any files were created/modified
if git diff --quiet && git diff --cached --quiet; then
    print_warning "No changes detected. Exiting without commit."
    git checkout develop
    git branch -D "$branch_name"
    exit 0
fi

# Add all changes
git add .

# Commit changes
commit_message="Add new $content_type: $(date +%Y-%m-%d)"
git commit -m "$commit_message"

# Push to origin
print_status "Pushing to origin..."
git push -u origin "$branch_name"

print_status "Done! Branch '$branch_name' has been created and pushed to origin."
print_status "You can now create a pull request on GitHub."
