import React, { useState } from 'react';

const SUPERADMIN_EMAIL = 'superadmin@saas.local';
const SUPERADMIN_PASS = 'SuperAdmin#123';

export default function AuthCard({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === SUPERADMIN_EMAIL && password === SUPERADMIN_PASS) {
        onLogin({ email, role: 'superadmin' });
      } else if (email && password) {
        onLogin({ email, role: 'user' });
      } else {
        setError('Please enter both email and password.');
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Sign in</h2>
          <p className="mt-1 text-sm text-slate-300">Access your dashboard</p>
        </div>
        <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-300 border border-emerald-400/30">Demo</span>
      </div>

      <div className="mt-3 text-xs text-slate-400">
        Superadmin: {SUPERADMIN_EMAIL} / {SUPERADMIN_PASS}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && <div className="text-sm text-rose-400">{error}</div>}
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 font-medium text-white hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
