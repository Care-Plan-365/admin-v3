import { useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useProviderContext } from '../../hooks/useProviderContext';
import { ProvidersTable } from './ProvidersTable';

export const NewProvidersTab = () => {
  const { providers, approveProvider, rejectProvider, isLoading, updating } = useProviderContext();
  // This tab uses the existing "Pending" providers query (triggered by `ProvidersPage`),
  // so the current `providers` list is already the pending set.
  const pendingProviders = providers;
  const [confirmation, setConfirmation] = useState<{ id: string; action: 'approve' | 'reject' } | null>(null);

  const confirmationCopy = useMemo(() => {
    if (!confirmation) {
      return null;
    }

    return confirmation.action === 'approve'
      ? 'Are you sure you want to approve this provider'
      : 'Are you sure you want to reject this provider';
  }, [confirmation]);

  const isConfirming = Boolean(confirmation);
  const isConfirmationUpdating = confirmation ? Boolean(updating[confirmation.id]) : false;

  const closeConfirmation = () => setConfirmation(null);
  const confirmAction = () => {
    if (!confirmation) {
      return;
    }

    if (confirmation.action === 'approve') {
      approveProvider(confirmation.id);
      closeConfirmation();
      return;
    }

    rejectProvider(confirmation.id);
    closeConfirmation();
  };

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
              <Button
                size="sm"
                onClick={() => setConfirmation({ id: provider.id, action: 'approve' })}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating…' : 'Approve'}
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => setConfirmation({ id: provider.id, action: 'reject' })}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating…' : 'Reject'}
              </Button>
            </>
          );
        }}
      />

      <Modal
        open={isConfirming}
        onClose={closeConfirmation}
        footer={
          <>
            <Button variant="secondary" onClick={closeConfirmation} disabled={isConfirmationUpdating}>
              Cancel
            </Button>
            <Button
              variant={confirmation?.action === 'reject' ? 'danger' : 'primary'}
              onClick={confirmAction}
              disabled={isConfirmationUpdating}
            >
              {isConfirmationUpdating ? 'Updating…' : confirmation?.action === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </>
        }
      >
        <p>{confirmationCopy}</p>
      </Modal>
    </div>
  );
};
