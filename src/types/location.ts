export interface LocationProvider {
  id: number;
  fullName: string;
  providerNumber: string;
  active: boolean;
}

export interface Location {
  id: number;
  name: string;
  minorId: string;
  active: boolean;
  providers: LocationProvider[];
}

export type LocationInput = Omit<Location, 'id' | 'minorId'> &
  Partial<Pick<Location, 'id' | 'minorId'>>;

export type LocationProviderInput = Omit<LocationProvider, 'id'> &
  Partial<Pick<LocationProvider, 'id'>>;
