import React from "react";
import "./App.css";
import Header from "./shared/header/Header";
import { Container } from "@material-ui/core";
import MovieList from "./components/movieList/MovieList";
import Search from "./components/search/Search";
import LoginForm from "./components/movieList/LoginForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  state = {
    savedMovies: [],
    favoriteVisible: true,
    user: null,
    userName: "",
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
    this.setState({ favoriteVisible: true });
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
    this.setState({ favoriteVisible: true });
    if (this.state.userName === "" || this.state.userName === null) {
      alert("Name is required.");
      return;
    }

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

  changeRating = (rating, movieId) => {
    const foundIndex = this.state.savedMovies.findIndex(
      (item) => item.id === movieId
    );
    const { savedMovies } = this.state;
    const movie = savedMovies[foundIndex];
    savedMovies[foundIndex] = Object.assign({}, movie, { userRating: rating });
    this.setState({
      savedMovies: savedMovies,
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({ savedMovies: savedMovies })
    );
    // console.log(this.state.savedMovies[foundIndex]);
    // console.log(Object.assign({}, movieId, { userRating: rating }));
    // console.log(rating);
    // console.log(movieId);
  };

  render() {
    const { savedMovies, user } = this.state;
    return (
      <Router>
        <div className="App">
          <Header
            user={user}
            onLogout={this.logout}
            closeFavorite={this.closeFavorite}
          />
          {user ? (
            <Switch>
              <React.Fragment>
                <Route path="/" exact>
                  <Container maxWidth="lg">
                    <Search onMovieAdd={this.onMovieAdd} />
                  </Container>
                </Route>
                <Route path="/favorites">
                  <Container maxWidth="md">
                    {this.state.favoriteVisible ? (
                      <MovieList
                        savedMovies={savedMovies}
                        deleteMovie={this.deleteMovie}
                        closeFavorite={this.closeFavorite}
                        changeRating={this.changeRating}
                      />
                    ) : null}
                  </Container>
                </Route>
              </React.Fragment>
            </Switch>
          ) : (
            <React.Fragment>
              <Container maxWidth="xl">
                <LoginForm
                  onInputChange={this.onUserChange}
                  onSubmit={this.handleAddUser}
                />
              </Container>
            </React.Fragment>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
