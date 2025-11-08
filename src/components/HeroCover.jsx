import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      <Spline
        scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      {/* subtle overlay to ensure text legibility without blocking interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

      <div className="absolute inset-0 flex items-end p-6 md:p-8">
        <div className="backdrop-blur-sm rounded-xl bg-black/40 p-4 md:p-6 shadow-xl border border-white/10">
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Topographic Insights Dashboard
          </h1>
          <p className="mt-1 text-sm md:text-base text-slate-300 max-w-2xl">
            Secure access, customer profiles, and live map coordinates — styled with a futuristic data-visual theme.
          </p>
        </div>
      </div>
    </section>
  );
}
