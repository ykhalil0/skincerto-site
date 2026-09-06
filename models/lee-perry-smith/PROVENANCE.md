# Human surface scan — visual review only

**Work:** Infinite, 3D Head Scan
**Creator:** Lee Perry-Smith / Infinite Realities; based on work at triplegangers.com.
**License:** Creative Commons Attribution 3.0 Unported, https://creativecommons.org/licenses/by/3.0/.
The supplied license is preserved verbatim in `LICENSE.txt`.

Downloaded 2026-09-05 from the Three.js **r180** distribution:
https://github.com/mrdoob/three.js/tree/r180/examples/models/gltf/LeePerrySmith

| Local file | Upstream name | SHA-256 |
| --- | --- | --- |
| head.glb | LeePerrySmith.glb | 402b8a8ac9f03232e6d64b5962929703a069daf99d3c49ac8eb0e48bedc9c576 |
| color.jpg | Map-COL.jpg | e976d73b31407f8d0967412bf468019ed26a5d5a32cf5811aabff7e816458a65 |
| normal.jpg | Infinite-Level_02_Tangent_SmoothUV.jpg | 36925e51ad9b324b94e8faf4692da1b4132809f2762bb8d5bd549ffd215d4ca6 |
| LICENSE.txt | LeePerrySmith_License.txt | 7cf4da43a6ae6d32f7f7d063fe129a19468af6f4fe7c53b937f83959709fcb50 |

Files are renamed but byte-for-byte unchanged. The application supplies lighting,
materials, camera controls, and image decode orientation. It does not reshape the
scan. The source mesh has 9,279 vertices and 17,684 triangles, one surface mesh,
and no embedded images, rig, animation, or internal anatomical layers.

## Review findings

- The surface captures recognizable cheek, nasal, lip, ear and forehead contours.
- The eyes are closed. There are no separate eyelid lamellae, globe, tarsal plate,
  facial muscles, fascia, fat compartments, nerves, vessels, or parotid duct.
- The upstream files do not establish a calibrated millimeter scale for our use.
  No defect measurement, patient registration or clinical prediction is made from
  this asset.
- One person's skin and facial proportions are not population coverage. Facial
  hair and baked texture shading also need consideration for an operative view.
- This is a **surface and interface review candidate**, not the accepted anatomy
  asset. Do not attach clinical structure labels to it based on guessed positions.
- The existing movement study remains on its separate schematic tissue model.
  Do not present that movement as a result calculated on this scan.

The review route loads these files from the application's own origin. No patient
image, remote texture service, tracking script, or account is involved.
