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
      // Add the 'liked' property to each beer object
      const beersWithLiked = data.map((beer) => ({ ...beer, liked: false }));
      this.setState({ beers: beersWithLiked });
    });
  }

  handleLike = (id) => {
    // Find the beer by id in the state and toggle the "liked" property
    this.setState((prevState) => ({
      beers: prevState.beers.map((beer) =>
        beer.id === id ? { ...beer, liked: !beer.liked } : beer
      ),
    }));
  };

  render() {
    return (
      <div className="App">
        {this.state.beers.map((beer, index) => (
          <Beer key={beer.id} {...beer} onLike={() => this.handleLike(beer.id)} />
        ))}
      </div>
    );
  }
}

class Beer extends React.Component {
  render() {
    const { name, tagline, description, liked } = this.props;

    return (
      <div>
        <h2>{name}</h2>
        <h3>{tagline}</h3>
        <p>{description}</p>
        <button onClick={this.props.onLike}>
          {liked ? "Unlike 👎" : "Like 👍"}
        </button>
        <hr />
      </div>
    );
  }
}
