import { useMemo, useState, type ReactNode } from 'react';
import type { Practice } from '../types/practice';
import type { Location, LocationProvider } from '../types/location';
import { PracticeContext } from './practice-context';

const initialPractices: Practice[] = [
  {
    id: 'aoa-clinic',
    name: 'AOA Clinic',
    practiceCode: '123455',
    addressLine1: '1234 Main Street',
    city: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    locations: [
      {
        id: 1,
        name: 'AOA Clinic VIC',
        minorId: '1234J',
        active: true,
        providers: [],
      },
      {
        id: 2,
        name: 'AOA Clinic WA',
        minorId: '5678K',
        active: true,
        providers: [],
      },
    ],
  },
  {
    id: 'abc-clinic',
    name: 'ABC Clinic',
    practiceCode: '989898',
    addressLine1: '56 Example Road',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    locations: [],
  },
];

export const PracticeContextProvider = ({ children }: { children: ReactNode }) => {
  const [practices, setPractices] = useState<Practice[]>(initialPractices);

  const getPracticeById = (id: string) => practices.find((practice) => practice.id === id);

  const addLocationToPractice = (practiceId: string, location: Location) => {
    const newLocation: Location = {
      ...location,
      id: location.id ?? Date.now(),
      minorId: location.minorId ?? `MIN${Math.floor(Math.random() * 100000)}`,
    };

    setPractices((prev) =>
      prev.map((practice) =>
        practice.id === practiceId
          ? { ...practice, locations: [...practice.locations, newLocation] }
          : practice,
      ),
    );
  };

  const attachProviderToLocation = (
    practiceId: string,
    locationId: number,
    provider: LocationProvider,
  ) => {
    setPractices((prev) =>
      prev.map((practice) => {
        if (practice.id !== practiceId) {
          return practice;
        }

        return {
          ...practice,
          locations: practice.locations.map((location) =>
            location.id === locationId
              ? { ...location, providers: [...location.providers, provider] }
              : location,
          ),
        };
      }),
    );
  };

  const value = useMemo(
    () => ({
      practices,
      getPracticeById,
      addLocationToPractice,
      attachProviderToLocation,
    }),
    [practices],
  );

  return <PracticeContext.Provider value={value}>{children}</PracticeContext.Provider>;
};
