import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const { login, isAuthenticated, loading, error: authError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    login(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cp365-bg px-4">
      <Card className="w-full max-w-md rounded-3xl p-8 shadow-soft">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cp365-accent text-xl font-bold text-white">
            CP
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
            Care Plan 365
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-cp365-textMain">Admin Login</h1>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
              Email / Username
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-cp365-border bg-white px-4 py-3 text-sm text-cp365-textMain focus:outline-none focus:ring-2 focus:ring-cp365-primary"
              placeholder="admin@careplan365.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-cp365-border bg-white px-4 py-3 text-sm text-cp365-textMain focus:outline-none focus:ring-2 focus:ring-cp365-primary"
              placeholder="••••••••"
            />
          </div>
          {(error || authError) && <p className="text-sm text-red-600">{error || authError}</p>}
          <Button type="submit" className="w-full justify-center" disabled={loading}>
            {loading ? 'Signing In…' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
