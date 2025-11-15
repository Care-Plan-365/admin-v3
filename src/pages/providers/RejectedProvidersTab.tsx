import { Table } from '../../components/ui/Table';
import { useProviderContext } from '../../hooks/useProviderContext';

export const RejectedProvidersTab = () => {
  const { providers } = useProviderContext();
  const rejectedProviders = providers.filter((provider) => provider.status === 'rejected');

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

      <Table>
        <thead className="bg-cp365-bg text-left text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
          <tr>
            <th className="px-6 py-4">First Name</th>
            <th className="px-6 py-4">Last Name</th>
            <th className="px-6 py-4">AHPRA Number</th>
            <th className="px-6 py-4">Provider Type</th>
            <th className="px-6 py-4">Practice</th>
          </tr>
        </thead>
        <tbody>
          {rejectedProviders.map((provider) => (
            <tr
              key={provider.id}
              className="border-t border-cp365-border/80 text-sm text-cp365-textMain hover:bg-slate-50 transition"
            >
              <td className="px-6 py-4 font-semibold">{provider.firstName}</td>
              <td className="px-6 py-4">{provider.lastName}</td>
              <td className="px-6 py-4">{provider.ahpraNumber ?? '—'}</td>
              <td className="px-6 py-4">{provider.providerType}</td>
              <td className="px-6 py-4">{provider.practice ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
