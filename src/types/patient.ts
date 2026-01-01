// Backend status values have shifted to approved/pending/rejected, but keep the
// legacy UI statuses for compatibility with existing code paths.
export type PatientStatus =
  | 'current'
  | 'new'
  | 'rejected'
  | 'approved'
  | 'pending';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  suburb: string;
  providerName: string;
  status: PatientStatus;
}
