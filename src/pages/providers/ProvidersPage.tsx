import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { CurrentProvidersTab } from './CurrentProvidersTab';
import { NewProvidersTab } from './NewProvidersTab';
import { RejectedProvidersTab } from './RejectedProvidersTab';
import { useProviderContext } from '../../hooks/useProviderContext';

export const ProvidersPage = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'new' | 'rejected'>('current');
  const navigate = useNavigate();
  const { refreshProviders, hasLoaded, isLoading, error } = useProviderContext();

  useEffect(() => {
    if (!hasLoaded && !isLoading) {
      refreshProviders();
    }
  }, [hasLoaded, isLoading, refreshProviders]);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
            Admin / Provider
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-cp365-textMain">Provider</h1>
          <p className="text-sm text-cp365-textMuted">
            Review new provider applications and manage current teams.
          </p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Go Back
        </Button>
      </header>

      <Card className="rounded-3xl p-6">
        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
            Provider Management
          </p>
          <span className="text-sm font-medium text-cp365-textMuted">
            Updated today • {new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="mt-6">
            <Tabs
              tabs={[
                { id: 'current', label: 'Current Providers' },
                { id: 'new', label: 'New Providers' },
                { id: 'rejected', label: 'Rejected Providers' },
              ]}
              activeTab={activeTab}
              onChange={(tabId) => setActiveTab(tabId as 'current' | 'new' | 'rejected')}
            />
        </div>
          <div className="pt-6">
            {activeTab === 'current' && <CurrentProvidersTab />}
            {activeTab === 'new' && <NewProvidersTab />}
            {activeTab === 'rejected' && <RejectedProvidersTab />}
          </div>
      </Card>
    </section>
  );
};
