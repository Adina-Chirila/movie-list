import React from "react";
import "./App.css";
import Header from "./shared/header/Header";
import { Container } from "@material-ui/core";
import MovieList from "./components/movieList/MovieList";
import Search from "./components/search/Search";
import LoginForm from "./components/movieList/LoginForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Swal from "sweetalert2";

class App extends React.Component {
  state = {
    savedMovies: [],
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
    const movies = this.state.savedMovies;
    const isMovieAlreadyAdded = movies.find(
      (savedMovie) => savedMovie.id === movie.id
    );
    if (isMovieAlreadyAdded) {
      Swal.fire({
        icon: "warning",
        title: "Please select another movie",
        text: "Movie already exists in favorites list",
        confirmButtonColor: "#3F51B5",
      });
    } else {
      this.saveMovie(movie);
    }
  };

  saveMovie = (movie) => {
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
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Movie added to favorites list",
      confirmButtonColor: "#3F51B5",
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
          <Header user={user} onLogout={this.logout} />
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
                    <MovieList
                      savedMovies={savedMovies}
                      deleteMovie={this.deleteMovie}
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
