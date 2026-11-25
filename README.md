# Website

Personal Website using NextJS

## Deployed link

[rahulsbeelur](https://rahulsbeelur.com/)

This is a Next.js project bootstrapped with create-next-app.

## Getting started

First, run the development server:

```
npm install

npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## Managing website content

Use the guided content menu for routine updates:

```bash
npm run new:content
```

To see the available commands in the terminal:

```bash
npm run content:help
```

The complete [content management guide](docs/CONTENT_GUIDE.md) explains which command or source file updates every page and section, what each prompt asks, where the result is saved, and how to preview and verify it.

## Scripts

### Development

- `npm run dev` - Start development server with local environment variables
- `npm run build` - Build the application for production
- `npm run start` - Start production server with production environment variables

### Code Quality

- `npm run lint` - Run ESLint with auto-fix
- `npm run lint-check` - Run ESLint without auto-fix (check only)
- `npm run format` - Format code with Prettier
- `npm run format-check` - Check code formatting without fixing

### Content Creation

- `npm run content:help` - Print the page-to-command content index
- `npm run new:content` - Interactive creator for every repeatable content section
- `npm run new:blog` - Create a new blog post with guided prompts
- `npm run new:build` - Add a dated update to a build-in-public project
- `npm run new:build-project` - Create a build-in-public project
- `npm run content:fill-build-updates` - Fill every build project to at least 10 updates without overwriting existing notes
- `npm run new:portfolio-project` - Add a project to `/projects`
- `npm run new:experience` - Add a work-experience entry to `/resume`
- `npm run new:education` - Add an education entry to `/resume`
- `npm run set:languages` - Update the languages shown on `/resume`
- `npm run new:content:git -- <type>` - Optionally create, validate, commit, and push content on a new branch

## Publishing content

Run `npm run new:content` for one guided menu covering blog posts, build projects, build updates, portfolio projects, work experience, education, and languages. Each flow asks for the fields required by its page and validates the generated content.

See [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) for the page and section map, every authoring command, editing existing content, the maintenance command, and the optional Git workflow.

### Build in public

Create a project once:

```bash
npm run new:build-project
```

Then publish each work session with:

```bash
npm run new:build
```

The build-update command asks which project changed, what was done, the status, overall progress, time invested, next step, tags, and a Markdown note. It creates a validated file in `modules/building/mdx`, updates the project progress in `modules/building/projects.yml`, and renders the entry on both the homepage and `/building`.

More than one build project can be active at the same time. The project command never pauses another active project automatically.

If you prefer to author manually, use this frontmatter shape:

```mdx
---
title: 'The first useful feedback loop'
summary: 'A concise description of what moved.'
publishedAt: '2026-11-24'
project: 'harness-engineering'
status: 'in-progress' # exploring | in-progress | shipped | blocked
progress: 28
timeSpent: '2h 20m'
shipped: ['One concrete change', 'Another concrete change']
next: 'The next useful step.' # optional
tags: ['Agents', 'Evals'] # optional
---

Write the public build note here.
```

### Blog

Run `npm run new:blog` to create a long-form post in `modules/blog/mdx`. Reading time is calculated during the build, so it should not be added to frontmatter manually. The existing blog index and article pages remain independent from the build log.

### Portfolio projects

Put the project image in `public/projects`, then run:

```bash
npm run new:portfolio-project
```

The command checks that the image exists, requires a technology list and summary, validates the live/GitHub URLs, and creates the numbered MDX entry rendered at `/projects`.

### Resume

Use the guided commands instead of writing frontmatter by hand:

```bash
npm run new:experience
npm run new:education
npm run set:languages
```

Experience entries ask for the company, role, dates, and impact points. Education asks for the institution, course, location, score, and years. Each entry is validated and appears automatically on `/resume`.

## Automatic deployment

Vercel's Git integration deploys every push to `main` and reports the production status directly on the GitHub commit. Deployment is managed by the linked Vercel project, so this repository does not need a second token-based deployment workflow.

## Formatting

```
npm run format
```

## Linting

```
npm run lint
```

## Concept

Data present in MDX/MD files is harnessed for Static Site Generation (SSG) with NextJS, enabling the static population of pages during the build phase. This approach significantly enhances page performance for static websites. SSG optimizes loading times and streamlines updates to the website's data, ensuring ease of maintenance and facilitating efficient content modifications. [SSG](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
