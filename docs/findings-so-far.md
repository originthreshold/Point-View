# Point View Findings So Far

## Purpose of This File

This document collects the major findings from Point View V1 testing so far.

It is not the full raw log.

It is the cleaned record of what the system appears to do, what parameter changes have revealed, and what those results mean for the direction of the model.

## Core Finding

Point View behaves more usefully when visual change is treated as layered rather than binary.

A ray should not treat every change as either nothing or boundary.

The current findings support a model with at least four perceptual bands:

1. noise
2. soft cluster variation
3. meaningful cluster variation
4. boundary rupture

This is the basis of the current V1 direction.

## Finding 1: Pure Boundary Detection Was Too Harsh

Earlier threshold logic treated sufficiently large local change as a boundary and treated smaller change as non-boundary.

This was too crude for gradual image regions.

In sloped grayscale areas and clustered image regions, the ray often traveled too long or stopped for the wrong reason because the model did not distinguish between soft variation and meaningful internal drift.

Interpretation:

A perceptual system needs more than one kind of non-boundary change.

## Finding 2: Accumulated Drift Matters

A major finding is that a region can lose identity through repeated moderate variation even when no individual step is large enough to count as a hard edge.

This is why `accumulated_drift` became necessary.

The system now captures the idea that perceptual travel itself can exhaust regional identity.

Interpretation:

A region may end because the journey mattered, not because a single rupture occurred.

## Finding 3: Origin Drift and Accumulated Drift Are Not the Same

Testing showed that `origin_drift` and `accumulated_drift` are conceptually different and both matter.

- `origin_drift` measures how far the current sample has moved away from the starting sample
- `accumulated_drift` measures how much meaningful variation has been traversed along the path

These values may sometimes be numerically similar, especially on smooth monotonic gradients, but they represent different logic.

Interpretation:

The model needs both memory of the start and memory of the path.

## Finding 4: Soft Cluster Variation Should Not Be Ignored Completely

One of the most important developments was adding `cluster_ceiling` and `soft_weight`.

This created a second threshold band between noise and meaningful variation.

That update allowed the system to recognize soft internal texture and gentle shade variation without treating it as either zero or full drift.

Current band logic:

- below `noise_floor` = ignore
- from `noise_floor` up to `cluster_ceiling` = reduced-weight accumulation
- from `cluster_ceiling` up to `boundary_threshold` = full accumulation
- above `boundary_threshold` = immediate stop

Interpretation:

Texture and clustered variation matter, but not as much as full perceptual drift.

## Finding 5: The Cluster Ceiling Model Produces More Human-Looking Results

The introduction of `cluster_ceiling` improved the interpretability of ray behavior.

Without it, small and moderate variations were forced into a binary decision structure.

With it, the model can distinguish:

- micro fluctuation
- soft within-region variation
- meaningful within-region change
- hard rupture

Interpretation:

The model now behaves more like a field of graded perceptual change than a simple detector.

## Finding 6: Threshold Tuning Can Flip the Meaning of a Stop

Testing showed that slight changes in thresholds can change not just where the ray stops, but why it stops.

Examples from testing include flips between:

- `boundary_jump`
- `accumulated_drift`
- `origin_drift`

This means threshold tuning is not merely cosmetic.

It determines the interpretation of the same image path.

Interpretation:

Parameter choice is part of the perceptual theory, not just system calibration.

## Finding 7: A Specific Local Rupture Can Be Measured Precisely

In one threshold precision test, local change remained classified as `boundary_jump` until the threshold met the exact transition value.

Observed result:

- at `boundary_threshold = 32.9`, local change still triggered `boundary_jump`
- measured local change at rupture was approximately `32.91`

Interpretation:

The system uses strict threshold comparison and can expose exact rupture points for specific tonal transitions.

This is important because it means the model is inspectable rather than mysterious.

## Finding 8: Drift Threshold Precision Can Also Be Measured

Testing also showed that accumulated drift flip points can be measured precisely for a given path.

Observed result from a precision check:

- `drift_threshold = 70` produced `accumulated_drift` stop at the first stop zone
- `drift_threshold = 70.5` produced the same stop
- `drift_threshold = 80` allowed the ray to continue farther
- measured accumulated drift at the first stop zone was `71.01`

Interpretation:

The model has measurable transition points where the meaning of the path changes.

This makes the system testable and calibratable.

## Finding 9: Grayscale Travel Became More Plausible After Reweighting

A very important behavioral change occurred after moving toward the following type of configuration:

```text
cluster_ceiling = 30
soft_weight = 0.5
drift_threshold = 60
```

In that test, the ray stopped on:

```text
hit_type = accumulated_drift
```

instead of stopping by origin separation alone.

Observed values from that run included:

```text
Origin Drift: 76.21
Accumulated Drift: 76.21
Hit Type: accumulated_drift
```

The stop occurred earlier in the grayscale descent than before, and the interpretation became more natural.

Interpretation:

The system started recognizing gradual tonal travel as perceptually meaningful in its own right.

This was an important shift toward more human-looking behavior.

## Finding 10: Soft Field Perception Is a Real Emergent Mode in the Model

A named finding from testing is **Soft Field Perception**.

### Definition

Soft Field Perception is a perceptual mode in which boundaries are de-emphasized, gradual change is tolerated, and region identity is determined primarily by distance from the point of origin rather than by local rupture or accumulated variation.

In this mode, perception behaves as a continuous field rather than a collection of discrete regions.

### Parameter Shape

This mode appears under configurations approximately like:

```text
boundary_threshold ≈ 33 or higher
drift_threshold much larger than expected accumulated drift
origin_threshold as the active limiting factor
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

Interpretation:

This is not just a numeric quirk.

It is a recognizable perceptual mode produced by parameter interaction.

## Finding 11: Stop Type Is One of the Most Important Outputs

Testing made it clear that where the ray stops is not enough.

Why it stopped matters just as much.

The current output structure therefore needs to preserve:

- hit point
- hit color
- local change
- origin drift
- accumulated drift
- hit type

Interpretation:

The project is about perceptual reasoning, not just endpoint location.

## Finding 12: Visual Readouts Help Make the Model Interpretable

The combination of the following was especially useful:

- raw strip
- perception logic strip
- ray readout panel
- active parameter display

Interpretation:

Point View works best when the model can be visually inspected rather than hidden behind a single answer.

This is important to the identity of the project.

## What the Findings Support Right Now

So far, the findings support the following current direction for V1:

1. keep the model threshold-based and interpretable
2. preserve both `origin_drift` and `accumulated_drift`
3. keep `cluster_ceiling` as a core parameter
4. keep `soft_weight` as a core parameter
5. treat stop type as a major output
6. continue testing threshold flip points
7. document perceptual modes, not just raw numbers

## What Still Needs More Testing

The following areas still need more structured testing:

- colorful images versus grayscale images
- clustered texture regions
- edge-of-image end behavior
- whether user-designated ray paths should override threshold interpretation
- whether future versions should soften thresholds into weighted probability instead of strict cutoffs

## Summary

The major discovery so far is that perceptual region logic needs layered change, not binary change.

Point View V1 has moved toward a clearer model by distinguishing noise, soft cluster variation, meaningful drift, and rupture.

It has also shown that both path memory and origin memory matter.

The current project direction is strongly supported by these findings.