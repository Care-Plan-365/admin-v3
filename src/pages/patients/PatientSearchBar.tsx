import type { FormEvent } from 'react';
import { Button } from '../../components/ui/Button';

interface PatientSearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

export const PatientSearchBar = ({ query, onQueryChange, onSearch }: PatientSearchBarProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search patients..."
        className="w-full rounded-full border border-cp365-border bg-white px-4 py-2 text-sm text-cp365-textMain shadow-sm placeholder:text-cp365-textMuted focus:border-cp365-primary focus:outline-none focus:ring-2 focus:ring-cp365-primary/20 md:w-72"
      />
      <Button type="submit" size="sm" className="px-5">
        Search
      </Button>
    </form>
  );
};
