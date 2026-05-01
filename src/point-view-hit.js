import {
  getLocalChange,
  getOriginDrift,
  getPerceptionBand,
  getDriftContribution,
} from "./point-view-math.js";

export function getHitTypeForStep({
  localChange,
  accumulatedDrift,
  originDrift,
  params,
}) {
  if (localChange > params.boundary_threshold) {
    return "boundary_jump";
  }

  if (accumulatedDrift > params.drift_threshold) {
    return "accumulated_drift";
  }

  if (originDrift > params.origin_threshold) {
    return "origin_drift";
  }

  return null;
}

export function evaluatePerceptionStep({
  previousColor,
  currentColor,
  originColor,
  accumulatedDrift,
  params,
}) {
  const localChange = getLocalChange(previousColor, currentColor);
  const originDrift = getOriginDrift(originColor, currentColor);
  const perceptionBand = getPerceptionBand(localChange, params);
  const contribution = getDriftContribution(localChange, params);

  const nextAccumulatedDrift =
    contribution === null
      ? accumulatedDrift
      : accumulatedDrift + contribution;

  const hitType = getHitTypeForStep({
    localChange,
    accumulatedDrift: nextAccumulatedDrift,
    originDrift,
    params,
  });

  return {
    local_change: localChange,
    origin_drift: originDrift,
    accumulated_drift: nextAccumulatedDrift,
    perception_band: perceptionBand,
    drift_contribution: contribution,
    hit_type: hitType,
    should_stop: hitType !== null,
  };
}