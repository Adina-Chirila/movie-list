import React, { Component } from "react";
import { TextField, Container, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./Search.module.css";
import ResultsList from "./ResultsList";
import Settings from "../../config/Settings";
import axios from "axios";

class Search extends Component {
  state = {
    searchResults: [],
    searchTerm: "",
  };

  handleSearch = () => {
    const { API_URL, API_KEY } = Settings;
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchTerm}`;
    console.log(url);

    axios.get(url).then((response) => {
      this.setState({
        searchResults: response.data.results,
      });
    });
  };
  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };
  render() {
    return (
      <React.Fragment>
        <Container maxWidth="md" className={styles.container}>
          <TextField
            label="Search for movies"
            variant="outlined"
            className={styles.search}
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          <IconButton
            aria-label="search"
            fontSize="large"
            onClick={this.handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Container>
        {this.state.searchResults.length > 0 && (
          <Container className={styles.results}>
            <ResultsList movies={this.state.searchResults} />
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default Search;
