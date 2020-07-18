import React, { Component } from "react";
import axios from "axios";
import { TextField, IconButton, Container } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ResultsList from "./ResultsList";
import Settings from "../../config/Settings.example";
import styles from "./Search.module.css";
import InputAdornment from "@material-ui/core/InputAdornment";

class Search extends Component {
  state = {
    searchResults: [],
    searchTerm: "",
    searchError: "",
  };

  validateSearchTerm = () => {
    let isError = false;
    const errors = {
      searchError: "",
    };
    if (this.state.searchTerm.length < 1) {
      isError = true;
      errors.searchError =
        "Movie name is empty. Please enter a valid movie name";
    }
    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  handleSearch = () => {
    const searchErr = this.validateSearchTerm();
    if (!searchErr) {
      const { API_URL, API_KEY } = Settings;
      const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchTerm}`;

      axios.get(url).then((response) => {
        if (response.data.results.length < 1) {
          this.setState({
            searchError:
              "Your search didn't return any results. Please try again.",
          });
        }
        this.setState({
          searchResults: response.data.results,
        });
      });
      this.setState({
        searchTerm: "",
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleAdd = (movie) => {
    this.setState({
      searchResults: [],
      searchTerm: "",
    });
    this.props.onMovieAdd(movie);
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.setState({
        searchTerm: "",
      });
      this.handleSearch();
    }
  };

  render() {
    return (
      <React.Fragment>
        <Container className={styles.container}>
          <TextField
            className={styles.search}
            placeholder="Type the name of a movie..."
            label="Search"
            variant="outlined"
            value={this.state.searchTerm}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            error={this.state.searchError ? this.validateSearchTerm : false}
            helperText={this.state.searchError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton variant="outlined" onClick={this.handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Container>
        {this.state.searchResults.length > 0 && (
          <Container className={styles.results}>
            <ResultsList
              movies={this.state.searchResults}
              onAdd={this.handleAdd}
            />
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default Search;
