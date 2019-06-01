// @flow
import React, { Component } from 'react';

import './style.scss';

type Props = {
  id: String,
  listOfOptions: Array,
  name: String,
  placeholder: String,
};

type State = {
  isDropdownOpen: Boolean,
  searchValue: String,
  isNotEmpty: Boolean,
  selectedIndex: Number,
  dropdownButton: String,
  selectionMade: Boolean,
  amountOfScroll: Number,
};

class Dropdown extends Component<Props, State> {
  state = {
    isDropdownOpen: false,
    searchValue: '',
    isNotEmpty: false,
    selectedIndex: 0,
    dropdownButton: '',
    selectionMade: false,
    amountOfScroll: 0,
  };

  handleOnFocusBlur = (bool, delay) => {
    setTimeout(() => {
      const { searchValue } = this.state;
      this.setState({
        isDropdownOpen: bool,
        isNotEmpty: searchValue !== '',
      });
    }, delay);
  }

  handleChange = (e) => {
    const { selectedIndex } = this.state;
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      selectionMade: false,
      dropdownButton: `${name}-dropdown-${selectedIndex}`,
      selectedIndex: 0,
    });
  };

  handleKeyDown = (e) => {
    const { key } = e;
    const { name } = this.props;
    const { selectedIndex } = this.state;
    const dropdown = document.getElementById(`${name}-dropdown`);
    const singleTabHeight = document.getElementById(`${name}-0`).offsetHeight;

    if (key === 'ArrowUp' && selectedIndex > 0) {
      this.setState({
        selectedIndex: selectedIndex - 1,
      }, () => {
        const { selectedIndex, amountOfScroll } = this.state; // eslint-disable-line
        this.setState({
          dropdownButton: `${name}-dropdown-${selectedIndex}`,
          amountOfScroll: selectedIndex > 4
            ? singleTabHeight * (selectedIndex - 4)
            : 0,
        });
      });
    }

    if (key === 'ArrowDown' && selectedIndex < (dropdown.children.length - 1)) {
      this.setState({
        selectedIndex: selectedIndex + 1,
      }, () => {
        const { selectedIndex, amountOfScroll } = this.state; // eslint-disable-line
        this.setState({
          dropdownButton: `${name}-dropdown-${selectedIndex}`,
          amountOfScroll: selectedIndex > 4
            ? singleTabHeight * (selectedIndex - 4)
            : 0,
        });
      });
    }

    if (key === 'Enter') {
      const { value } = document.querySelector(`#${name}-${selectedIndex}`);
      this.setState({
        [name]: value,
        selectionMade: true,
        selectedIndex: 0,
      });
    }
  }

  selectDropdown = (e) => {
    e.persist();
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  componentDidUpdate = () => {
    const { name } = this.props;
    const {
      amountOfScroll,
      isDropdownOpen,
      searchValue,
      selectionMade,
    } = this.state;
    const dropdown = document.getElementById(`${name}-dropdown`);

    if (isDropdownOpen && !selectionMade && searchValue !== '') {
      dropdown.scrollTop = amountOfScroll;
    }
  }

  render() {
    const {
      id,
      name,
      placeholder,
      listOfOptions,
    } = this.props;

    const {
      searchValue,
      isDropdownOpen,
      isNotEmpty,
      dropdownButton,
      selectionMade,
    } = this.state;

    return (
      <div className="field-wrapper">
        <div className="input-mask animated">
          <input
            autoComplete="off"
            id={id}
            name={name}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            type="text"
            value={searchValue}
            onBlur={() => this.handleOnFocusBlur(false, 140)}
            onFocus={() => this.handleOnFocusBlur(true, 0)}
          />
          {(isDropdownOpen && !selectionMade && searchValue !== '')
            && (
              <ul id={`${name}-dropdown`} className="list-searchable">
                {(listOfOptions !== undefined) && listOfOptions
                  .filter(option => (
                    option.toLowerCase()
                      .includes(
                        searchValue.toLowerCase(),
                      )
                  ))
                  .map((option, index) => {
                    const richOption = option
                      .toLowerCase()
                      .replace(searchValue.toLowerCase(), `<strong>${searchValue.toLowerCase()}</strong>`);

                    const finalValue = richOption.charAt(0).toUpperCase() + richOption.slice(1);
                    return (
                      <button
                        key={option}
                        id={`${name}-${index}`}
                        type="button"
                        name={name}
                        className={
                          dropdownButton === `${name}-dropdown-${index}`
                            ? 'selected-button'
                            : ''
                        }
                        onClick={e => this.selectDropdown(e)}
                        value={option}
                        dangerouslySetInnerHTML={{ __html: finalValue }} // eslint-disable-line
                      />
                    );
                  })
                }
              </ul>
            )
          }
        </div>
        {placeholder !== undefined
          && (
            <span className={
              (isDropdownOpen || isNotEmpty)
                ? 'active'
                : ''
              }
            >
              {placeholder}
            </span>
          )
        }
      </div>
    );
  }
}

export default Dropdown;
