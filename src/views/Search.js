import React, { Component } from 'react';

import Dropdown from '../library/Forms/Dropdown';

import { list } from '../utils/enums/list';

class Search extends Component {
  state = {};

  render() {
    return (
      <div className="search">
        <Dropdown
          id="search"
          name="searchValue"
          placeholder="Search"
          listOfOptions={list}
        />
      </div>
    );
  }
}

export default Search;
