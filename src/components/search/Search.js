import React, { useState } from "react";
import { TextField, Container, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./Search.module.css";
import ResultsList from "./ResultsList";

const Search = () => {
  const [showResults, setShowResults] = useState(false);
  return (
    <React.Fragment>
      <Container maxWidth="md" className={styles.container}>
        <TextField
          label="Search for movies"
          variant="outlined"
          className={styles.search}
        />
        <IconButton
          aria-label="search"
          fontSize="large"
          onClick={() => setShowResults(!showResults)}
        >
          <SearchIcon />
        </IconButton>
        {/* <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          onClick={() => setShowResults(!showResults)}
        ></Button> */}
      </Container>
      {showResults && (
        <Container className={styles.results}>
          <ResultsList />
        </Container>
      )}
    </React.Fragment>
  );
};

export default Search;
