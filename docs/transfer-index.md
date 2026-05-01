# Point View Transfer Index

This file tracks what has been moved from project chat into the desktop project folder.

## Project Goal

Point View is a perception experiment and app concept built around a user-selected point emitting rays through a 2D image space. The system measures visual change along a ray and decides where perception should stop based on thresholds for noise, clustered variation, accumulated drift, origin drift, and boundary rupture.

## Current Desktop Structure

point-view/
├── assets/
├── docs/
├── logs/
├── notes/
├── public/
├── src/
└── test-images/

## Transfer Rules

1. Move only one file or one clearly bounded section at a time.
2. Do not rewrite findings casually once transferred.
3. Keep terminology consistent with current project language.
4. Treat transferred material as canonical unless we explicitly revise it.
5. Match math, code logic, naming, and findings across files.

## Canonical Language So Far

* point
* ray
* origin
* local\_change
* noise\_floor
* cluster\_ceiling
* boundary\_threshold
* origin\_threshold
* drift\_threshold
* soft\_weight
* accumulated\_drift
* origin\_drift
* boundary\_jump
* soft cluster variation
* meaningful cluster variation
* perception logic strip
* raw strip
* hit type

## Transfer Status

* \[X] README.md
* \[X] docs/point-view-overview.md
* \[X] docs/v1-spec.md
* \[X] docs/findings-so-far.md
* \[X] docs/future-features.md
* \[X] docs/math-notes.md
* \[X] logs/test-log-v1.md
* \[X] notes/raw-project-notes.md

