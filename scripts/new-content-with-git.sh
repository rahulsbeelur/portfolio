#!/bin/bash

# Create a content branch from the current branch, add content, commit, and push it.
# Usage: npm run new:content:git -- [blog|build|build-project|portfolio-project|experience|education|languages]

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

# Use the current branch as the base. This works with main and with feature branches.
base_branch=$(git branch --show-current)
if [ -z "$base_branch" ]; then
    print_error "Check out a branch before running this command"
    exit 1
fi
print_status "Base branch: $base_branch"

# Require a completely clean tree, including untracked files, so `git add .` is scoped
# to the content created by this command.
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted or untracked changes. Commit or stash them first."
    exit 1
fi

# Determine content type
content_type="${1:-blog}"
case "$content_type" in
    blog|build|build-project|portfolio-project|experience|education|languages) ;;
    *)
        print_error "Invalid content type. Use blog, build, build-project, portfolio-project, experience, education, or languages"
        exit 1
        ;;
esac

# Generate branch name based on content type and timestamp
branch_name="content/$(date +%Y%m%d-%H%M%S)-$content_type"
print_status "Creating new branch: $branch_name"

# Create a new branch from the exact commit that is currently checked out.
git checkout -b "$branch_name"

# Run the appropriate content creation script
print_status "Creating new $content_type..."
case "$content_type" in
    blog) npm run new:blog ;;
    build) npm run new:build ;;
    build-project) npm run new:build-project ;;
    portfolio-project) npm run new:portfolio-project ;;
    experience) npm run new:experience ;;
    education) npm run new:education ;;
    languages) npm run set:languages ;;
esac

# Check tracked and untracked files created by the authoring command.
if [ -z "$(git status --porcelain)" ]; then
    print_warning "No changes detected. Exiting without commit."
    git checkout "$base_branch"
    git branch -D "$branch_name"
    exit 0
fi

print_status "Checking formatting and lint rules..."
npm run format-check
npm run lint-check

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
