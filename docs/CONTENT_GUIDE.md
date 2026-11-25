# Content management guide

This guide maps every editable website section to the command or file that controls it. Run all commands from the repository root.

## Start here

For most updates, use the single guided menu:

```bash
npm run new:content
```

The menu creates or updates the correct content file, asks for required frontmatter, validates the answers, and avoids silently overwriting an existing entry.

To print the command list in the terminal:

```bash
npm run content:help
```

After changing content, preview and verify it:

```bash
npm run dev
npm run format
npm run lint-check
npm run build
```

The local preview is available at <http://localhost:3000>.

## Page and section map

| Page or section                                | How to update it                                                      | Source                                                      |
| ---------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| Homepage: profile photo                        | Replace the file, keeping the same name                               | `public/my-photo.jpeg`                                      |
| Homepage: hero and contact wording             | Edit directly                                                         | `pages/index.tsx`                                           |
| Homepage: active projects                      | Run `npm run new:build-project`; active projects appear automatically | `modules/building/projects.yml`                             |
| Homepage: recent build updates                 | Run `npm run new:build`; the newest two appear automatically          | `modules/building/mdx/`                                     |
| Homepage: blog preview                         | Run `npm run new:blog`; the newest three posts appear automatically   | `modules/blog/mdx/`                                         |
| Header: name and role line                     | Edit directly                                                         | `components/AppBar.tsx` and `modules/common/data/person.ts` |
| Header: navigation links                       | Edit directly                                                         | `components/HeaderNavigationButtons.tsx`                    |
| Blog page heading and SEO                      | Edit the frontmatter                                                  | `modules/pages/mdx/blog.mdx`                                |
| Blog posts                                     | Run `npm run new:blog`                                                | `modules/blog/mdx/`                                         |
| Build-log projects                             | Run `npm run new:build-project`                                       | `modules/building/projects.yml`                             |
| Build-log updates                              | Run `npm run new:build`                                               | `modules/building/mdx/`                                     |
| Projects page heading and SEO                  | Edit the frontmatter                                                  | `modules/pages/mdx/projects.mdx`                            |
| Portfolio project cards                        | Add the image, then run `npm run new:portfolio-project`               | `public/projects/` and `modules/projects/mdx/`              |
| Resume heading, profile, focus and metrics     | Edit the frontmatter                                                  | `modules/pages/mdx/resume.mdx`                              |
| Resume experience                              | Run `npm run new:experience`                                          | `modules/resume/mdx/work-experience/`                       |
| Resume education                               | Run `npm run new:education`                                           | `modules/resume/mdx/education/`                             |
| Resume languages                               | Run `npm run set:languages`                                           | `modules/resume/mdx/speak/languages.mdx`                    |
| Email and social profiles                      | Edit directly                                                         | `modules/common/data/person.ts`                             |
| Desktop and mobile footer wording              | Edit directly                                                         | `components/Footer.tsx` and `components/MobileFooter.tsx`   |
| Site colours, typography and component styling | Edit directly                                                         | `styles/globals.css` and `styles/editorial.css`             |

## Content commands

### One menu for everything

```bash
npm run new:content
```

Choose blog post, build update, build project, portfolio project, work experience, education, or languages.

### Add a blog post

```bash
npm run new:blog
```

The command asks for a title, one-sentence summary, publish date, and optional tags. It creates an MDX file in `modules/blog/mdx/`. Write the article below the generated frontmatter. Reading time is calculated automatically.

The publish date controls ordering on both `/` and `/blog`.

### Add a build-in-public project

```bash
npm run new:build-project
```

The command asks for the project name, description, goal, status, start date, progress, current focus, stack, and optional links. It adds the project to `modules/building/projects.yml`.

Project status can be:

- `active` — shown in the active project area on `/` and `/building`
- `complete` — shown in the completed archive
- `paused` — shown as stopped in the archive

More than one project can be active at once.

### Add a build update

```bash
npm run new:build
```

