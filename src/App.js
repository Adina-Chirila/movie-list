import React from "react";
import "./App.css";
import Header from "./shared/header/Header";
import { Container, TextField, Button } from "@material-ui/core";
import MovieList from "./components/movieList/MovieList";
import Search from "./components/search/Search";
import LoginForm from "./components/movieList/LoginForm";
import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

class App extends React.Component {
  state = {
    savedMovies: [],
    favoriteVisible: true,
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

  handleAddUser = (event) => {
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        userName: this.state.userName,
      })
    );

    this.setState({
      user: {
        userName: this.state.userName,
      },
      userName: null,
    });
  };

  onUserChange = (event) => {
    const { value } = event.target;
    this.setState({
      userName: value,
    });
  };

  logout = () => {
    this.setState({ user: null });
    localStorage.removeItem("userDetails");
  };

  closeFavorite = () => {
    this.setState({ favoriteVisible: !this.state.favoriteVisible });
  };

  ratingHandler = (userRating, movie) => {
    const savedMoviesWithRating = this.state.savedMovies.map(
      (movie, userRating) => ({
        ...movie,
        rating: 0,
      })
    );
    console.log(savedMoviesWithRating);
    // this.setState(
    //   { savedMovies: savedMoviesWithRating },
    //   console.log(this.state.savedMovies)
    // );
    // const result = this.state.savedMovies.filter(
    //   (item) => item.id !== favMovie.id
    // );
    // this.updateFavMovies(result);
    // this.setState({ rating: userRating }, () => console.log(this.state.rating));
  };

  render() {
    const { savedMovies, user } = this.state;
    return (
      <div className="App">
        <Header
          user={user}
          onLogout={this.logout}
          closeFavorite={this.closeFavorite}
        />
        {user ? (
          <React.Fragment>
            <Container maxWidth="xl">
              <Search onMovieAdd={this.onMovieAdd} />
            </Container>
            <Container maxWidth="md">
              {this.state.favoriteVisible ? (
                <MovieList
                  savedMovies={savedMovies}
                  deleteMovie={this.deleteMovie}
                  closeFavorite={this.closeFavorite}
                  ratingHandler={this.ratingHandler}
                />
              ) : null}
            </Container>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Container maxWidth="xl">
              <LoginForm
                onInputChange={this.onUserChange}
                onSubmit={this.handleAddUser}
              />
              {/* <h2>Hello stranger!</h2>
              <h4>What is your name?</h4>
              <FormControl>
                <InputLabel htmlFor="input-with-icon-adornment">
                  Please enter your name
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  onChange={this.onUserChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button variant="contained" onClick={this.handleAddUser}>
                Save
              </Button> */}
              {/* <TextField label="Name" onChange={this.onUserChange} />
              <Button variant="contained" onClick={this.handleAddUser}>
                Save
              </Button> */}
            </Container>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
