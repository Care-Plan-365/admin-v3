import { useMemo, useState, type ReactNode } from 'react';
import type { Provider } from '../types/provider';
import { ProviderContext } from './provider-context';

const initialProviders: Provider[] = [
  {
    id: '1',
    firstName: 'Amelia',
    lastName: 'Hart',
    ahpraNumber: 'MED123456',
    providerType: 'General Practitioner',
    practice: 'Care Plan Health - North',
    medicareLocationId: '123456A',
    minorId: 'NORTH01',
    status: 'approved',
  },
  {
    id: '2',
    firstName: 'Noah',
    lastName: 'Singh',
    ahpraNumber: 'MED789012',
    providerType: 'Physiotherapist',
    practice: 'Care Plan Health - CBD',
    medicareLocationId: '654321B',
    minorId: 'CBD22',
    status: 'approved',
  },
  {
    id: '3',
    firstName: 'Sienna',
    lastName: 'Cole',
    ahpraNumber: 'MED234567',
    providerType: 'Registered Nurse',
    practice: 'Care Plan Health - West',
    medicareLocationId: '998877C',
    minorId: 'WEST03',
    status: 'approved',
  },
  {
    id: '4',
    firstName: 'Leo',
    lastName: 'Martin',
    ahpraNumber: 'MED345678',
    providerType: 'Psychologist',
    practice: 'Care Plan Health - South',
    status: 'pending',
  },
  {
    id: '5',
    firstName: 'Olivia',
    lastName: 'Nguyen',
    ahpraNumber: 'MED456789',
    providerType: 'Occupational Therapist',
    practice: 'Care Plan Health - North',
    status: 'pending',
  },
  {
    id: '6',
    firstName: 'Ethan',
    lastName: 'Reid',
    ahpraNumber: 'MED567890',
    providerType: 'General Practitioner',
    practice: 'Care Plan Health - East',
    status: 'pending',
  },
  {
    id: '7',
    firstName: 'Zara',
    lastName: 'Lopez',
    ahpraNumber: 'MED678901',
    providerType: 'Dermatologist',
    practice: 'Care Plan Health - South',
    status: 'pending',
  },
  {
    id: '8',
    firstName: 'Miles',
    lastName: 'Patel',
    ahpraNumber: 'MED789013',
    providerType: 'Endocrinologist',
    practice: 'Care Plan Health - CBD',
    status: 'pending',
  },
  {
    id: '9',
    firstName: 'Ivy',
    lastName: 'Chambers',
    ahpraNumber: 'MED890124',
    providerType: 'Psychiatrist',
    practice: 'Care Plan Health - West',
    status: 'pending',
  },
  {
    id: '10',
    firstName: 'Jasper',
    lastName: 'Kaur',
    ahpraNumber: 'MED901235',
    providerType: 'Physiotherapist',
    practice: 'Care Plan Health - North',
    status: 'pending',
  },
  {
    id: '11',
    firstName: 'Luna',
    lastName: 'Fraser',
    ahpraNumber: 'MED012346',
    providerType: 'Registered Nurse',
    practice: 'Care Plan Health - South',
    status: 'pending',
  },
  {
    id: '12',
    firstName: 'Caleb',
    lastName: 'Owens',
    ahpraNumber: 'MED123457',
    providerType: 'Podiatrist',
    practice: 'Care Plan Health - East',
    status: 'pending',
  },
  {
    id: '13',
    firstName: 'Maya',
    lastName: 'Dawson',
    ahpraNumber: 'MED234568',
    providerType: 'Speech Pathologist',
    practice: 'Care Plan Health - CBD',
    status: 'pending',
  },
  {
    id: '14',
    firstName: 'Felix',
    lastName: 'Rahman',
    ahpraNumber: 'MED345679',
    providerType: 'Cardiologist',
    practice: 'Care Plan Health - West',
    status: 'pending',
  },
  {
    id: '15',
    firstName: 'Isla',
    lastName: 'Peters',
    ahpraNumber: 'MED456780',
    providerType: 'Dietitian',
    practice: 'Care Plan Health - North',
    status: 'pending',
  },
  {
    id: '16',
    firstName: 'Roman',
    lastName: 'Becker',
    ahpraNumber: 'MED567891',
    providerType: 'Psychologist',
    practice: 'Care Plan Health - South',
    status: 'pending',
  },
  {
    id: '17',
    firstName: 'Harper',
    lastName: 'Ito',
    ahpraNumber: 'MED678902',
    providerType: 'Midwife',
    practice: 'Care Plan Health - East',
    status: 'pending',
  },
  {
    id: '18',
    firstName: 'Theo',
    lastName: 'Garcia',
    ahpraNumber: 'MED789014',
    providerType: 'Oncologist',
    practice: 'Care Plan Health - CBD',
    status: 'pending',
  },
  {
    id: '19',
    firstName: 'Ari',
    lastName: 'Clarke',
    ahpraNumber: 'MED890125',
    providerType: 'Neurologist',
    practice: 'Care Plan Health - West',
    status: 'pending',
  },
  {
    id: '20',
    firstName: 'Nora',
    lastName: 'Alvarez',
    ahpraNumber: 'MED901236',
    providerType: 'Physician Assistant',
    practice: 'Care Plan Health - North',
    status: 'pending',
  },
  {
    id: '21',
    firstName: 'Damian',
    lastName: 'Cook',
    ahpraNumber: 'MED012347',
    providerType: 'Chiropractor',
    practice: 'Care Plan Health - South',
    status: 'pending',
  },
  {
    id: '22',
    firstName: 'Lola',
    lastName: 'Grayson',
    ahpraNumber: 'MED123458',
    providerType: 'Occupational Therapist',
    practice: 'Care Plan Health - East',
    status: 'pending',
  },
  {
    id: '23',
    firstName: 'Silas',
    lastName: 'Mercer',
    ahpraNumber: 'MED234569',
    providerType: 'General Practitioner',
    practice: 'Care Plan Health - CBD',
    status: 'pending',
  },
  {
    id: '24',
    firstName: 'Elena',
    lastName: 'Ford',
    ahpraNumber: 'MED345680',
    providerType: 'Physiotherapist',
    practice: 'Care Plan Health - West',
    status: 'pending',
  },
  {
    id: '25',
    firstName: 'Wyatt',
    lastName: 'Sato',
    ahpraNumber: 'MED456781',
    providerType: 'Registered Nurse',
    practice: 'Care Plan Health - North',
    status: 'pending',
  },
];

export const ProviderProvider = ({ children }: { children: ReactNode }) => {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);

  const approveProvider = (id: string) => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === id ? { ...provider, status: 'approved' } : provider,
      ),
    );
  };

  const rejectProvider = (id: string) => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === id ? { ...provider, status: 'rejected' } : provider,
      ),
    );
  };

  const value = useMemo(
    () => ({
      providers,
      approveProvider,
      rejectProvider,
    }),
    [providers],
  );

  return <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>;
};