The command lets you choose a project and asks for the update title, summary, date, status, overall progress, time spent, completed work, next step, tags, and a Markdown note. It creates a file in `modules/building/mdx/` and updates that project's progress in `modules/building/projects.yml`.

Update status can be `exploring`, `in-progress`, `shipped`, or `blocked`.

The newest two updates appear on `/`. The newest 12 appear on `/building`. Each project page shows its full history.

### Add a portfolio project

First place the project image in `public/projects/`, then run:

```bash
npm run new:portfolio-project
```

The command requires a project name, summary, technologies, an existing image filename, and at least one live or GitHub URL. It creates a numbered MDX file in `modules/projects/mdx/` and displays it on `/projects`.

### Add work experience

```bash
npm run new:experience
```

The command asks for company, role, start date, optional end date, and comma-separated impact points. Leave the end date blank for a current role. It creates an entry in `modules/resume/mdx/work-experience/`.

### Add education

```bash
npm run new:education
```

The command asks for institution, degree, optional field, location, score, and start/end years. It creates an entry in `modules/resume/mdx/education/`.

### Update languages

```bash
npm run set:languages
```

Enter the complete comma-separated list. This replaces the current language list in `modules/resume/mdx/speak/languages.mdx`.

## Editing or removing existing content

Creation commands add new entries. To edit an existing entry, change its MDX or YAML source directly using the paths in the page map. To remove an entry, delete only that entry's file. Build projects live together in `modules/building/projects.yml`, so remove only the intended YAML project block.

When changing a slug or filename, check for links to the old URL first:

```bash
rg "old-slug" . --glob '!node_modules/**' --glob '!.next/**'
```

## Maintenance command

```bash
npm run content:fill-build-updates
```

This fills any build project with fewer than 10 updates using structured starter entries. It never overwrites an existing update. It is a seeding/maintenance tool, not the normal way to publish real daily progress; use `npm run new:build` for real updates.

## Optional Git publishing helper

```bash
npm run new:content:git -- blog
```

Replace `blog` with `build`, `build-project`, `portfolio-project`, `experience`, `education`, or `languages`.

This helper requires a completely clean Git working tree. It creates a new `content/...` branch from the currently checked-out branch, runs the selected authoring flow, checks formatting and lint rules, commits the result, and pushes the new branch to `origin`. Use the normal content commands when you do not want an automatic commit and push.

## Command reference

| Command                              | Purpose                                                    |
| ------------------------------------ | ---------------------------------------------------------- |
| `npm run content:help`               | Print the content command index                            |
| `npm run new:content`                | Open the all-content menu                                  |
| `npm run new:blog`                   | Add a blog post                                            |
| `npm run new:build-project`          | Add a build-in-public project                              |
| `npm run new:build`                  | Add an update and refresh project progress                 |
| `npm run new:portfolio-project`      | Add a card to `/projects`                                  |
| `npm run new:experience`             | Add work experience to `/resume`                           |
| `npm run new:education`              | Add education to `/resume`                                 |
| `npm run set:languages`              | Replace the resume language list                           |
| `npm run content:fill-build-updates` | Seed projects that have fewer than 10 updates              |
| `npm run new:content:git -- <type>`  | Create content on a branch, commit it, and push it         |
| `npm run dev`                        | Start the local website                                    |
| `npm run format`                     | Format repository files                                    |
| `npm run format-check`               | Check formatting without changing files                    |
| `npm run lint`                       | Run ESLint and apply safe fixes                            |
| `npm run lint-check`                 | Check ESLint without changing files                        |
| `npm run build`                      | Build and validate the production website                  |
| `npm run start`                      | Serve an existing production build using `.env.production` |

## Before publishing

1. Preview the affected desktop and mobile pages with `npm run dev`.
2. Confirm dates, links, images, project progress, and ordering.
3. Run `npm run format`.
4. Run `npm run lint-check`.
5. Run `npm run build`.
6. Commit and push only after all three checks pass.
