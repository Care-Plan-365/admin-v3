import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export const AppLayout = () => {
  const { logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-cp365-bg">
      <header className="bg-cp365-surface shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cp365-accent text-lg font-bold text-white">
              CP
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-cp365-textMuted">
                Care Plan 365
              </p>
              <p className="text-base font-semibold text-cp365-textMain">Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cp365-primary/15 text-sm font-semibold text-cp365-primary">
              AD
            </div>
            <Button variant="secondary" size="sm" onClick={handleLogout} disabled={loading}>
              {loading ? 'Logging out…' : 'Logout'}
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
