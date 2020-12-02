import React, { useState } from 'react';

const Search = () => {
  const [searchText, setSearchText] = useState('');

  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      setSearchText('');
    }
  };

  return (
    <div>
      <input
        id="search-bar"
        type="text"
        placeholder="Search by title"
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleEnter}
        value={searchText}
      />
    </div>
  );
};

export default Search;
