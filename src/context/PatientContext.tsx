import { useMemo, useState, type ReactNode } from 'react';
import type { Patient } from '../types/patient';
import { PatientContext } from './patient-context';

const initialPatients: Patient[] = [
  {
    id: '1',
    firstName: 'Ola',
    lastName: 'Adaji',
    suburb: 'Berwick, VIC',
    providerName: 'Dr. John Smith',
    status: 'new',
  },
  {
    id: '2',
    firstName: 'Ava',
    lastName: 'Doe',
    suburb: 'Melbourne, VIC',
    providerName: 'Dr. Jane Jones',
    status: 'current',
  },
  {
    id: '3',
    firstName: 'Lucas',
    lastName: 'Ng',
    suburb: 'Geelong, VIC',
    providerName: 'Dr. Priya Kumar',
    status: 'current',
  },
  {
    id: '4',
    firstName: 'Maya',
    lastName: 'Singh',
    suburb: 'Richmond, VIC',
    providerName: 'Dr. Peter Williams',
    status: 'rejected',
  },
  {
    id: '5',
    firstName: 'Noah',
    lastName: 'Taylor',
    suburb: 'Carlton, VIC',
    providerName: 'Dr. Zoe Adams',
    status: 'new',
  },
];

export const PatientContextProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  const approvePatient = (id: string) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === id && patient.status === 'new'
          ? { ...patient, status: 'current' }
          : patient,
      ),
    );
  };

  const rejectPatient = (id: string) => {
    setPatients((prev) =>
      prev.map((patient) => (patient.id === id ? { ...patient, status: 'rejected' } : patient)),
    );
  };

  const value = useMemo(
    () => ({
      patients,
      approvePatient,
      rejectPatient,
    }),
    [patients],
  );

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
};
