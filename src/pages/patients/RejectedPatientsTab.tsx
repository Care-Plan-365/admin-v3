import { useMemo, useState } from 'react';
import { usePatientContext } from '../../hooks/usePatientContext';
import { PatientSearchBar } from './PatientSearchBar';
import { PatientsTable } from './PatientsTable';
import { filterPatients } from './utils';

export const RejectedPatientsTab = () => {
  const { patients } = usePatientContext();
  const rejectedPatients = useMemo(
    () => patients.filter((patient) => patient.status === 'rejected'),
    [patients],
  );

  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(
    () => filterPatients(rejectedPatients, searchTerm),
    [rejectedPatients, searchTerm],
  );

  const handleSearch = () => {
    setSearchTerm(query.trim());
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cp365-textMuted">
            Rejected
          </p>
          <h2 className="text-xl font-semibold text-cp365-textMain">Applications declined</h2>
        </div>
        <PatientSearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />
      </div>

      {filteredPatients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-cp365-border bg-cp365-bg/40 px-6 py-12 text-center text-sm text-cp365-textMuted">
          No rejected patients.
        </div>
      ) : (
        <PatientsTable patients={filteredPatients} />
      )}
    </div>
  );
};
