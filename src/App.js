import React from "react";
import "./App.css";
import Header from "./shared/header/Header";
import { Container } from "@material-ui/core";
import MovieList from "./components/movieList/MovieList";
import Search from "./components/search/Search";

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="md">
        <Search />
      </Container>
      {/* <Container maxWidth="md">
        <MovieList />
      </Container> */}
    </div>
  );
}

export default App;
