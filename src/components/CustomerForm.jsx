import React, { useState, useEffect } from 'react';

export default function CustomerForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    // Try geolocation to prefill coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setForm((f) => ({ ...f, lat: latitude.toFixed(6), lng: longitude.toFixed(6) }));
        },
        () => {}
      );
    }
  }, []);

  const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur shadow-xl">
      <h3 className="text-base font-semibold text-white">Customer Details</h3>
      <p className="mt-1 text-sm text-slate-300">Create or update a customer profile</p>

      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Name</label>
          <input
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Acme Corp"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="billing@acme.com"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Phone</label>
          <input
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="+1 555 123 4567"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Address</label>
          <input
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="500 Market St, San Francisco, CA"
            value={form.address}
            onChange={(e) => updateField('address', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Latitude</label>
          <input
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="37.7749"
            value={form.lat}
            onChange={(e) => updateField('lat', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Longitude</label>
          <input
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="-122.4194"
            value={form.lng}
            onChange={(e) => updateField('lng', e.target.value)}
          />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 font-medium text-white hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Save Customer
          </button>
        </div>
      </form>
    </div>
  );
}
