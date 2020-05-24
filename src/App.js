import React from "react";
import "./App.css";
import Header from "./shared/header/Header";
import { Grid, Container } from "@material-ui/core";
import MovieList from "./components/movieList/MovieList";
import Search from "./components/search/Search";

class App extends React.Component {
  state = {
    savedMovies: [],
  };

  componentDidMount() {
    const saved = localStorage.getItem("userData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.setState({
          savedMovies: parsed.savedMovies,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  onMovieAdd = (movie) => {
    const movies = this.state.savedMovies;
    movies.push(movie);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        savedMovies: movies,
      })
    );

    this.setState({
      savedMovies: movies,
    });
  };

  updateFavMovies = (newMovies) => {
    this.setState({ savedMovies: newMovies });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        savedMovies: newMovies,
      })
    );
  };

  deleteMovie = (favMovie) => {
    const result = this.state.savedMovies.filter(
      (item) => item.id !== favMovie.id
    );
    this.updateFavMovies(result);
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Container maxWidth="xl">
          <Search onMovieAdd={this.onMovieAdd} />
        </Container>
        <Container maxWidth="lg">
          <MovieList
            savedMovies={this.state.savedMovies}
            deleteMovie={this.deleteMovie}
          />
        </Container>
      </div>
    );
  }
}

export default App;
