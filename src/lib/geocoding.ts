/**
 * Geocoding service to convert addresses to latitude/longitude coordinates
 * Uses Nominatim (OpenStreetMap's free geocoding service)
 *
 * Note: For production, consider using a paid service like Google Maps Geocoding API
 * or Mapbox for better accuracy and rate limits.
 */

interface GeocodeResult {
  lat: number;
  lng: number;
  display_name: string;
}

/**
 * Convert an address string to latitude/longitude coordinates
 *
 * @param address - Full address string (e.g., "123 Oak Street, Springfield, IL")
 * @returns Promise with lat/lng coordinates or null if not found
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  if (!address || address.trim().length === 0) {
    console.warn('Geocoding: Empty address provided');
    return null;
  }

  try {
    // Use Nominatim (OpenStreetMap's free geocoding service)
    // Rate limit: 1 request per second
    // Attribution required (added in map component)
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1&countrycodes=us`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RapidResponse Emergency App', // Required by Nominatim
      },
    });

    if (!response.ok) {
      console.error('Geocoding API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      console.warn('Geocoding: No results found for address:', address);
      return null;
    }

    const result = data[0];

    return {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      display_name: result.display_name,
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

/**
 * Batch geocode multiple addresses with rate limiting
 *
 * @param addresses - Array of address strings
 * @returns Promise with array of results (null for failed geocodes)
 */
export async function geocodeAddresses(addresses: string[]): Promise<(GeocodeResult | null)[]> {
  const results: (GeocodeResult | null)[] = [];

  for (const address of addresses) {
    const result = await geocodeAddress(address);
    results.push(result);

    // Rate limit: Wait 1 second between requests (Nominatim requirement)
    if (addresses.indexOf(address) < addresses.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

/**
 * Get a default fallback location for when geocoding fails
 * Returns Springfield, IL coordinates as default
 */
export function getDefaultLocation(): { lat: number; lng: number } {
  return {
    lat: 39.7817,
    lng: -89.6501,
  };
}
