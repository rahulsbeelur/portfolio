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

- `npm run new:content` - Interactive content creator (choose blog or quick-read)
- `npm run new:blog` - Create a new blog post with guided prompts
- `npm run new:quick-read` - Create a new quick read with guided prompts

## Publishing writing

Run `npm run new:blog` or `npm run new:quick-read` for a dedicated authoring flow. `npm run new:content` asks which of those two you want, then uses the same questions. Each flow writes a new MDX file and will not overwrite an existing slug.

You can also add a `.mdx` file manually in `modules/blog/mdx` for long-form writing or `modules/quick-reads/mdx` for the swipe feed. Reading time is calculated during the build, so never add it to frontmatter manually.

Quick reads support one broad `area` plus as many granular `topics` as needed:

```mdx
---
title: Your idea
summary: A concise description.
publishedAt: '2026-11-14'
area: AI
topics: ['Inference', 'Evaluation']
series: 'Operating AI in production' # optional
seriesOrder: 1 # optional; controls card order in the series
---
```

Areas and topics are discovered from this frontmatter automatically. Series appear as stacked cards and open a focused feed containing only the posts in that series.

## Automatic deployment

The included GitHub Actions workflow deploys every push to `main`. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as GitHub repository secrets before using it. If this repository is already connected to Vercel through its Git integration, Vercel can deploy on push itself and the workflow is optional.

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
