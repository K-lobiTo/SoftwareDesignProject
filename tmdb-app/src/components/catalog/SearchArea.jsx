import React from 'react';

const SearchArea = (props) => {
  return (
    <div>
      <form action="" onSubmit={props.handleSubmit}>
        <div className="input-field">
          <input
            placeholder="search"
            type="text"
            onChange={props.handleChange}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default SearchArea;
