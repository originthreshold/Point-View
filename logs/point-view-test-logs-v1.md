# Point View V1 Test Log

## Purpose of This File

This file is the structured test log for Point View V1.

Unlike `docs/findings-so-far.md`, this file preserves specific test observations, configurations, measured values, and interpretations in a more log-like format.

It is the bridge between raw experimentation and the cleaned findings document.

---

## Test Log Format

Each entry should preserve:

- test name
- setup
- observed result
- interpretation

This helps keep the system inspectable and consistent.

---

## Calibration Test 1  
### Boundary Threshold Precision Check

### Shared Setup

- point: `(10, 203)`
- angle: `0°`
- noise_floor: `2`
- origin_threshold: `130`

### Observation

At `boundary_threshold = 32.9`, the ray still triggered `boundary_jump` because measured `local_change` was slightly greater than the threshold.

Measured rupture value:

```text
local_change ≈ 32.91
```

### Interpretation

The exact rupture point for this tonal step lies at approximately `32.91`.

Because the system uses strict comparison, the transition continues to count as `boundary_jump` until the threshold reaches or exceeds that local change value.

### Key Finding

Specific local rupture points can be measured precisely.

---

## Calibration Test 2  
### Drift Threshold Precision Check

### Shared Setup

- point: `(10, 203)`
- angle: `0°`
- boundary_threshold: `33`
- noise_floor: `2`
- origin_threshold: `130`

### Observed Results

- `drift_threshold = 70` → `accumulated_drift` at `(125, 203)`
- `drift_threshold = 70.5` → `accumulated_drift` at `(125, 203)`
- `drift_threshold = 80` → `accumulated_drift` at `(175, 203)`

Measured accumulated drift at first stop zone:

```text
71.01
```

### Interpretation

The first accumulation zone for this path produces `accumulated_drift = 71.01`.

Any drift threshold below that value causes the ray to stop there.

Any drift threshold above that value allows the ray to continue to the next zone.

### Key Finding

The first drift flip point for this path is approximately `71.01`.

---

## Behavioral Test 3  
### Cluster Ceiling Model Update

### New Parameter Introduced

```text
cluster_ceiling = 45
```

### Updated Perception Bands

1. Noise floor

```text
local_change < noise_floor
```

Meaning:

- ignore completely
- no accumulation

2. Soft cluster variation

```text
noise_floor <= local_change < cluster_ceiling
```

Meaning:

- texture
- brush strokes
- soft shading
- small tonal shifts

Behavior:

```text
contribution = local_change * soft_weight
```

3. Meaningful cluster variation

```text
cluster_ceiling <= local_change < boundary_threshold
```

Meaning:

- actual perceptual drift within a region
- movement toward a new visual zone

Behavior:

```text
contribution = local_change
```

4. Boundary jump

```text
local_change >= boundary_threshold
```

Meaning:

- hard edge
- strong contrast
- different object or region

Behavior:

```text
stop immediately
```

### Interpretation

This test formalized the need for a second threshold band between noise and rupture.

### Key Finding

The cluster ceiling model better preserves within-region variation.

---

## Behavioral Test 4  
### Grayscale Ray Result Before Softer Weighting

### Setup Pattern

A grayscale descent was tested with a ray moving through a tonal slope.

In the earlier model, the system tended to stop due mainly to separation from the origin rather than because the path itself had accumulated enough perceptual pressure.

### Interpretation

This made the result feel less human-looking because the model undercounted the importance of gradual travel.

### Key Finding

Origin distance alone was not enough to describe perceptual exhaustion.

---

## Behavioral Test 5  
### Grayscale Ray Result After Reweighting

### Parameter Configuration

```text
cluster_ceiling = 30
soft_weight = 0.5
drift_threshold = 60
```

### Observed Result

The ray stopped on:

```text
hit_type = accumulated_drift
```

Observed values:

```text
Origin Drift: 76.21
Accumulated Drift: 76.21
Hit Type: accumulated_drift
```

Observed image values:

```text
Start Color: rgb(235, 235, 235)
Hit Color: rgb(191, 191, 191)
```

Additional readout from that run:

```text
Steps: 384
Travel Distance: 384.00
Local Change: 38.11
```

### Interpretation

The journey itself mattered enough to exhaust the region before origin separation became the active story.

This was a major improvement in interpretability.

### Key Finding

Gradual tonal travel became meaningful in its own right.

---

## Behavioral Test 6  
### Live App Readout Snapshot

### Observed Interface State

```text
Point View V1
Angle Slider: 0°
Raw Strip Samples: 385
Raw Strip Hit Index: 384
Logic Strip Samples: 385
Logic Strip Hit Index: 384
Point: (16, 573)
Angle: 0°
Start Color: rgb(235, 235, 235)
Hit Point: (400, 573)
Hit Color: rgb(191, 191, 191)
Steps: 384
Travel Distance: 384.00
Local Change: 38.11
Origin Drift: 76.21
Accumulated Drift: 76.21
Hit Type: accumulated_drift
Status: ray cast complete
```

### Active Parameters

```text
step_size = 1
noise_floor = 2
cluster_ceiling = 30
boundary_threshold = 60
origin_threshold = 130
drift_threshold = 60
soft_weight = 0.5
```

### Interpretation

This run is one of the most useful anchor tests so far because it clearly shows the relationship between parameter tuning and a more plausible grayscale stop behavior.

### Key Finding

The interface readout structure is good enough to preserve meaningful tests.

---

## Behavioral Test 7  
### Soft Field Perception Mode

### Definition

Soft Field Perception is a perceptual mode in which boundaries are de-emphasized, gradual change is tolerated, and region identity is determined primarily by distance from the point of origin rather than by local rupture or accumulated variation.

### Parameter Shape

This mode appears under configurations approximately like:

```text
boundary_threshold ≈ 33 or higher
drift_threshold much larger than expected accumulated drift
origin_threshold as active limiting factor
noise_floor low
step_size = 1
```

### Behavioral Characteristics

1. Boundary suppression  
   Moderate local changes do not trigger `boundary_jump`.

2. Drift suppression  
   Accumulated travel is tolerated for a long distance.

3. Origin dominance  
   The region ends mainly when the ray becomes too different from the start.

### Interpretation

This is not just a number pattern.

It is a repeatable perceptual behavior produced by threshold interaction.

### Key Finding

Parameter interaction can create recognizable perceptual modes.

---

## Behavioral Test 8  
### Why Stop Type Must Be Logged

### Observation

Testing showed that the same general image path can stop for different reasons depending on parameter tuning.

The key stop types so far are:

- `boundary_jump`
- `accumulated_drift`
- `origin_drift`

### Interpretation

A ray endpoint without stop cause is incomplete information.

### Key Finding

Every serious test log should preserve:

- hit point
- hit color
- local change
- origin drift
- accumulated drift
- hit type

---

## Current Logging Rule

For future V1 tests, preserve at minimum:

```text
point
angle
start color
hit point
hit color
steps
travel distance
local change
origin drift
accumulated drift
hit type
active parameters
interpretation
```

---

## Summary

The V1 test log shows that Point View becomes more useful when it distinguishes noise, soft cluster variation, meaningful drift, and rupture.

The most important experimental outcomes so far are:

- precise measurable rupture points
- precise measurable drift flip points
- the value of `cluster_ceiling`
- the value of `soft_weight`
- the difference between `origin_drift` and `accumulated_drift`
- the importance of recording stop type, not just endpoint