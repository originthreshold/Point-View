# Point View Overview

## Name

Point View

## Working Description

Point View is a perception experiment and app concept built around a simple question:

What does a chosen point in an image perceive as you move outward from it?

The system lets a user select a point on a 2D image and cast a ray in a chosen direction. As that ray travels, Point View samples the image step by step and evaluates visual change using a layered perception model.

The goal is not basic edge detection alone.

The goal is to model how a region can remain perceptually coherent across soft variation, gradual tonal drift, clustered color change, and eventual rupture.

## Core Concept

A point is selected by the user.

From that point, the system sends out a directional ray.

At each step along that ray, the system compares the current sample to the previous sample and to the origin.

It then decides whether the ray is still traveling within the same perceptual region or whether perception should stop.

This turns image traversal into a perception logic problem rather than a raw geometry problem.

## What Makes Point View Different

Point View does not treat all visual difference as identical.

Instead, it separates visual change into layers:

- ignorable noise
- soft variation within a region
- meaningful variation within a region
- accumulated drift over distance
- separation from the origin
- hard boundary rupture

This makes the model closer to a perceptual field than a simple binary edge detector.

## Current V1 Model

Version 1 is a threshold-based ray perception model.

It currently uses these core parameters:

- `noise_floor`
- `cluster_ceiling`
- `boundary_threshold`
- `origin_threshold`
- `drift_threshold`
- `soft_weight`
- `step_size`

These parameters shape how the system decides what counts as noise, what counts as stable texture, what counts as meaningful internal drift, and what counts as a boundary.

## Current Perception Logic

As the ray moves:

1. Very small local changes under `noise_floor` are ignored.
2. Changes between `noise_floor` and `cluster_ceiling` count as soft cluster variation and accumulate at reduced weight.
3. Changes between `cluster_ceiling` and `boundary_threshold` count as meaningful variation and accumulate at full weight.
4. Changes at or above `boundary_threshold` trigger immediate `boundary_jump`.
5. Even without a hard boundary, the ray may stop if:
   - `accumulated_drift` exceeds `drift_threshold`
   - `origin_drift` exceeds `origin_threshold`

## Main Outputs

The current system is built around reading and displaying the behavior of a single ray.

Important outputs include:

- selected point
- ray angle
- start color
- hit point
- hit color
- step count
- travel distance
- local change
- origin drift
- accumulated drift
- hit type

## Visual Readouts

The current interface direction includes:

- the source image
- a selected point
- a visible ray
- a raw strip showing sampled values along the ray
- a perception logic strip showing how the model interpreted each sample
- a ray readout panel with numerical output
- parameter controls for threshold testing

## Why This Matters

Point View is exploring the difference between image measurement and perceptual interpretation.

A grayscale slope, a textured fabric, a painted surface, or a soft region of shadow may contain constant pixel change without feeling like a new object.

This project is trying to formalize that distinction.

In that sense, Point View is not just asking:

Where is the edge?

It is asking:

When does a region stop being itself?

## Current Direction

The present direction of Point View is focused on:

- stabilizing the V1 threshold model
- documenting findings from ray tests
- keeping terminology consistent
- aligning code, math, and interpretation
- preparing for future versions that may introduce softer or probabilistic perception rules

## Scope of V1

Version 1 is intentionally limited.

It is a beginner-friendly, interpretable 2D perception model using sampled image rays and threshold logic.

It is not yet trying to solve full image understanding, object recognition, or higher-dimensional scene analysis.

Its purpose is to establish a clean foundation for perceptual region logic.

## Summary

Point View is a system for testing how a chosen point perceives an image through directional travel.

Its current form is a threshold-based model that distinguishes noise, clustered variation, gradual drift, and rupture.

The long-term project is about perception.

The current version is about building that perception carefully, visibly, and testably.