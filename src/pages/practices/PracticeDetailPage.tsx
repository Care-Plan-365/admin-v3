import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { usePracticeContext } from '../../hooks/usePracticeContext';
import { useProviderContext } from '../../hooks/useProviderContext';
import type { Provider } from '../../types/provider';
import type { Location } from '../../types/location';

export const PracticeDetailPage = () => {
  const navigate = useNavigate();
  const { practiceId } = useParams<{ practiceId: string }>();
  const { getPracticeById, addLocationToPractice, attachProviderToLocation } = usePracticeContext();
  const { providers } = useProviderContext();
  const practice = practiceId ? getPracticeById(practiceId) : undefined;

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [locationToViewProviders, setLocationToViewProviders] = useState<Location | null>(null);
  const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
  const [addProviderStep, setAddProviderStep] = useState<'select' | 'confirm'>('select');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [providerNumber, setProviderNumber] = useState('');

  const availableProviders = useMemo(() => providers, [providers]);

  if (!practice) {
    return (
      <section className="space-y-6">
        <Button variant="ghost" size="sm" type="button" onClick={() => navigate('/practices')}>
          ← Back to Practices
        </Button>
        <Card className="rounded-3xl bg-white p-6 text-center text-cp365-textMain">
          <p className="text-lg font-semibold">Practice not found</p>
          <p className="mt-2 text-sm text-cp365-textMuted">
            The requested practice is unavailable. Please return to the Practice list.
          </p>
        </Card>
      </section>
    );
  }

  const handleCreateLocation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newLocationName.trim()) {
      return;
    }

    addLocationToPractice(practice.id, {
      id: Date.now(),
      name: newLocationName.trim(),
      minorId: `MIN${Math.floor(Math.random() * 100000)}`,
      active: true,
      providers: [],
    });

    setNewLocationName('');
    setIsLocationModalOpen(false);
  };

  const closeViewProvidersModal = () => setLocationToViewProviders(null);

  const openAddProviderModal = (location: Location) => {
    setSelectedLocation(location);
    setAddProviderStep('select');
    setSelectedProvider(null);
    setProviderNumber('');
    setIsAddProviderModalOpen(true);
  };

  const closeAddProviderModal = () => {
    setIsAddProviderModalOpen(false);
    setSelectedLocation(null);
    setSelectedProvider(null);
    setProviderNumber('');
    setAddProviderStep('select');
  };

  const handleSelectProvider = (provider: Provider) => {
    setSelectedProvider(provider);
    setProviderNumber(provider.medicareLocationId ?? '');
    setAddProviderStep('confirm');
  };

  const handleConfirmAddProvider = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!practice || !selectedLocation || !selectedProvider || !providerNumber.trim()) {
      return;
    }

    attachProviderToLocation(practice.id, selectedLocation.id, {
      id: Date.now(),
      fullName: `${selectedProvider.firstName} ${selectedProvider.lastName}`,
      providerNumber: providerNumber.trim(),
      active: true,
    });

    closeAddProviderModal();
  };

  const splitName = (fullName: string) => {
    const [first, ...rest] = fullName.split(' ');
    return {
      firstName: first ?? '',
      lastName: rest.join(' '),
    };
  };

  return (
    <section className="space-y-6">
      <Button variant="ghost" size="sm" type="button" onClick={() => navigate('/practices')}>
        ← Back to Practices
      </Button>

      <Card className="rounded-3xl bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
              Practice Overview
            </p>
            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <h1 className="text-3xl font-semibold text-cp365-textMain">{practice.name}</h1>
              <span className="rounded-full bg-cp365-warningSoft px-3 py-1 text-xs font-semibold text-cp365-primary">
                Code {practice.practiceCode}
              </span>
            </div>
            <div className="mt-4 text-sm text-cp365-textMain leading-6">
              <p>{practice.addressLine1}</p>
              {practice.addressLine2 && <p>{practice.addressLine2}</p>}
              <p>
                {practice.city}, {practice.state} {practice.postcode}
              </p>
            </div>
          </div>
          <Button type="button" onClick={() => setIsLocationModalOpen(true)}>
            New Location
          </Button>
        </div>
      </Card>

      <Card className="rounded-3xl bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cp365-textMuted">
              Medicare Locations
            </p>
            <p className="text-sm text-cp365-textMuted">
              Manage linked locations and provider assignments.
            </p>
          </div>
          <span className="text-sm text-cp365-textMuted">
            {practice.locations.length} location{practice.locations.length === 1 ? '' : 's'}
          </span>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-cp365-border">
          <table className="w-full border-collapse text-left text-sm text-cp365-textMain">
            <thead className="bg-cp365-surface text-xs uppercase tracking-wide text-cp365-textMuted">
              <tr>
                <th className="px-6 py-3 font-semibold">Location Name</th>
                <th className="px-6 py-3 font-semibold">Minor ID</th>
                <th className="px-6 py-3 font-semibold text-right">Providers</th>
              </tr>
            </thead>
            <tbody>
              {practice.locations.length === 0 && (
                <tr>
                  <td className="px-6 py-6 text-sm text-cp365-textMuted" colSpan={3}>
                    No locations yet. Create a new Medicare location to get started.
                  </td>
                </tr>
              )}
              {practice.locations.map((location) => (
                <tr
                  key={location.id}
                  className="border-t border-cp365-border/70 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold text-cp365-textMain">{location.name}</td>
                  <td className="px-6 py-4 font-mono text-sm text-cp365-textMain">
                    {location.minorId}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setLocationToViewProviders(location)}
                      >
                        View
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        className="px-3"
                        onClick={() => openAddProviderModal(location)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        title="New Location"
        description="Create a new Medicare location for this practice."
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => setIsLocationModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="new-location-form"
              disabled={!newLocationName.trim()}
            >
              Create Location
            </Button>
          </>
        }
      >
        <form id="new-location-form" className="space-y-4" onSubmit={handleCreateLocation}>
          <div className="space-y-1">
            <label
              htmlFor="locationName"
              className="text-sm font-semibold text-cp365-textMain"
            >
              Location Name
            </label>
            <input
              id="locationName"
              name="locationName"
              type="text"
              required
              value={newLocationName}
              onChange={(event) => setNewLocationName(event.target.value)}
              className="w-full rounded-2xl border border-cp365-border px-4 py-2.5 text-sm text-cp365-textMain focus:outline-none focus:ring-2 focus:ring-cp365-primary/40"
              placeholder="e.g. AOA Clinic NSW"
            />
          </div>
        </form>
      </Modal>

      <Modal
        open={Boolean(locationToViewProviders)}
        onClose={closeViewProvidersModal}
        title={
          locationToViewProviders ? `Providers – ${locationToViewProviders.name}` : 'Providers'
        }
        footer={
          <Button type="button" variant="secondary" onClick={closeViewProvidersModal}>
            Close
          </Button>
        }
      >
        {locationToViewProviders && locationToViewProviders.providers.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-cp365-border">
            <table className="w-full border-collapse text-left text-sm text-cp365-textMain">
              <thead className="bg-cp365-surface text-xs uppercase tracking-wide text-cp365-textMuted">
                <tr>
                  <th className="px-4 py-2 font-semibold">First Name</th>
                  <th className="px-4 py-2 font-semibold">Last Name</th>
                  <th className="px-4 py-2 font-semibold">Provider Number</th>
                </tr>
              </thead>
              <tbody>
                {locationToViewProviders.providers.map((provider) => {
                  const { firstName, lastName } = splitName(provider.fullName);
                  return (
                    <tr key={provider.id} className="border-t border-cp365-border/70">
                      <td className="px-4 py-2">{firstName}</td>
                      <td className="px-4 py-2">{lastName}</td>
                      <td className="px-4 py-2 font-mono text-sm">{provider.providerNumber}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-cp365-textMuted">
            No providers linked to this location yet.
          </p>
        )}
      </Modal>

      <Modal
        open={isAddProviderModalOpen}
        onClose={closeAddProviderModal}
        title={
          addProviderStep === 'confirm' && selectedProvider
            ? `${selectedProvider.firstName} ${selectedProvider.lastName}`
            : 'Select Provider'
        }
        description={
          selectedLocation
            ? `Assign to ${selectedLocation.name}`
            : 'Choose a provider to assign to this location.'
        }
        footer={
          addProviderStep === 'confirm' ? (
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setAddProviderStep('select');
                  setSelectedProvider(null);
                  setProviderNumber('');
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                form="confirm-provider-form"
                disabled={!providerNumber.trim()}
              >
                Add
              </Button>
            </>
          ) : (
            <Button type="button" variant="secondary" onClick={closeAddProviderModal}>
              Cancel
            </Button>
          )
        }
      >
        {addProviderStep === 'select' && (
          <div className="overflow-hidden rounded-2xl border border-cp365-border">
            <table className="w-full border-collapse text-left text-sm text-cp365-textMain">
              <thead className="bg-cp365-surface text-xs uppercase tracking-wide text-cp365-textMuted">
                <tr>
                  <th className="px-4 py-2 font-semibold">Provider Name</th>
                  <th className="px-4 py-2 font-semibold">Provider Type</th>
                  <th className="px-4 py-2 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {availableProviders.length === 0 && (
                  <tr>
                    <td className="px-4 py-4 text-sm text-cp365-textMuted" colSpan={3}>
                      No providers available to assign.
                    </td>
                  </tr>
                )}
                {availableProviders.map((provider) => (
                  <tr key={provider.id} className="border-t border-cp365-border/70">
                    <td className="px-4 py-3 font-semibold">
                      {provider.firstName} {provider.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-cp365-textMuted">
                      {provider.providerType}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleSelectProvider(provider)}
                      >
                        +
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {addProviderStep === 'confirm' && selectedProvider && (
          <form
            id="confirm-provider-form"
            className="space-y-4"
            onSubmit={handleConfirmAddProvider}
          >
            <div className="rounded-2xl bg-cp365-surface px-4 py-3 text-sm text-cp365-textMain">
              <p className="font-semibold">
                {selectedProvider.firstName} {selectedProvider.lastName}
              </p>
              <p className="text-xs text-cp365-textMuted">{selectedProvider.providerType}</p>
            </div>
            <div className="space-y-1">
              <label htmlFor="providerNumber" className="text-sm font-semibold text-cp365-textMain">
                Provider Number
              </label>
              <input
                id="providerNumber"
                name="providerNumber"
                type="text"
                required
                value={providerNumber}
                onChange={(event) => setProviderNumber(event.target.value)}
                className="w-full rounded-2xl border border-cp365-border px-4 py-2.5 text-sm text-cp365-textMain focus:outline-none focus:ring-2 focus:ring-cp365-primary/40"
                placeholder="Enter Medicare provider number"
              />
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
};
