import { createContext } from 'react';
import type { Practice } from '../types/practice';
import type { LocationInput, LocationProviderInput } from '../types/location';

export interface PracticeContextValue {
  practices: Practice[];
  getPracticeById: (id: string) => Practice | undefined;
  addLocationToPractice: (practiceId: string, location: LocationInput) => void;
  attachProviderToLocation: (
    practiceId: string,
    locationId: number,
    provider: LocationProviderInput,
  ) => void;
}

export const PracticeContext = createContext<PracticeContextValue | undefined>(undefined);
