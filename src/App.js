import React, { useState } from "react";
import useHackerNewsApi from './useHackerNewsApi'


const App = () => {
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi();
  return (
    <div>
      <form
        onSubmit={(event) => {
          doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);

          event.preventDefault();
          setQuery("")
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
