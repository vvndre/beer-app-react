import React from "react";
import axios from "axios";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
    };
  }
  componentDidMount() {
    axios.get("https://api.punkapi.com/v2/beers").then(({ data }) => {
      this.setState({ beers: [] });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.beers.map((beer, index) => {
          return <Beer key={beer.id} beer={beer}></Beer>;
        })}
      </div>
    );
  }
}

class Beer extends React.Component {
  render() {
    return <div>{/* this.prop.beer */}</div>;
  }
}
