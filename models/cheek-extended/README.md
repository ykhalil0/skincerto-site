# Extended cheek cut source

Generated from the same authored, eye-corrected anatomy as `cheek-mechanics`.
Only repairs which cannot fit the original surface use this mesh. Original
reference domains, presets and acceptance fingerprints remain unchanged.

The chart boundary is extended 4 mm laterally/inferiorly, keeping the original
superior/medial limits. This contains the reference 15 mm defect's 45 mm vertical
ellipse while keeping the mouth outside the moving patch. The 8 mm development
candidate was rejected after visual review of the oral corner.

Scale, texture attachment, globe, supports, muscle, deep fat, tarsus and canthal
attachments come from the same source construction. The internal structures are
numerically identical to the original source. Geometry and passive material
assumptions remain uncalibrated. No new anatomical claim is made by this extension.

`context.glb` uses glTF metres, converted once into simulation millimetres.
`surface.json` contains XYZ in mm and the construction chart. It records both
parent-anatomy and geometry hashes. See `LICENSE.txt` and the parent anatomy's
component licensing records.

Reproduction (Blender 4.5.12 LTS):

```sh
blender --background --factory-startup --offline-mode --python-exit-code 1 \
  --python tools/blender/build_cheek_domain.py -- \
  --blend artifacts/eye-correction/authoring/cheek-anatomy.blend \
  --output public/models/cheek-extended --spacing-scale 1 --margin-mm 4
node tools/qa/extended-cheek.mjs
```

These cuts open for manual stitching. Automatic closure evidence from the smaller
mesh is not carried over. Runtime construction checks still reject incomplete
edges, pinned boundaries and missing tissue layers. The superior tip may lie in
skin without carried fat; the original circular defect must remain fully below
that layer transition.
