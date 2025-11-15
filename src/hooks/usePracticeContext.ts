import { useContext } from 'react';
import { PracticeContext } from '../context/practice-context';

export const usePracticeContext = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error('usePracticeContext must be used within a PracticeContextProvider');
  }
  return context;
};
