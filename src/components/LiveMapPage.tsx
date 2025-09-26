import * as React from 'react';

export default function LiveMapPage() {
  const mapRef = React.useRef<any>(null);
  const mapInstanceRef = React.useRef<any>(null);
  // Helper to remove event listeners
  function removeListeners() {
    const showBtn = document.getElementById('showRouteBtn');
    const resetBtn = document.getElementById('resetBtn');
    if (showBtn) showBtn.replaceWith(showBtn.cloneNode(true));
    if (resetBtn) resetBtn.replaceWith(resetBtn.cloneNode(true));
  }
  // Helper to fully destroy the map instance
  function clearMapInstance() {
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch {}
      mapInstanceRef.current = null;
    }
    if (mapRef.current) {
      mapRef.current.innerHTML = '';
    }
  }
  // Map initialization logic
  function initMap() {
    // @ts-ignore
    const L = (window as any).L;
    if (!L || !mapRef.current) return;
    // Station coordinates
    const stations: { [key: string]: number[] } = {
        'Pune Junction': [18.5286, 73.8745],
        'Shivajinagar': [18.5328, 73.8769],
        'Khadki': [18.5513, 73.8416],
        'Hadapsar': [18.5012, 73.9336],
        'Pimpri': [18.6298, 73.7997],
        'Patna Junction': [25.5941, 85.1376],
        'Rajendra Nagar Terminal': [25.5877, 85.0985],
        'Danapur': [25.6009, 85.0111],
        'Patliputra Junction': [25.5736, 85.09],
        'Gulzarbagh': [25.6045, 85.1539],
      };
      const puneStations = [
        'Pune Junction',
        'Shivajinagar',
        'Khadki',
        'Hadapsar',
        'Pimpri',
      ];
      const patnaStations = [
        'Patna Junction',
        'Rajendra Nagar Terminal',
        'Danapur',
        'Patliputra Junction',
        'Gulzarbagh',
      ];
    // Clear previous map instance
    clearMapInstance();
    // Map setup
    const map = L.map(mapRef.current).setView([22, 79], 5);
    mapInstanceRef.current = map;
    // Detect dark mode
    const isDark = document.documentElement.classList.contains('dark');
    // Use dark or light tile layer
    const tileUrl = isDark
      ? 'https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png'
      : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = isDark
      ? '© Stadia Maps, © OpenMapTiles, © OpenStreetMap'
      : '© OpenStreetMap';
    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution,
    }).addTo(map);
    let routeLine: any = null, trainMarker: any = null, animTimer: any = null, stepIndex = 0;
    // Train icon
    const trainIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    // Populate selects
    const srcSel = document.getElementById('sourceSelect') as HTMLSelectElement;
    const dstSel = document.getElementById('destSelect') as HTMLSelectElement;
    if (srcSel && srcSel.childElementCount <= 1) {
      puneStations.forEach((s) => {
        const o = document.createElement('option');
        o.value = s;
        o.textContent = s;
        srcSel.appendChild(o);
      });
    }
    if (dstSel && dstSel.childElementCount <= 1) {
      patnaStations.forEach((s) => {
        const o = document.createElement('option');
        o.value = s;
        o.textContent = s;
        dstSel.appendChild(o);
      });
    }
    // Show route + simulate train
    document.getElementById('showRouteBtn')?.addEventListener('click', () => {
      const src = srcSel.value,
        dst = dstSel.value;
      if (!src || !dst) return alert('Select both stations!');
      const srcCoords = stations[src],
        dstCoords = stations[dst];
      if (!srcCoords || !dstCoords) return;
      if (routeLine) {
        map.removeLayer(routeLine);
      }
      if (trainMarker) {
        map.removeLayer(trainMarker);
        clearInterval(animTimer);
      }
      routeLine = L.polyline([srcCoords, dstCoords], { color: '#0b6efd', weight: 5 }).addTo(map);
      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
      trainMarker = L.marker(srcCoords, { icon: trainIcon }).addTo(map);
      stepIndex = 0;
      const steps = 200;
      animTimer = setInterval(() => {
        stepIndex++;
        const lat = srcCoords[0] + (dstCoords[0] - srcCoords[0]) * (stepIndex / steps);
        const lng = srcCoords[1] + (dstCoords[1] - srcCoords[1]) * (stepIndex / steps);
        trainMarker.setLatLng([lat, lng]);
        if (stepIndex >= steps) stepIndex = 0;
      }, 200);
    });
    // Reset
    document.getElementById('resetBtn')?.addEventListener('click', () => {
      if (routeLine) {
        map.removeLayer(routeLine);
        routeLine = null;
      }
      if (trainMarker) {
        map.removeLayer(trainMarker);
        trainMarker = null;
        clearInterval(animTimer);
      }
      srcSel.value = '';
      dstSel.value = '';
      map.setView([22, 79], 5);
    });
  }
  React.useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.id = 'live-leaflet-map';
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }
    // Load Leaflet JS and initialize
    // @ts-ignore
    function startMap() {
      removeListeners();
      clearMapInstance();
      initMap();
    }
    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = startMap;
      document.body.appendChild(script);
    } else {
      startMap();
    }
    // Listen for theme changes and fully re-initialize the map for correct tile rendering
    const themeObserver = new MutationObserver(() => {
      startMap();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      removeListeners();
      clearMapInstance();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Live Map</h1>
      <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 rounded-2xl shadow flex flex-col md:flex-row gap-7 items-stretch border border-slate-100 dark:border-slate-800">
        {/* Left panel */}
        <div className="w-full md:w-80 bg-white/80 dark:bg-slate-800/80 rounded-xl p-6 flex flex-col gap-4 mb-4 md:mb-0 border border-slate-100 dark:border-slate-700 shadow-sm">
          <label htmlFor="sourceSelect" className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Source (Pune)</label>
          <select id="sourceSelect" className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 mb-2 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-200">
            <option value="">— Select Source —</option>
          </select>
          <label htmlFor="destSelect" className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">Destination (Patna)</label>
          <select id="destSelect" className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 mb-2 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-200">
            <option value="">— Select Destination —</option>
          </select>
          <div className="flex gap-2 mt-2">
            <button id="showRouteBtn" className="flex-1 bg-emerald-400 hover:bg-emerald-500 text-white font-semibold py-2 rounded-lg shadow-sm transition">Show Route</button>
            <button id="resetBtn" className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100 border border-slate-200 dark:border-slate-600 font-semibold py-2 rounded-lg shadow-sm transition">Reset</button>
          </div>
        </div>
        {/* Map */}
        <div className="flex-1 min-h-[400px] h-[500px] rounded-xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-900" ref={mapRef} />
      </div>
    </div>
  );
}
