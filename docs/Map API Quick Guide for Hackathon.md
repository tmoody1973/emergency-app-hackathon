# Map API Quick Guide for Hackathon
## Best Options Ranked by Speed & Ease

---

## 🥇 RECOMMENDED: Leaflet + OpenStreetMap (FASTEST)

### Why This is Best for Your Hackathon:
- ✅ **No API key required** - Zero setup time
- ✅ **Completely free** - No credit card, no limits
- ✅ **5 minutes to implement** - Simplest integration
- ✅ **Lightweight** - Fast loading
- ✅ **React-friendly** - Works great with Next.js

### Installation (1 minute):
```bash
npm install leaflet react-leaflet
```

### Implementation (4 minutes):

**Create `/src/components/Map.tsx`:**
```typescript
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Emergency {
  id: string;
  lat: number;
  lng: number;
  type: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  description: string;
}

interface EmergencyMapProps {
  emergencies: Emergency[];
  center?: [number, number];
  zoom?: number;
}

export default function EmergencyMap({ 
  emergencies, 
  center = [39.7817, -89.6501], // Springfield, IL
  zoom = 13 
}: EmergencyMapProps) {
  
  // Color code by urgency
  const getMarkerColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '400px', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {emergencies.map((emergency) => (
        <Marker 
          key={emergency.id} 
          position={[emergency.lat, emergency.lng]}
        >
          <Popup>
            <div className="p-2">
              <div className={`font-bold text-${getMarkerColor(emergency.urgency)}-600`}>
                {emergency.type.toUpperCase()}
              </div>
              <div className="text-sm mt-1">{emergency.description}</div>
              <div className="text-xs text-gray-500 mt-1">
                Urgency: {emergency.urgency}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

**Use in your dashboard:**
```typescript
import dynamic from 'next/dynamic';

// Import dynamically to avoid SSR issues
const EmergencyMap = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
});

export default function Dashboard() {
  const emergencies = [
    { id: '1', lat: 39.7834, lng: -89.6489, type: 'flood', urgency: 'high', description: 'Family needs shelter' },
    { id: '2', lat: 39.7756, lng: -89.6512, type: 'fire', urgency: 'critical', description: 'Elderly couple displaced' },
  ];

  return (
    <div>
      <h1>Emergency Dashboard</h1>
      <EmergencyMap emergencies={emergencies} />
    </div>
  );
}
```

### Custom Marker Colors (Optional):
```typescript
// Create custom colored markers
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white;"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 24],
  });
};

// Use in Marker component
<Marker 
  position={[emergency.lat, emergency.lng]}
  icon={createCustomIcon(getMarkerColor(emergency.urgency))}
>
```

---

## 🥈 ALTERNATIVE: Mapbox (More Features, Requires API Key)

### Why Consider This:
- ✅ Beautiful, modern design
- ✅ 50,000 free map loads/month
- ✅ Better performance for many markers
- ❌ Requires API key (2 min signup)
- ❌ Slightly more complex setup

### Setup (5 minutes):

1. **Get API Key:**
   - Go to https://www.mapbox.com
   - Sign up (free)
   - Copy your access token

2. **Install:**
```bash
npm install mapbox-gl react-map-gl
```

3. **Add to `.env.local`:**
```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
```

### Implementation:
```typescript
'use client';

import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';

