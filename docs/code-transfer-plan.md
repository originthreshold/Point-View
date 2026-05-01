# Point View Code Transfer Plan

## Purpose

This file exists to keep code transfer controlled and consistent with the current written project state.

It is not code.

It is the rule sheet for how code will be moved into the desktop project.

## Current Rule

No code file should be transferred casually.

Each code file should be moved only after checking that it matches the current documented V1 direction in:

- `README.md`
- `docs/point-view-overview.md`
- `docs/v1-spec.md`
- `docs/findings-so-far.md`
- `docs/math-notes.md`
- `docs/current-state.md`

## Current Code Direction to Preserve

Any transferred code should match these project facts:

- Point View is a point-centered perception experiment
- V1 is a single-ray threshold-based model
- the ray samples step by step through a 2D image
- the system tracks `local_change`
- the system tracks `origin_drift`
- the system tracks `accumulated_drift`
- the system uses `noise_floor`
- the system uses `cluster_ceiling`
- the system uses `boundary_threshold`
- the system uses `origin_threshold`
- the system uses `drift_threshold`
- the system uses `soft_weight`
- stop type must be preserved as a major output
- the interface should support visible inspection, not hidden logic

## Code Transfer Method

Code should be transferred in small, controlled units.

Recommended order:

1. shared constants or parameter defaults
2. perception math helpers
3. ray traversal logic
4. hit logic and stop classification
5. readout formatting
6. interface wiring
7. test image or asset references

## Important Rule

If a code file contradicts the written project state, do not silently transfer it as-is.

Instead, either:

- revise the code before transfer
- or record the mismatch clearly before transfer

## First Code Goal

The first code transfer should establish the canonical V1 parameter set and names so the rest of the code uses the same language as the docs.

## Summary

The code phase starts now, but it must remain locked to the documented Point View V1 model.

Consistency matters more than speed.