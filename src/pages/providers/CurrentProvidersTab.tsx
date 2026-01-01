import { useState } from 'react';
import { useProviderContext } from '../../hooks/useProviderContext';
import { ProvidersTable } from './ProvidersTable';

export const CurrentProvidersTab = () => {
  const { providers, isLoading } = useProviderContext();
  const [query, setQuery] = useState('');

  const filteredProviders = providers.filter((provider) => {
    if (!query.trim()) {
      return true;
    }

    const queryNormalized = query.trim().toLowerCase();
    const searchString = [
      provider.firstName,
      provider.lastName,
      (provider as unknown as { phone?: unknown }).phone,
      provider.ahpraNumber,
      provider.providerType,
      (provider as unknown as { location?: unknown }).location,
      provider.practice,
      provider.medicareLocationId,
      provider.minorId,
    ]
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
      .join(' ')
      .toLowerCase();

    return searchString.includes(queryNormalized);
  });

  if (isLoading && !providers.length) {
    return (
      <div className="rounded-2xl border border-dashed border-cp365-border bg-white px-8 py-12 text-center text-sm text-cp365-textMuted">
        Loading providers…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
            Current Providers
          </p>
          <h2 className="text-xl font-semibold text-cp365-textMain">Active roster</h2>
        </div>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search providers…"
          className="w-full rounded-2xl border border-cp365-border bg-white px-4 py-2 text-sm text-cp365-textMain focus:outline-none focus:ring-2 focus:ring-cp365-primary md:w-64"
        />
      </div>

      <ProvidersTable providers={filteredProviders} includePractice includeMedicareMinor />
    </div>
  );
};
