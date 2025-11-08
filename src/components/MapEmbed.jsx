import React, { useMemo } from 'react';

export default function MapEmbed({ lat, lng }) {
  const src = useMemo(() => {
    const clat = parseFloat(lat) || 0;
    const clng = parseFloat(lng) || 0;
    const bbox = [clng - 0.05, clat - 0.03, clng + 0.05, clat + 0.03].join(',');
    const marker = `${clat}%2C${clng}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
  }, [lat, lng]);

  return (
    <div className="w-full rounded-2xl border border-white/10 overflow-hidden bg-slate-900/60 backdrop-blur shadow-xl">
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-base font-semibold text-white">Location</h3>
          <p className="text-sm text-slate-300">Synced with latitude/longitude</p>
        </div>
        <div className="text-xs text-slate-400">{lat || '—'}, {lng || '—'}</div>
      </div>
      <iframe
        title="OpenStreetMap"
        className="h-[340px] w-full"
        src={src}
      />
    </div>
  );
}
