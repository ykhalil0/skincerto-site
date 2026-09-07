# Cheek / lower-eyelid construction review

This is a **static construction for review**, not a simulated closure, validated
anatomy, or patient reconstruction. The approved MPFB source remains unchanged
in `../mpfb-review/`. Its exact hash is recorded in `anatomy.json`.

Open the development fixture `/anatomy-review.html` or `/?review=anatomy`.
Use Surface, Fat, Muscle and Supports to uncover the represented components.
The separation control translates layers rigidly for inspection; it does not
simulate undermining or pulling. The inspection window is not the ellipse cut.

`anatomy.glb` contains separate, triangulated closed review volumes for dermis,
superficial/deep fat, passive orbicularis, lower tarsus, globe, orbital/deeper
support scaffolds, canthal/retaining attachment representations and release
plane. The contextual head and its cosmetic parts are separate surfaces.
There are no tet elements, assigned constitutive parameters or active contacts.

Exports use glTF metres, Y-up, with anterior +Z. The viewer converts to
millimetres once. The manifest's explicitly suffixed `Mm` coordinates are
already in millimetres. Do not apply the viewer's conversion to those values.

The source eye fit produces a globe approximately 30.8 mm in diameter; this is
a generator-derived dimension, **not an accepted anatomical norm**. A smooth
local lower-lid surface adjustment creates space for the proposed layer stack.
Its measured extent and displaced-vertex count are recorded, with review pending.
It is not evidence that the generator's eye/lid anatomy is clinically correct.

Clinical review must resolve scale, local layer placement, canthal sites,
orbital support shape and release plane. The manifest records omitted structures.
Colors and fine material textures are illustrative. The source sheet links the
primary research informing the proposed relationships and dimensions.

Rebuild using `tools/blender/build_cheek_anatomy.py`; see the reproduction
instructions in `tools/blender/README.md`. Editable authoring output belongs in
ignored `artifacts/anatomy-review/`. Do not import it into the closure solver
until the explicit anatomical review gate has been completed.
