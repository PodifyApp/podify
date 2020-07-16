import React from "react";
 
import "./SearchResults.css";
 
import ShowList from "../ShowList/ShowList";
 
class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <ShowList shows={this.props.searchResults} />
      </div>
    );
  }
}
 
export default SearchResults;