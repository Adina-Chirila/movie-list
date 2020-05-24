import React from "react";
import Header from "./shared/header/Header";
import { Grid, Container, TextField, Button } from "@material-ui/core";
import MovieList from "./components/movieList/MovieList";
import Search from "./components/search/Search";

class App extends React.Component {
  state = {
    savedMovies: [],
    user: null,
    userName: "",
  };

  componentDidMount() {
    const saved = localStorage.getItem("userData");
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedUser = JSON.parse(userDetails);
      this.setState({
        user: parsedUser,
      });
    } else {
      this.setState({
        user: null,
      });
    }
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.setState({
          savedMovies: parsed.savedMovies,
        });
      } catch (error) {
        console.log("App crashed");
      }
    }
  }

  onAddMovie = (movie) => {
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
    });
  };

  onUserChange = (event) => {
    const { value } = event.target;
    this.setState({
      userName: value,
    });
  };

  changeRating = (rating) => {
    console.log(rating);
  };
  logout = () => {
    this.setState({ user: null });
    localStorage.removeItem("userData");
  };

  render() {
    const { savedMovies, user } = this.state;
    return (
      <div className="App">
        <Header user={user} onLogout={this.logout} />
        {user ? (
          <React.Fragment>
            <Container maxWidth="md">
              <Search onMovieAdd={this.onAddMovie} />
              <MovieList
                savedMovies={savedMovies}
                changeRating={this.changeRating}
              />
            </Container>
          </React.Fragment>
        ) : (
          <Container maxWdith="md">
            <h2>Hello ppl</h2>
            <h4>What is your name</h4>
            <TextField label="Name" onChange={this.onUserChange} />
            <Button variant="contained" onClick={this.handleAddUser} />
          </Container>
        )}
        {/* <Grid container alignItems="center">
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Search></Search>
          </Grid>
        </Grid> */}
      </div>
    );
  }
}

export default App;
