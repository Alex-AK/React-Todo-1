import React from 'react';

const SearchComponent = props => {
  return (
    <input
      className="search-bar"
      type="text"
      name="searchText"
      placeholder="Search Tasks"
      onChange={props.handleSearch}
    />
  );
};

export default SearchComponent;
