import { useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { usePatientContext } from '../../hooks/usePatientContext';
import { PatientSearchBar } from './PatientSearchBar';
import { PatientsTable } from './PatientsTable';
import { filterPatients } from './utils';

export const NewPatientsTab = () => {
  const { patients, approvePatient, rejectPatient, isLoading } = usePatientContext();
  const newPatients = useMemo(
    () => patients.filter((patient) => patient.status === 'new'),
    [patients],
  );

  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(
    () => filterPatients(newPatients, searchTerm),
    [newPatients, searchTerm],
  );

  const handleSearch = () => {
    setSearchTerm(query.trim());
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
            New
          </p>
          <h2 className="text-xl font-semibold text-cp365-textMain">Awaiting approval</h2>
        </div>
        <PatientSearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />
      </div>

      {isLoading && !patients.length ? (
        <div className="rounded-2xl border border-dashed border-cp365-border bg-cp365-bg/40 px-6 py-12 text-center text-sm text-cp365-textMuted">
          Loading patients…
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-cp365-border bg-cp365-bg/40 px-6 py-12 text-center text-sm text-cp365-textMuted">
          No new patients awaiting approval.
        </div>
      ) : (
        <PatientsTable
          patients={filteredPatients}
          renderActions={(patient) => (
            <>
              <Button size="sm" onClick={() => approvePatient(patient.id)}>
                Approve
              </Button>
              <Button size="sm" variant="danger" onClick={() => rejectPatient(patient.id)}>
                Reject
              </Button>
            </>
          )}
        />
      )}
    </div>
  );
};
