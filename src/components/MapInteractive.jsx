import React, { useEffect, useRef } from 'react';

// Lightweight Leaflet loader without npm dependency
function loadLeaflet() {
  const ensure = (tagName, attrs) => {
    return new Promise((resolve) => {
      const exists = document.querySelector(`${tagName}[data-leaflet-loader]`);
      if (exists) return resolve();
      const el = document.createElement(tagName);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      el.setAttribute('data-leaflet-loader', '');
      el.onload = () => resolve();
      document.head.appendChild(el);
    });
  };

  const cssUrl = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  const jsUrl = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

  return ensure('link', { rel: 'stylesheet', href: cssUrl })
    .then(() => ensure('script', { src: jsUrl }))
    .then(() => new Promise((r) => {
      if (window.L) return r();
      // fallback in case onload already fired
      const check = () => (window.L ? r() : setTimeout(check, 50));
      check();
    }));
}

export default function MapInteractive({ lat, lng, onChange }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    let map;
    let marker;
    let cleanup = () => {};

    loadLeaflet().then(() => {
      const L = window.L;
      const cLat = parseFloat(lat) || 0;
      const cLng = parseFloat(lng) || 0;

      map = L.map(containerRef.current, { zoomControl: true }).setView([cLat, cLng], (lat && lng) ? 13 : 2);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      marker = L.marker([cLat, cLng], { draggable: true }).addTo(map);
      markerRef.current = marker;

      const emit = (ll) => {
        const { lat: nlat, lng: nlng } = ll;
        onChange && onChange({ lat: nlat.toFixed(6), lng: nlng.toFixed(6) });
      };

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        emit(e.latlng);
      });

      marker.on('dragend', () => {
        const ll = marker.getLatLng();
        emit(ll);
      });

      map.on('moveend', () => {
        // Keep marker centered if no coordinates were set yet
        if (!(lat && lng)) {
          const center = map.getCenter();
          marker.setLatLng(center);
          emit(center);
        }
      });

      cleanup = () => {
        map.off();
        map.remove();
      };
    });

    return () => cleanup();
  }, []);

  // Update marker when props change
  useEffect(() => {
    const L = window.L;
    if (!L) return;
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;

    const cLat = parseFloat(lat);
    const cLng = parseFloat(lng);
    if (isFinite(cLat) && isFinite(cLng)) {
      marker.setLatLng([cLat, cLng]);
      map.setView([cLat, cLng], map.getZoom() || 13, { animate: true });
    }
  }, [lat, lng]);

  return (
    <div className="w-full rounded-2xl border border-white/10 overflow-hidden bg-slate-900/60 backdrop-blur shadow-xl">
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-base font-semibold text-white">Interactive Map</h3>
          <p className="text-sm text-slate-300">Click or drag marker to update coordinates</p>
        </div>
        <div className="text-xs text-slate-400">{lat || '—'}, {lng || '—'}</div>
      </div>
      <div ref={containerRef} className="h-[380px] w-full" />
    </div>
  );
}
