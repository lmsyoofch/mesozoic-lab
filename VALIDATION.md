# Validation

- Next.js production build completed successfully, including TypeScript and static generation for `/` and `/credits`.
- All local model and thumbnail paths in the model registry exist. The bundled Triceratops GLB header and declared length are valid.
- The home page opens in the 360° Explorer. Body systems remains available as a tab. Eight systems each contain three selectable structures. System search, structure selection and specimen switching use local React state.
- Existing 360° viewer, comparison, timeline, field-school lessons, Spinosaurus fallback and creator credits are retained.
- ZIP archives were closed before validation and passed a complete archive CRC check.
- No browser interaction or live WebGL rendering test was performed on this update. External Sketchfab availability still depends on the provider, browser and network.
- Functional diagrams are not positioned organ reconstructions. No detachable 3D soft-tissue layers are claimed.

Deployment instructions are in README.md. This download does not update a previously published website.

## Life reconstruction update

Eight image records have named artist credits, source pages and licence links. The new view has loading and error states with source links. Public source records were checked. All eight original image assets were downloaded successfully and bundled in public/reconstructions. Their visual content was inspected separately from the website. No browser rendering verification was performed.

## White theme update

White surfaces and dark text applied across the main views, menus, dialogs and reconstruction captions. Core text, green accent and all eight system label colours exceed 4.5:1 contrast against white. Sketchfab uses its light interface with transparent background requested; provider model textures and environments are not recoloured. No browser visual QA performed.

## Interactive 3D life reconstructions

Eight source model metadata records were retrieved from the public Sketchfab API; preview images were inspected for fleshed-out appearance. Thumbnails and model files are not bundled. Life view uses the existing viewerready-event integration, with a 60-second failure timeout, retry and explicit illustration fallback. Browser interaction and live WebGL rendering have not been tested. Source availability can change.
