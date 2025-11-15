import type { Location } from './location';

export interface Practice {
  id: string;
  name: string;
  practiceCode: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postcode: string;
  locations: Location[];
}
