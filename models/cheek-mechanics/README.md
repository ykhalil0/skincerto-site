# Curved cheek mechanics source

Derived from the reviewed `cheek-anatomy` Blender construction by
`tools/blender/build_cheek_domain.py`. The approved MPFB and anatomy GLBs are
preserved. This asset is a development increment, not validated patient anatomy.

- `context.glb`: glTF metres, Y-up, +Z anterior. Original source texture UVs.
  The renderer converts once to millimetres. Only the exterior/eye context is
  shown; inspection-only internal shapes are not part of the moving view.
- `surface.json`: rest-surface XYZ and construction chart in **millimetres**,
  triangles, UVs, normals, true eye-margin samples, pinned artificial boundary,
  sampled tarsal, muscle and deep-fat surfaces, canthal sites, the fitted globe
  and closed rigid support colliders.
  Runtime construction makes the cut and the volumetric elements. No animation
  poses or cosmetic wound covers are baked into this source.

The source records its parent anatomy GLB SHA-256 and a hash of its mechanics
geometry. The maxillary scaffold has a recorded posterior clearance correction
(up to 21.0355 mm); its location is an uncalibrated authoring assumption. The original generator scale
and anatomical assumptions remain uncalibrated. Preparation reserves room for
the dermal thickness at the source's display-only lid rim; its maximum extra
anterior adjustment is recorded in `surfaceRefinement` (6.032519 mm). Some
adjustments are on previously recessed inner/upper display-rim surfaces. This
is explicit authoring geometry, not a physiological movement or measurement.
Clinical review and further visual refinement remain necessary.

The construction chart covers one anterior cheek/lower-lid region; nasal and
oral folds and the upper lid lie outside the simulated region. A 0.05 mm weld
removes almost-coincident authoring seam points before Float32 chart conversion.
Background sampling is 2.8 mm with 1.4 mm wound/lid sampling and a separately
conforming incision. Runtime physics and measurements use XYZ, never the chart.

The `surface.json` data uses CC0-derived MPFB surface coordinates plus original
Skincerto remeshing/construction. See `LICENSE.txt` and the parent assets' license
records. The MakeHuman/MPFB application code itself is not embedded in the app.
