# Personal Resume Site

A clean, static personal site for an AI Infrastructure Engineer — experience,
skills, education, projects, and a writing section for articles/posts that
aren't on your resume. Built with **Next.js + Tailwind**, deploys to **Vercel**.

## Run it locally

```bash
npm install      # first time only
npm run dev      # then open http://localhost:3000
```

`npm run build` produces the production build.

## Where your content lives (this is all you edit)

**Everything is Markdown** in the `content/` folder. Edit the text, commit, push —
the site rebuilds itself. You never touch the code.

| File / folder                | What it controls                                  |
| ---------------------------- | ------------------------------------------------- |
| `content/profile.md`         | Name, title, tagline, contact links, about text   |
| `content/experience/*.md`    | Work history — one file per role                  |
| `content/education/*.md`     | Schools / programmes / certs — one file each      |
| `content/projects/*.md`      | Project cards — one file each                     |
| `content/skills.md`          | Skill groups (`## Group` + `- item` lists)        |
| `content/articles/*.md`      | Articles — one Markdown file per post             |

**How each file works:** the part between the `---` lines at the top (the
"frontmatter") holds the structured fields — dates, company, tags. The text
*below* the second `---` is the prose. For a role, the first line is the
summary and each `- ` line becomes a bullet. Open any existing file in a folder
to copy its shape.

**Ordering:** files in a folder show in filename order, so the number prefixes
(`1-`, `2-`, …) control what appears first. Rename to reorder.

### Adding a role / school / project

Copy an existing file in that folder, rename it (bump the number prefix to place
it), and edit the fields. It appears automatically — no code changes.

### Adding an article

Drop a new `.md` file in `content/articles/`. Start it with frontmatter:

```markdown
---
title: "My Post Title"
date: "2026-06-13"
excerpt: "One-line summary shown in the list."
tags: ["MLOps", "Notes"]
---

Write your post in Markdown here.
```

It appears automatically on `/writing` and the homepage — no code changes.

### Adding a downloadable resume PDF

Put `resume.pdf` in the `public/` folder, then set
`resumePdf: "/resume.pdf"` in the frontmatter of `content/profile.md`.

## About the LinkedIn data

The experience/education/skills were **pre-filled from your public LinkedIn**
(`linkedin.com/in/cosq`). LinkedIn hides most profile detail behind a login and
**blocks automated access / live API sync** for personal sites (it's against
their Terms of Service, and there's no free public API for it). So this site
keeps that information as **static files you control** — which is also what makes
it fast, free to host, and reliable.

Look for `TODO:` comments in `content/experience/` and `content/education/`
to fill in the exact titles, dates, and details LinkedIn didn't expose.
**Tip:** LinkedIn → *Me → Settings → Data privacy → Get a copy of your data*
gives you an export you can copy details from.

## Deploy to Vercel (when you're ready)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Framework preset auto-detects **Next.js**. Click **Deploy**. Done.

No environment variables or database needed — it's fully static.
