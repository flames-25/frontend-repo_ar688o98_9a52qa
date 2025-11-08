import React, { useState } from 'react';
import HeroCover from './components/HeroCover';
import AuthCard from './components/AuthCard';
import CustomerForm from './components/CustomerForm';
import MapInteractive from './components/MapInteractive';

export default function App() {
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', lat: '', lng: '' });

  const handleFormChange = (next) => setCustomer(next);
  const handleMapChange = ({ lat, lng }) => setCustomer((c) => ({ ...c, lat, lng }));

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <HeroCover />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {!user ? (
            <AuthCard onLogin={setUser} />
          ) : (
            <div className="w-full rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Welcome</h2>
                  <p className="text-sm text-slate-300">Signed in as {user.email} {user.role === 'superadmin' && <span className="ml-2 rounded bg-emerald-500/15 px-2 py-0.5 text-emerald-300 border border-emerald-400/30 text-xs">Superadmin</span>}</p>
                </div>
                <button
                  onClick={() => setUser(null)}
                  className="rounded-lg border border-white/10 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}

          {user && (
            <CustomerForm value={customer} onChange={handleFormChange} onSubmit={() => {}} />
          )}
        </div>

        <div className="mt-6">
          <MapInteractive lat={customer.lat} lng={customer.lng} onChange={handleMapChange} />
        </div>
      </div>
    </div>
  );
}
