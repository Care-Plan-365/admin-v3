import { useContext } from 'react';
import { PatientContext } from '../context/patient-context';

export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatientContext must be used within a PatientContextProvider');
  }
  return context;
};
