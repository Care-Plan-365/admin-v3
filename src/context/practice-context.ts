import { createContext } from 'react';
import type { Practice } from '../types/practice';
import type { Location, LocationProvider } from '../types/location';

export interface PracticeContextValue {
  practices: Practice[];
  getPracticeById: (id: string) => Practice | undefined;
  addLocationToPractice: (practiceId: string, location: Location) => void;
  attachProviderToLocation: (
    practiceId: string,
    locationId: number,
    provider: LocationProvider,
  ) => void;
}

export const PracticeContext = createContext<PracticeContextValue | undefined>(undefined);
