export function rgbDistance(c1, c2) {
  const dr = c2.r - c1.r;
  const dg = c2.g - c1.g;
  const db = c2.b - c1.b;

  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function getLocalChange(previousColor, currentColor) {
  return rgbDistance(previousColor, currentColor);
}

export function getOriginDrift(originColor, currentColor) {
  return rgbDistance(originColor, currentColor);
}

export function getPerceptionBand(localChange, params) {
  if (localChange < params.noise_floor) {
    return "noise";
  }

  if (localChange < params.cluster_ceiling) {
    return "soft_cluster_variation";
  }

  if (localChange <= params.boundary_threshold) {
    return "meaningful_cluster_variation";
  }

  return "boundary_jump";
}

export function getDriftContribution(localChange, params) {
  if (localChange < params.noise_floor) {
    return 0;
  }

  if (localChange < params.cluster_ceiling) {
    return localChange * params.soft_weight;
  }

  if (localChange <= params.boundary_threshold) {
    return localChange;
  }

  return null;
}