import React from "react";
import "./App.css";
import Header from "./shared/header/Header";
import { Container } from "@material-ui/core";
import MovieList from "./components/movieList/MovieList";
import Search from "./components/search/Search";
import LoginForm from "./components/movieList/LoginForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    savedMovies: [],
    // favoriteVisible: true,
    user: null,
    userName: "",
    loginError: false,
  };

  componentDidMount() {
    const savedMovies = localStorage.getItem("userData");
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedUser = JSON.parse(userDetails);
      this.setState({
        user: parsedUser,
      });
    } else {
      // handle redirect to login?
    }

    if (savedMovies) {
      try {
        const parsed = JSON.parse(savedMovies);
        this.setState({
          savedMovies: parsed.savedMovies,
        });
      } catch (error) {
        console.log("App crashed check user input...");
      }
    }
  }

  onMovieAdd = (movie) => {
    // this.setState({ favoriteVisible: true });
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
    if (!this.state.userName) {
      this.setState({ loginError: true });
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

  closeLoginErrorAlert = () => {
    this.setState({ loginError: false });
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
  };

  render() {
    const { savedMovies, user } = this.state;
    return (
      <Router>
        <div className="App">
          <Header
            user={user}
            onLogout={this.logout}
            // closeFavorite={this.closeFavorite}
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
                    {/* {this.state.favoriteVisible ? (
                      <MovieList
                        savedMovies={savedMovies}
                        deleteMovie={this.deleteMovie}
                        closeFavorite={this.closeFavorite}
                        changeRating={this.changeRating}
                      />
                    ) : null} */}

                    <MovieList
                      savedMovies={savedMovies}
                      deleteMovie={this.deleteMovie}
                      // closeFavorite={this.closeFavorite}
                      changeRating={this.changeRating}
                    />
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
                  loginError={this.state.loginError}
                  closeLoginErrorAlert={this.closeLoginErrorAlert}
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
