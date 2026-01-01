import { Button } from '../../components/ui/Button';
import { useProviderContext } from '../../hooks/useProviderContext';
import { ProvidersTable } from './ProvidersTable';

export const NewProvidersTab = () => {
  const { providers, approveProvider, rejectProvider, isLoading, updating } = useProviderContext();
  // This tab uses the existing "Pending" providers query (triggered by `ProvidersPage`),
  // so the current `providers` list is already the pending set.
  const pendingProviders = providers;

  if (isLoading && !providers.length) {
    return (
      <div className="rounded-2xl border border-dashed border-cp365-border bg-white px-8 py-12 text-center text-sm text-cp365-textMuted">
        Loading providers…
      </div>
    );
  }

  if (pendingProviders.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-cp365-border bg-cp365-bg/60 px-8 py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
          <span className="text-2xl text-cp365-primary">✓</span>
        </div>
        <h3 className="text-xl font-semibold text-cp365-textMain">No new providers awaiting approval</h3>
        <p className="mt-2 text-sm text-cp365-textMuted">
          You’ll be notified here whenever a provider submits new onboarding details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">New Providers</p>
          <h2 className="text-xl font-semibold text-cp365-textMain">Pending approval</h2>
        </div>
        <p className="text-sm font-medium text-cp365-textMuted">{pendingProviders.length} awaiting review</p>
      </div>

      <ProvidersTable
        providers={pendingProviders}
        renderActions={(provider) => {
          const isUpdating = Boolean(updating[provider.id]);
          return (
            <>
              <Button size="sm" onClick={() => approveProvider(provider.id)} disabled={isUpdating}>
                {isUpdating ? 'Updating…' : 'Approve'}
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => rejectProvider(provider.id)}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating…' : 'Reject'}
              </Button>
            </>
          );
        }}
      />
    </div>
  );
};
