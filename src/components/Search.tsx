import { useEffect, useState } from 'react';

type SearchProps = {
  placeholder: string;
  className?: string;
};

type Suggestion = {
  cik: string;
  currency: string;
  exchange: string;
  exchangeName: string;
  exchangeSuffix: string;
  figi: string;
  iexId: string;
  lei: string;
  name: string;
  region: string;
  sector: string;
  securityName: string;
  securityType: string;
  symbol: string;
  type: string;
};

function Search({ placeholder, className }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search/${searchTerm}`);
        const data = await response.json();
        console.log({ data });
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (searchTerm !== '') {
      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative w-96">
      {/* <div className={`form-control${className ? ` ${className}` : ''}`}> */}
      <div className={`form-control w-full`}>
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full"
          onChange={handleSearchTermChange}
        />
      </div>
      {suggestions.length > 0 && (
        <ul
          tabIndex={0}
          // className="menu menu-compact dropdown-content bg-base-100 rounded-box w-44 p-2 shadow"
          className="menu bg-base-100 rounded-box absolute top-14 w-96 p-2 shadow"
        >
          {suggestions.map((suggestion) => {
            return (
              <li key={suggestion.symbol}>
                <div className="flex justify-between">
                  <span>{suggestion.symbol}</span>
                  <span>{suggestion.name}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Search;
