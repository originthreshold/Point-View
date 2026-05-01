# Point View V1 Spec

## Purpose

Point View V1 is a threshold-based 2D perception model.

A user selects a point in an image and sends a ray outward at a chosen angle. The system samples the image step by step along that ray and decides whether the ray is still inside the same perceptual region or whether perception should stop.

V1 is designed to distinguish between:

- ignorable noise
- soft internal variation
- meaningful internal variation
- accumulated perceptual drift
- separation from the origin
- hard boundary rupture

## V1 Scope

Version 1 is intentionally limited to a single-ray perception test.

It is not full image understanding.

It is not object recognition.

It is not a probabilistic model.

It is a visible, testable threshold system for studying how a point may remain inside or exit a perceptual region.

## Core Inputs

The current V1 system depends on:

- an image
- a user-selected point `(x, y)`
- a ray angle
- a step size
- threshold parameters

## Active Parameters

### `step_size`

How far the ray moves between one sample and the next.

Smaller values create denser sampling.  
Larger values move faster but may skip subtle transitions.

### `noise_floor`

The minimum local change required before variation is treated as perceptually meaningful.

If local change is below this value, the system treats it as negligible noise.

### `cluster_ceiling`

The upper limit of soft cluster variation.

This creates a second band between noise and meaningful drift.

Changes below this ceiling are allowed to contribute to drift, but only at reduced weight.

### `boundary_threshold`

The rupture threshold for local change.

If local change becomes greater than this threshold, the ray stops immediately with `boundary_jump`.

### `origin_threshold`

The maximum allowed difference between the current sample and the starting sample.

If origin drift exceeds this threshold, the ray stops with `origin_drift`.

### `drift_threshold`

The maximum allowed accumulated perceptual drift along the ray.

If accumulated drift exceeds this threshold, the ray stops with `accumulated_drift`.

### `soft_weight`

The reduced weight applied to soft cluster variation.

This allows small within-region variation to count without behaving like full perceptual rupture.

## Core Measurements

### `local_change`

Difference between the current sample and the previous sample.

This is the primary measure for immediate visual transition along the ray.

### `origin_drift`

Difference between the current sample and the starting sample.

This measures how far the current point has moved away from the visual identity of the origin.

### `accumulated_drift`

Running total of meaningful visual change along the ray.

This measures how much perceptual travel has occurred across the path, even when no single step is a hard edge.

## Perception Bands

V1 divides local change into four interpretive bands.

### 1. Noise

Condition:

```text
local_change < noise_floor
```

Behavior:

- ignore change
- add nothing to accumulated drift

Meaning:

Tiny variation, sampling noise, micro texture, negligible fluctuation.

### 2. Soft Cluster Variation

Condition:

```text
noise_floor <= local_change < cluster_ceiling
```

Behavior:

- accumulate at reduced weight
- contribution = `local_change * soft_weight`

Meaning:

Soft texture, brush-like variation, gentle shade movement, stable internal variation.

### 3. Meaningful Cluster Variation

Condition:

```text
cluster_ceiling <= local_change <= boundary_threshold
```

Behavior:

- accumulate at full value
- contribution = `local_change`

Meaning:

Real internal change within a region, perceptually significant drift, but not yet a rupture.

### 4. Boundary Jump

Condition:

```text
local_change > boundary_threshold
```

Behavior:

- stop immediately
- hit type = `boundary_jump`

Meaning:

Hard edge, strong contrast, likely region break or object break.

## Stop Logic

At each step, the system evaluates the new sample and checks for stop conditions.

The ray stops when the first qualifying stop condition is reached.

### Immediate Stop

If:

```text
local_change > boundary_threshold
```

Then:

```text
hit_type = boundary_jump
```

### Drift Stop

If accumulated drift grows beyond the allowed threshold, the ray stops with:

```text
hit_type = accumulated_drift
```

### Origin Stop

If separation from the starting point grows beyond the allowed threshold, the ray stops with:

```text
hit_type = origin_drift
```

### Edge of Image

If the ray exits the image bounds before another stop condition is reached, the ray ends at the last valid point.

## Accumulation Rule

V1 accumulation is banded, not uniform.

```text
if local_change < noise_floor:
    contribution = 0

else if local_change < cluster_ceiling:
    contribution = local_change * soft_weight

else if local_change <= boundary_threshold:
    contribution = local_change

else:
    stop as boundary_jump
```

Then:

```text
accumulated_drift += contribution
```

## Conceptual Logic

V1 is based on the idea that not every visible change should count the same way.

A region may contain:

- tiny fluctuations that should be ignored
- clustered internal variation that should count softly
- gradual tonal migration that should count fully
- sudden rupture that should stop perception immediately

This creates a layered model of region identity instead of a simple binary edge detector.

## Outputs

The current ray readout is centered on a single ray result.

Important outputs include:

- selected point
- angle
- start color
- hit point
- hit color
- steps
- travel distance
- local change
- origin drift
- accumulated drift
- hit type
- status

## Hit Types

Current V1 hit types include:

- `boundary_jump`
- `accumulated_drift`
- `origin_drift`

Additional end states may occur when the ray reaches image limits without a threshold stop.

## Visual Interface Direction

The current V1 interface is organized around:

- source image display
- point selection
- angle control
- raw strip
- perception logic strip
- ray readout
- test controls
- active parameter display

## Current Design Philosophy

V1 should remain:

- interpretable
- tunable
- visibly testable
- mathematically simple enough to inspect
- consistent across code, findings, and documentation

The goal is not to hide perception logic.

The goal is to expose it clearly enough that each threshold change can be tested and understood.

## Summary

Point View V1 is a single-ray threshold perception system.

It samples outward from a chosen point, measures local change and drift, and stops when perceptual difference becomes too great.

Its main contribution is treating image difference as layered rather than binary, allowing a region to remain itself across noise, texture, gradual change, and eventual rupture.