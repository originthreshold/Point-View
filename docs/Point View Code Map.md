# Point View Code Map

## Purpose

This file records the current source-file structure for the transferred Point View V1 code.

It exists so the desktop project keeps a clear relationship between documentation, math, and implementation.

This file describes what each current source file is responsible for.

It should be updated deliberately when source structure changes.

## Current Source Files

### `src/point-view-defaults.js`

Canonical V1 constants and shared labels.

Contains:

- default parameter values
- canonical parameter order
- canonical hit types
- status strings
- model name

This file establishes the shared language for the rest of the code.

---

### `src/point-view-math.js`

Core perception math helpers.

Contains:

- RGB Euclidean distance
- local change calculation
- origin drift calculation
- perception band classification
- drift contribution logic

This file expresses the mathematical logic described in:

- `docs/v1-spec.md`
- `docs/math-notes.md`

---

### `src/point-view-ray.js`

Ray geometry and image traversal helpers.

Contains:

- degree-to-radian conversion
- directional vector calculation
- ray position calculation
- image sample point rounding
- bounds checking
- ray sample point construction

This file is responsible for spatial movement, not perception interpretation.

---

### `src/point-view-color.js`

Image color sampling helpers.

Contains:

- image data index lookup
- pixel color retrieval
- RGB string formatting

This file handles color access from image data.

---

### `src/point-view-hit.js`

Per-step perception evaluation and stop classification.

Contains:

- hit type resolution
- step evaluation logic
- stop decision logic
- accumulation update logic

This file is where local change, drift, and stop cause come together at the step level.

---

### `src/point-view-cast.js`

Single-ray orchestration for Point View V1.

Contains:

- sample point generation
- ray traversal
- raw strip building
- logic strip building
- stop detection
- final result packaging

This file is the main V1 ray-cast engine.

---

### `src/point-view-readout.js`

Readout formatting helpers.

Contains:

- number formatting
- point formatting
- user-facing readout object construction

This file turns raw ray results into cleaner display-ready values.

---

### `src/point-view-v1.js`

Barrel export for the current V1 module set.

Contains:

- re-exports of defaults
- re-exports of math helpers
- re-exports of ray helpers
- re-exports of color helpers
- re-exports of hit logic
- re-exports of cast and readout helpers

This file is the clean entry point for the transferred V1 logic.

## Current Implementation Shape

The code is currently organized into layers:

1. defaults and labels
2. math helpers
3. ray geometry
4. color sampling
5. hit evaluation
6. ray casting
7. readout formatting
8. barrel export

This layering should stay stable unless there is a deliberate design reason to change it.

## Current Rule

No future source file should silently redefine the meaning of:

- `local_change`
- `origin_drift`
- `accumulated_drift`
- `cluster_ceiling`
- `soft_weight`
- `boundary_jump`
- `accumulated_drift` as a hit type
- `origin_drift` as a hit type

If those meanings change, the docs must be revised with the code.

## Summary

The current Point View V1 desktop code is now mapped into clear source responsibilities.

This map should help preserve consistency as later code and UI pieces are transferred.