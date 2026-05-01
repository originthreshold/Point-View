# Point View Current State

## Status

The initial documentation transfer is complete.

The following files are now present and should be treated as the current written foundation of the Point View desktop project:

- `README.md`
- `docs/transfer-index.md`
- `docs/point-view-overview.md`
- `docs/v1-spec.md`
- `docs/findings-so-far.md`
- `docs/future-features.md`
- `docs/math-notes.md`
- `logs/test-log-v1.md`
- `notes/raw-project-notes.md`

## What Is Now Locked

Until explicitly revised, the following should be treated as the current canonical written direction of the project:

- Point View is a point-centered perception experiment
- V1 is a single-ray threshold-based model
- the current system distinguishes noise, soft cluster variation, meaningful variation, drift, and rupture
- `origin_drift` and `accumulated_drift` are both active and conceptually distinct
- `cluster_ceiling` and `soft_weight` are core V1 parameters
- stop type is a major output, not a minor detail
- documentation, math framing, and findings should stay aligned

## Important Rule

No future transfer should silently contradict these files.

If something changes later, it should be revised deliberately in the relevant file rather than casually overwritten.

## Next Transfer Phase

The next phase after this file is code transfer.

That phase should begin carefully and only from the current project state, so the desktop version stays consistent with the documented model.