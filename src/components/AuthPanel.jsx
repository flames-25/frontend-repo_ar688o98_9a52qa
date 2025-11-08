import React, { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';

export default function AuthPanel({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Simulated auth for UI purposes; backend endpoint can replace this.
      await new Promise((res) => setTimeout(res, 800));
      if (!email || !password) throw new Error('Please enter email and password');
      onAuth?.({ email });
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl">
      <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-cyan-400" /> Sign in
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Email</span>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800/60 px-3">
            <User className="h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent py-2 text-white placeholder-slate-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Password</span>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800/60 px-3">
            <Lock className="h-4 w-4 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent py-2 text-white placeholder-slate-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
        </label>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-900 hover:bg-cyan-400 disabled:opacity-60"
        >
          <LogIn className="h-4 w-4" />
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
