# Mesozoic Lab · Dinosaur body systems atlas

Created by **Foo Huey Chyun**.

## New in this version

The website opens in the 360° Explorer, with Body systems available as a tab, inspired by the interaction approach of Human Atlas. Eight systems contain 24 selectable structures with function, fossil evidence, inference limits and scientific reading. Search finds structures across systems. Switch between functional diagrams and the existing 360° specimen viewer, with all eight dinosaur profiles available.

These are **functional schematics**, not anatomically positioned organ layers. No claim is made that the fossil models contain detachable organs. The species viewer, comparison, field school, creator credits and lighter Spinosaurus embed remain available. A research-grade layered 3D atlas would require separately sourced and reviewed segmented anatomical models.

# Mesozoic Lab

Created by Foo Huey Chyun.

A dinosaur learning website with eight taxa, 360° specimen views, comparisons, a geological timeline and six guided palaeontology lessons.

## Publish with GitHub and Vercel

1. Extract this ZIP. Open the extracted `mesozoic-lab-vercel` folder.
2. Create a repository in GitHub. Upload the contents of this folder, including `app`, `public`, `package.json`, `package-lock.json`, `next.config.ts` and `vercel.json`. Upload the extracted files, not the ZIP. Keep `package.json` at the repository root. Do not upload `node_modules` or `.next`.
3. In Vercel, choose Add New → Project. Import the GitHub repository.
4. Use the Next.js framework preset. Build command: `npm run build`. Install command: `npm ci`. Keep the root directory at the repository root and leave the output directory at its framework default. Use Node.js 22.x or newer.
5. Choose Deploy. No environment variables, API keys or database are required.

Official guide: https://vercel.com/docs/git/vercel-for-github

The site uses a standard Next.js static export. This package contains no ChatGPT hosting identity, private access configuration or credentials. Publishing through Vercel uses your Vercel access settings; the original private ChatGPT site is not changed by this download.

## Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:3000. To verify production output:

```bash
npm run build
```

The generated static site is in `out/`. The package also includes a prebuilt production copy in `PREBUILT-SITE.zip` if you prefer to deploy static files without rebuilding. Next.js `next start` is not used with static exports.

## Changes in this version

- Visible “Created by Foo Huey Chyun” credit.
- Dedicated `/credits` page plus CREDITS.md with source data, model authors and reuse terms.
- Spinosaurus replaced with a lower-polygon artistic reconstruction (70,018 triangles instead of 651,414).
- External viewers now wait for the actual Sketchfab `viewerready` event. A failed or stalled viewer shows an image, a retry button and an original-viewer link.
- Source adapted from the original hosting environment to standard Next.js for Vercel.

## Model and research limitations

Most 3D models require Sketchfab access, an internet connection and WebGL. A successful iframe document load does not prove the 3D scene loaded; this version checks the viewer event and falls back after 60 seconds. Providers can change availability. The Smithsonian Triceratops GLB is bundled (about 14 MB). The lighter Spinosaurus is an artistic reconstruction, with anatomical limitations explained in the site.

Lesson progress is session-only. Refreshing starts a new session.

Read CREDITS.md and preserve the on-site credits. Some models have non-commercial licences. Website creator credit does not imply ownership of third-party models or scientific research.
