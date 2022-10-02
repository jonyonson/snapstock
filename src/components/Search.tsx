import { useState } from 'react';
import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import '@reach/combobox/styles.css';

type SearchProps = {
  placeholder: string;
  className?: string;
};

function Search({ placeholder }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const { data: suggestions } = trpc.useQuery(
    ['search.suggestions', { term: searchTerm }],
    { enabled: !!searchTerm },
  );

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (item: string) => {
    const symbol = item.split(',')[0] as string;
    setSearchTerm('');
    router.push(`/quotes/${symbol.toUpperCase()}`);
  };

  return (
    <Combobox
      openOnFocus
      aria-label="Search"
      className="w-96"
      onSelect={handleSelect}
    >
      <ComboboxInput
        onChange={handleSearchTermChange}
        placeholder={placeholder}
        value={searchTerm}
        className="input input-bordered w-full"
        selectOnClick
      />
      {searchTerm.length > 0 && suggestions && (
        <ComboboxPopover>
          {suggestions.length ? (
            <ComboboxList className="menu">
              {suggestions.map((quote) => {
                const value = `${quote.symbol}, ${quote.name}`;
                return (
                  <ComboboxOption
                    key={value}
                    value={value}
                    data-testid="combobox-option"
                  >
                    <div className="flex">
                      <div>{quote.name}</div>
                      <div>{quote.symbol}</div>
                    </div>
                  </ComboboxOption>
                );
              })}
            </ComboboxList>
          ) : null}
        </ComboboxPopover>
      )}
    </Combobox>
  );
}

export default Search;
