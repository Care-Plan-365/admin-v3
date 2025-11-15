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
