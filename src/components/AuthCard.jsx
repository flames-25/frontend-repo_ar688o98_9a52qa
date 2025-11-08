import React, { useState } from 'react';

export default function AuthCard({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Demo auth: accept any non-empty credentials
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        onLogin({ email });
      } else {
        setError('Please enter both email and password.');
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur shadow-xl">
      <h2 className="text-lg font-semibold text-white">Sign in</h2>
      <p className="mt-1 text-sm text-slate-300">Access your dashboard</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
