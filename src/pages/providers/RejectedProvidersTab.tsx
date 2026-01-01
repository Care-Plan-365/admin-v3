import { useProviderContext } from '../../hooks/useProviderContext';
import { ProvidersTable } from './ProvidersTable';

export const RejectedProvidersTab = () => {
  const { providers, isLoading } = useProviderContext();
  // This tab uses the existing "Rejected" providers query (triggered by `ProvidersPage`),
  // so the current `providers` list is already the rejected set.
  const rejectedProviders = providers;

  if (isLoading && !providers.length) {
    return (
      <div className="rounded-2xl border border-dashed border-cp365-border bg-white px-8 py-12 text-center text-sm text-cp365-textMuted">
        Loading providers…
      </div>
    );
  }

  if (rejectedProviders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-cp365-border bg-cp365-bg/60 px-8 py-12 text-center">
        <h3 className="text-xl font-semibold text-cp365-textMain">No rejected providers</h3>
        <p className="mt-2 text-sm text-cp365-textMuted">
          Providers you reject will appear here for audit tracking and follow-up.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
          Rejected Providers
        </p>
        <h2 className="text-xl font-semibold text-cp365-textMain">Awaiting reconsideration</h2>
      </div>

      <ProvidersTable providers={rejectedProviders} includePractice />
    </div>
  );
};
