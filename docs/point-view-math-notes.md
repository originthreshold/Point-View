# Point View Math Notes

## Purpose of This File

This document records the current mathematical framing for Point View V1.

It is not meant to be advanced or abstract.

Its job is to state clearly what the current model measures, how the ray moves, how difference is calculated, and how the thresholds interact.

## Current Mathematical Scope

Point View V1 is a 2D image sampling model.

A user chooses:

1. a point in image space
2. a direction
3. a set of thresholds

The system then walks outward from that point along a ray and evaluates perceptual change step by step.

## Image Space

The image is treated as a 2D grid of pixel positions.

A point is written as:

```text
(x, y)
```

Where:

1. `x` increases from left to right
2. `y` increases from top to bottom

This means the coordinate system follows normal image coordinates rather than a traditional Cartesian plane.

## Ray Direction

A ray begins at the selected point:

```text
(x0, y0)
```

Given an angle `theta`, the ray moves in the direction:

```text
(dx, dy) = (cos(theta), sin(theta))
```

At each step `n`, the sampled position is conceptually:

```text
x(n) = x0 + n * step_size * cos(theta)
y(n) = y0 + n * step_size * sin(theta)
```

In practice, sampled positions are taken against the image grid.

## Sample Values

Each sampled point returns a color value.

In the current beginner-friendly model, that color is treated as an RGB triplet:

```text
(r, g, b)
```

## Current Difference Measure

The current model compares colors using Euclidean distance in RGB space.

For two samples:

```text
c1 = (r1, g1, b1)
c2 = (r2, g2, b2)
```

The difference is:

```text
distance(c1, c2) =
sqrt((r2 - r1)^2 + (g2 - g1)^2 + (b2 - b1)^2)
```

This distance function is used for both:

1. `local_change`
2. `origin_drift`

## Local Change

`local_change` is the difference between the current sample and the previous sample.

If:

```text
previous = c(n - 1)
current = c(n)
```

Then:

```text
local_change = distance(previous, current)
```

This measures immediate change along the ray.

## Origin Drift

`origin_drift` is the difference between the current sample and the starting sample.

If:

```text
origin = c(0)
current = c(n)
```

Then:

```text
origin_drift = distance(origin, current)
```

This measures how far the ray has moved away from the visual identity of the start point.

## Accumulated Drift

`accumulated_drift` is the running total of weighted local change along the path.

It is not simply the difference between the start and current sample.

It is the sum of the meaningful changes encountered while traveling.

Conceptually:

```text
accumulated_drift = sum of weighted contributions along the ray
```

## Why Origin Drift and Accumulated Drift Differ

These two values can match on a smooth monotonic gradient, but they are not the same thing.

`origin_drift` asks:

```text
How different is the current point from the start?
```

`accumulated_drift` asks:

```text
How much meaningful visual travel has happened along the way?
```

This distinction is one of the important ideas in Point View V1.

## Perception Bands

The current model divides `local_change` into four interpretive bands.

### 1. Noise

Condition:

```text
local_change < noise_floor
```

Contribution:

```text
0
```

Meaning:

Ignore tiny fluctuation.

### 2. Soft Cluster Variation

Condition:

```text
noise_floor <= local_change < cluster_ceiling
```

Contribution:

```text
local_change * soft_weight
```

Meaning:

Count small within-region variation, but count it gently.

### 3. Meaningful Cluster Variation

Condition:

```text
cluster_ceiling <= local_change <= boundary_threshold
```

Contribution:

```text
local_change
```

Meaning:

Count the change fully as meaningful internal drift.

### 4. Boundary Jump

Condition:

```text
local_change > boundary_threshold
```

Behavior:

```text
stop immediately
```

Meaning:

Treat the change as a rupture rather than ongoing within-region travel.

## Accumulation Rule

The current V1 accumulation rule is:

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
accumulated_drift = accumulated_drift + contribution
```

## Stop Conditions

A ray can stop in several ways.

### Boundary Stop

If:

```text
local_change > boundary_threshold
```

Then:

```text
hit_type = boundary_jump
```

### Accumulated Drift Stop

If:

```text
accumulated_drift > drift_threshold
```

Then:

```text
hit_type = accumulated_drift
```

### Origin Drift Stop

If:

```text
origin_drift > origin_threshold
```

Then:

```text
hit_type = origin_drift
```

### Image Limit Stop

If the ray leaves image bounds, the path ends at the last valid sample.

## Why Euclidean RGB Works for V1

The current math is intentionally simple.

Euclidean RGB distance is useful for V1 because it is:

1. easy to compute
2. easy to inspect
3. consistent with current testing
4. enough to reveal threshold behavior

It is not a perfect model of human color perception.

It is a clear starting structure.

## Example From Grayscale Testing

On a grayscale image, a change from:

```text
rgb(235, 235, 235)
```

to:

```text
rgb(191, 191, 191)
```

produces:

```text
delta per channel = 44
```

So the RGB Euclidean distance is:

```text
sqrt(44^2 + 44^2 + 44^2) = 76.21
```

This matches observed `origin_drift` values from testing.

Likewise, a smaller grayscale step of 22 per channel gives:

```text
sqrt(22^2 + 22^2 + 22^2) = 38.11
```

This matches observed `local_change` values from testing.

## What the Math Is Doing Conceptually

The math is not trying to identify objects.

It is doing something smaller and more specific.

It is asking:

1. how much did the image change right now
2. how much change has built up along the journey
3. how far has the current point drifted from the start
4. when should a region stop counting as itself

That is the core mathematical heart of Point View V1.

## Current Limits of the Math

The current math does not yet include:

1. perceptual color spaces
2. texture windows
3. pattern recurrence detection
4. probabilistic thresholds
5. region growth
6. many-ray field analysis

Those belong to later versions if they are adopted.

## Summary

Point View V1 uses simple 2D ray traversal and Euclidean RGB difference to measure perceptual change.

Its key mathematical distinction is that local change, path accumulation, and origin separation are not treated as the same thing.

The thresholds then decide when a ray is still traveling within a region and when that region has ended.