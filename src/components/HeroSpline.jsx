import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <section className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <Spline
        scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-end p-6">
        <div className="backdrop-blur-sm rounded-xl bg-slate-900/40 p-4 md:p-6 shadow-xl border border-white/10">
          <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            Iridescent Identity Dashboard
          </h1>
          <p className="mt-1 text-sm md:text-base text-slate-300 max-w-2xl">
            A modern SaaS cockpit for customers, auth, and live geolocation — styled with a holographic, futuristic aesthetic.
          </p>
        </div>
      </div>
    </section>
  );
}
