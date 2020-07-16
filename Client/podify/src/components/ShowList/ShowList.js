import React from "react";
 
import "./ShowList.css";
 
import Show from "../Show/Show";
 
class ShowList extends React.Component {
  render() {
    return (
      <div className="ShowList">
        {this.props.shows.map(show => {
          return (
            <Show
              show={show}
            />
          );
        })}
      </div>
    );
  }
}
 
export default ShowList;