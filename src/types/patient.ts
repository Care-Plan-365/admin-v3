export type PatientStatus = 'pending' | 'approved' | 'rejected';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  suburb: string;
  providerName: string;
  status: PatientStatus;
}
