import React from "react";
import "./App.css";
 
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";
 
class App extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      searchResults: [],
    };
 
    this.search = this.search.bind(this);
  }
 
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }
 
  render() {
    return (
      <div>
        <h1>
          <a href="http://localhost:3000">Podify</a>
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
            />
          </div>
        </div>
      </div>
    );
  }
}
 
export default App;