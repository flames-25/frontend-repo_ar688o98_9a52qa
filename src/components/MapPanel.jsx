import React, { useEffect, useRef } from 'react';

// Simple OpenStreetMap embed that stays in sync with provided coords
export default function MapPanel({ coords, onMapClick }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!coords) return;
    const { lat, lng } = coords;
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02}%2C${lat - 0.01}%2C${lng + 0.02}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`;
    if (iframeRef.current && iframeRef.current.src !== src) {
      iframeRef.current.src = src;
    }
  }, [coords]);

  // We can't directly capture clicks inside the OSM iframe for coordinates without a lib.
  // For this UI, we expose a helper control to quickly set to a demo location.
  const setDemo = (lat, lng) => onMapClick?.({ lat, lng });

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="text-white font-semibold">Location</div>
        <div className="flex gap-2 text-xs">
          <button onClick={() => setDemo(37.7749, -122.4194)} className="rounded-md bg-slate-800/60 px-3 py-1 text-slate-300 hover:text-white border border-white/10">SF</button>
          <button onClick={() => setDemo(40.7128, -74.006)} className="rounded-md bg-slate-800/60 px-3 py-1 text-slate-300 hover:text-white border border-white/10">NYC</button>
          <button onClick={() => setDemo(51.5074, -0.1278)} className="rounded-md bg-slate-800/60 px-3 py-1 text-slate-300 hover:text-white border border-white/10">LDN</button>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <iframe
          ref={iframeRef}
          title="OpenStreetMap"
          className="h-full w-full"
          frameBorder="0"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4394%2C37.7649%2C-122.3994%2C37.7849&layer=mapnik&marker=37.7749%2C-122.4194"
        />
      </div>
    </div>
  );
}
