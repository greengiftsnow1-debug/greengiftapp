// app/api/distance/local.ts
import { distanceMap } from "../../../distanceData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const storePin = searchParams.get("store_pin")!;
  const customerPin = searchParams.get("customer_pin")!;

  const storeDistances = distanceMap[storePin];

  if (!storeDistances || !storeDistances[customerPin]) {
    return new Response(
      JSON.stringify({
        error: "Distance not available. Add this PIN to distanceData.ts",
      }),
      { status: 404 }
    );
  }

  return new Response(
    JSON.stringify({
      distance_km: storeDistances[customerPin],
    })
  );
}
