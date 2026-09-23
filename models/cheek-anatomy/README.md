# Cheek / lower-eyelid construction review

This is a **static construction for review**, not a simulated closure, validated
anatomy, or patient reconstruction. The approved MPFB source remains unchanged
in `../mpfb-review/`. Its exact hash is recorded in `anatomy.json`.

Open Anatomy in the app (`/?view=anatomy`).
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

The preserved source eye fits a globe approximately 30.8 mm in diameter. The
derived construction refits **both visible eyes** to a nominal 25 mm diameter,
retaining their anterior apex and XY centers. The contact sphere is fitted from
the corrected visible eye, not scaled independently. Original external eyelids,
lashes and face proportions are retained; the previous right-only anterior lid
relief is removed. Anatomy and Workspace use the same reconstructed eyes.

The 25 mm assumption is informed by adult variation in Bekerman et al. (2014),
https://pubmed.ncbi.nlm.nih.gov/25431659/. It is **not a universal anatomical norm**,
patient measurement or clinically validated orbit. `eyeReconstruction` records
both original and corrected centers, scales, the source and pending review.
Tarsal clearance is measured against actual triangle interiors after rebuilding.

Clinical review must resolve scale, local layer placement, canthal sites,
orbital support shape and release plane. The manifest records omitted structures.
Colors and fine material textures are illustrative. The source sheet links the
primary research informing the proposed relationships and dimensions.

Rebuild using `tools/blender/build_cheek_anatomy.py`; see the reproduction
instructions in `tools/blender/README.md`. Editable authoring output belongs in
ignored `artifacts/anatomy-review/`. The derived mechanics are an engineering
prototype; clinical review remains separate from software acceptance.
