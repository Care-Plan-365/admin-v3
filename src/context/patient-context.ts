import { createContext } from 'react';
import type { Patient } from '../types/patient';

export interface PatientContextValue {
  patients: Patient[];
  approvePatient: (id: string) => void;
  rejectPatient: (id: string) => void;
}

export const PatientContext = createContext<PatientContextValue | undefined>(undefined);
