# Mesozoic Lab · Dinosaur body systems atlas

Created by **Foo Huey Chyun**.

## White background theme

The website now uses a white background with dark text, green accents and light panels across the explorer, body systems, comparison, field school and credits. The default remains the 360° Explorer. Model textures and reconstruction artwork are unchanged.

## Life reconstruction view

Each dinosaur now has a Life reconstruction tab beside the 360° specimen. Eight artist illustrations show possible fleshed-out appearances, with credit, source and licence links. These are reconstructions, not photographs of living dinosaurs. The website still opens in the 360° Explorer.

All eight illustrations are bundled in `public/reconstructions`, so the deployed site serves them locally. If an image cannot load, the view offers its source page. All image records are in `app/reconstructions.ts`. No additional edits are applied to the source images.

## Body systems

The website opens in the 360° Explorer, with Body systems available as a tab, inspired by the interaction approach of Human Atlas. Eight systems contain 24 selectable structures with function, fossil evidence, inference limits and scientific reading. Search finds structures across systems. Switch between functional diagrams and the existing 360° specimen viewer, with all eight dinosaur profiles available.

These are **functional schematics**, not anatomically positioned organ layers. No claim is made that the fossil models contain detachable organs. The species viewer, comparison, field school, creator credits and lighter Spinosaurus embed remain available. A research-grade layered 3D atlas would require separately sourced and reviewed segmented anatomical models.

# Mesozoic Lab

Created by Foo Huey Chyun.

A dinosaur learning website with eight taxa, 360° specimen views, comparisons, a geological timeline and six guided palaeontology lessons.

## Publish with GitHub and Vercel

1. Extract this ZIP. Open the extracted `mesozoic-lab-vercel` folder.
2. Create a repository in GitHub. Upload the contents of this folder, including `app`, `public`, `package.json`, `package-lock.json`, `next.config.ts` and `vercel.json`. Upload the extracted files, not the ZIP. Keep `package.json` at the repository root. Do not upload `node_modules`, `.next` or `PREBUILT-SITE.zip`.
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

## Interactive 3D life reconstruction update

Life reconstruction now opens a textured, rotatable 3D surface model for each of the eight taxa. Switch to Illustration for the locally included artwork. Loading failures offer retry, the original hosted viewer and an illustration fallback. The white theme and 360° Explorer default are retained. These are artistic surface reconstructions, not detachable organ models.

Models are hosted by their creators on Sketchfab and need internet access and WebGL; model files are not bundled. Source metadata and specific credits are in app/life-models.json and /credits. Hosted viewing does not grant download or redistribution rights.

## Tyrannosaurus anatomy explorer

Explore anatomy opens a local interactive schematic with six selectable systems and 18 structures. Rotate and zoom, use side/front/top camera presets, isolate a system or adjust the body outline. Every structure has function, evidence, uncertainty and source information. These are original simplified teaching meshes by Foo Huey Chyun, not specimen scans or validated organ reconstructions. All geometry is generated locally with Three.js and needs WebGL but no external model service. Existing hosted life and specimen views are retained. The default remains the 360° Explorer. Keyboard users can select all structures through the adjacent buttons.
