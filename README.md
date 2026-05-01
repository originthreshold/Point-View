
# Point View

Point View is a perception experiment and app concept built around a user-selected point casting rays through a 2D image.

The goal is not just to measure pixels, but to model how a region might remain perceptually coherent across soft variation, gradual drift, and boundary rupture.

## Core Idea

A user selects a point on an image.

From that point, the system emits a ray at a chosen angle and samples color step by step through the image.

As the ray travels, Point View measures visual change and determines whether the ray is still inside the same perceptual region or has encountered enough difference to stop.

## What the System Currently Tracks

- local change between neighboring samples
- noise-level variation
- soft clustered variation
- meaningful clustered variation
- accumulated drift across the path
- origin drift from the starting point
- hard boundary jumps
- hit type and hit location

## Current V1 Direction

Version 1 is a threshold-based perception model.

It is designed to separate visual change into multiple bands rather than treating all difference the same.

Current active concepts include:

- `noise_floor`
- `cluster_ceiling`
- `boundary_threshold`
- `origin_threshold`
- `drift_threshold`
- `soft_weight`
- `accumulated_drift`
- `origin_drift`

## Perception Logic Summary

The ray evaluates change in layers:

1. Tiny variation under the noise floor is ignored.
2. Soft cluster variation is allowed but accumulates at reduced weight.
3. Meaningful variation accumulates at full weight.
4. Extreme change triggers immediate boundary stop.
5. Even without a hard boundary, the ray can stop if accumulated drift or origin drift becomes too large.

## Current Project Structure

```text
point-view/
├── README.md
├── assets/
├── docs/
├── logs/
├── notes/
├── public/
├── src/
└── test-images/
