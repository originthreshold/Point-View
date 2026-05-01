# Point View Source Transfer Status

## Purpose

This file tracks the current source-code transfer state for the desktop Point View project.

It exists so source transfer stays as controlled as the documentation transfer.

## Current Source Files Present

- `src/point-view-defaults.js`
- `src/point-view-math.js`
- `src/point-view-ray.js`
- `src/point-view-color.js`
- `src/point-view-hit.js`
- `src/point-view-cast.js`
- `src/point-view-readout.js`
- `src/point-view-v1.js`

## What Is Currently Locked

The current transferred source layer should be treated as the canonical V1 logic foundation unless explicitly revised:

- canonical V1 parameter defaults
- canonical hit type names
- RGB distance math
- local change logic
- origin drift logic
- drift contribution logic
- ray sample point construction
- image color lookup
- step-by-step hit evaluation
- single-ray cast packaging
- readout formatting
- barrel export structure

## What Has Not Been Transferred Yet

The following areas are not yet considered transferred into stable desktop structure:

- UI rendering
- point-click interaction
- angle slider interface
- parameter input controls
- raw strip visualization
- perception logic strip visualization
- app shell wiring
- image loading flow
- test harness wiring

## Rule

No later source transfer should silently replace the meaning of the current V1 foundation.

If a later file changes current V1 behavior, that change should be documented deliberately.

## Summary

The core V1 logic layer is now present on desktop.

The next transfer phase will be controlled app wiring around this locked source foundation.