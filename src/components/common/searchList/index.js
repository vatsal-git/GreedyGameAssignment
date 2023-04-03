import React, { useEffect, useState } from "react";
import "./index.css";

function SearchList({ list, onListItemClick }) {
  const [searchList, setSearchList] = useState(list);

  const filterList = (searchText) => {
    const newSearchList = list.filter(
      (item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.subtitle.includes(searchText)
    );
    setSearchList(newSearchList);
  };

  useEffect(() => {
    setSearchList(list);
  }, [list]);

  return (
    <div className="search-list-wrapper">
      <input
        type="text"
        placeholder="Search"
        className="search-list-input"
        onInput={(e) => filterList(e.target.value)}
      />
      <div className="search-list">
        {searchList.map((item, i) => {
          return (
            <div
              key={i}
              className={`search-list-item ${
                item.selected ? "search-list-item-selected" : ""
              }`}
              onClick={() => onListItemClick(item)}
            >
              <span className="search-list-item-title">{item.title}</span>
              <span className="search-list-item-subtitle">{item.subtitle}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchList;
