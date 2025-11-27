// utils/distanceCalculator.ts
import { distanceMap } from "../distanceData";

export const getDistance = (storePin: string, customerPin: string) => {
  const storeDistances = distanceMap[storePin];

  // If we have explicit distance for this PIN, use it
  if (storeDistances && storeDistances[customerPin]) {
    return storeDistances[customerPin];
  }

  // ⭐ Fallback logic: simple approximation based on numeric difference
  // This is just a backup when new PINs appear.
  if (storePin.startsWith("462") && customerPin.startsWith("462")) {
    const diff = Math.abs(Number(storePin) - Number(customerPin));

    if (diff <= 5) return 4;   // very close
    if (diff <= 20) return 8;  // medium
    if (diff <= 50) return 12; // far in city
    return 18;                 // outer belt
  }

  // If totally unknown or outside 462***, return null
  return null;
};
