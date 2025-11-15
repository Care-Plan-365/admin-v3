import type { Patient } from '../../types/patient';

export const filterPatients = (patients: Patient[], term: string) => {
  const normalized = term.trim().toLowerCase();
  if (!normalized) {
    return patients;
  }

  return patients.filter((patient) => {
    const fields = [
      patient.firstName,
      patient.lastName,
      patient.suburb,
      patient.providerName,
    ];

    return fields.some((field) => field.toLowerCase().includes(normalized));
  });
};