export default function MapboxEmergencyMap({ emergencies }) {
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <Map
      initialViewState={{
        longitude: -89.6501,
        latitude: 39.7817,
        zoom: 12
      }}
      style={{ width: '100%', height: 400, borderRadius: '8px' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      {emergencies.map((emergency) => (
        <Marker
          key={emergency.id}
          longitude={emergency.lng}
          latitude={emergency.lat}
          color={emergency.urgency === 'critical' ? 'red' : 'orange'}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(emergency);
          }}
        />
      ))}

      {popupInfo && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <h3 className="font-bold">{popupInfo.type}</h3>
            <p>{popupInfo.description}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
```

---

## 🥉 BACKUP: Google Maps (Most Familiar, Requires Credit Card)

### Why You Might Skip This:
- ❌ Requires credit card (even for free tier)
- ❌ More complex API key setup
- ❌ Slower to implement
- ✅ Most familiar to users
- ✅ Best geocoding

### Only Use If:
- You already have a Google Cloud account
- You need the best geocoding accuracy
- You have extra time

### Quick Setup:
```bash
npm install @vis.gl/react-google-maps
```

```typescript
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function GoogleEmergencyMap({ emergencies }) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
      <Map
        defaultCenter={{ lat: 39.7817, lng: -89.6501 }}
        defaultZoom={12}
        style={{ width: '100%', height: '400px' }}
      >
        {emergencies.map((emergency) => (
          <Marker
            key={emergency.id}
            position={{ lat: emergency.lat, lng: emergency.lng }}
          />
        ))}
      </Map>
    </APIProvider>
  );
}
```

---

## 🚀 ULTRA-FAST OPTION: Static Map Image (No JavaScript)

### For Absolute Minimal Time:
If you just need to show a map in your presentation and don't need interactivity:

```typescript
export default function StaticMap({ lat, lng, emergencies }) {
  // Use OpenStreetMap static image API
  const markers = emergencies.map(e => 
    `pin-s-${e.urgency[0]}+${e.urgency === 'critical' ? 'f00' : 'f80'}(${e.lng},${e.lat})`
  ).join(',');
  
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${markers}/${lng},${lat},12,0/600x400@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

  return <img src={mapUrl} alt="Emergency Map" className="w-full rounded-lg" />;
}
```

Or even simpler with OpenStreetMap static:
```typescript
export default function SimpleStaticMap({ lat, lng }) {
  return (
    <img 
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.05},${lat-0.05},${lng+0.05},${lat+0.05}&layer=mapnik&marker=${lat},${lng}`}
      alt="Location Map"
      className="w-full h-64 rounded-lg"
    />
  );
}
```

---

## 📊 Comparison Table

| Feature | Leaflet + OSM | Mapbox | Google Maps | Static Image |
|---------|---------------|---------|-------------|--------------|
| **Setup Time** | 5 min | 7 min | 10 min | 2 min |
| **API Key Required** | ❌ No | ✅ Yes (free) | ✅ Yes (CC required) | ❌ No |
| **Free Tier** | Unlimited | 50k loads/mo | $200 credit | Unlimited |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Interactive** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Looks Modern** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Customization** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐ |

---

## 🎯 My Recommendation for Your Hackathon

**Use Leaflet + OpenStreetMap** because:

1. **Zero friction**: No API keys, no signup, no credit card
2. **Fast**: 5 minutes from install to working map
3. **Reliable**: Won't hit rate limits during demo
4. **Good enough**: Looks professional, works smoothly
5. **Time-saver**: Spend your 3 hours on AI features, not map debugging

### If You Have Extra Time:
Upgrade to **Mapbox** for a more polished look. But only if everything else is done.

---

## 🛠️ Complete Claude Code Prompt for Map Integration

Use this prompt with Claude Code to add the map to your dashboard:

```
Add an interactive emergency map to the dashboard using Leaflet and OpenStreetMap.

Requirements:
1. Install leaflet and react-leaflet packages
2. Create a Map component at /src/components/EmergencyMap.tsx
3. Display emergencies as markers on the map
4. Color-code markers by urgency:
   - Critical: Red
   - High: Orange
   - Medium: Yellow
   - Low: Blue
5. Show popup on marker click with emergency details
6. Center map on Springfield, IL (39.7817, -89.6501)
7. Make it responsive and work with Next.js (use dynamic import to avoid SSR issues)
8. Style with Tailwind CSS

The component should accept emergencies as props with this structure:
{
  id: string,
  lat: number,
  lng: number,
  emergency_type: string,
  urgency: string,
  description: string
}

Include proper TypeScript types and error handling.
Make the map 400px height on desktop, 300px on mobile.
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "window is not defined" error
**Fix:** Use dynamic import with `ssr: false`
```typescript
const Map = dynamic(() => import('@/components/Map'), { ssr: false });
```

### Issue 2: Markers not showing
**Fix:** Add the icon fix at the top of your Map component (see Leaflet example above)

### Issue 3: Map not loading
**Fix:** Make sure you imported the CSS:
```typescript
import 'leaflet/dist/leaflet.css';
```

### Issue 4: Styling conflicts
**Fix:** Add this to your global CSS:
```css
.leaflet-container {
  z-index: 0;
}
```

---

## ⚡ Time-Saving Tips

1. **Don't overthink it**: A simple map with pins is enough for the demo
2. **Use mock coordinates**: Don't waste time on real geocoding during development
3. **Test with 2-3 markers**: Don't need 100 markers to prove the concept
4. **Skip clustering**: Not needed for a demo with < 20 emergencies
5. **Focus on the story**: The map is visual support, not the main feature

---

## 📝 Final Recommendation

**For your 3-hour hackathon:**

```bash
# Install this (30 seconds)
npm install leaflet react-leaflet

# Copy the Leaflet example code above (2 minutes)
# Add to your dashboard (2 minutes)
# Test with mock data (1 minute)
```

**Total time: 5 minutes**

Then spend the remaining 2 hours 55 minutes on:
- AI extraction (the "wow" factor)
- Matching algorithm (the intelligence)
- Real-time updates (the proof it works)

The map is just visual polish. Don't let it eat your time!

---

Good luck! 🗺️

