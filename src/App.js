import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.css";

import RecipeTable from "./components/RecipeTable";

const App = () => {
  const APP_ID = "900da95e";
  const APP_KEY = "40698503668e0bb3897581f4766d77f9";

  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(" ");
  useEffect(() => {
    getRecipe();
  }, [query]);
  const getRecipe = () => {
    axios
      .get(
        `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}`
      )
      .then((res) => setRecipe(res.data.hits));
  };
  const getSearch = (event) => {
    setSearch(event.target.value);
  };
  const updateChange = (event) => {
    event.preventDefault();
    setQuery(search);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={updateChange}>
        <input type="text" value={search} onChange={getSearch} />
        <input type="submit" value="Search" />
      </form>
      <br />
      <RecipeTable data={recipe} />
    </div>
  );
};

export default App;
