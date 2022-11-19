import React, { useState } from "react";
import useHackerNewsApi from "./useHackerNewsApi";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  List,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const App = () => {
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi();
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography sx={{marginTop:"50px", textAlign: "center", fontWeight: 1000 }} variant="h4">
          Hacker News
        </Typography>

        <Box sx={{ mt: "50px", display: "flex", justifyContent: "center" }}>
          <Box sx={{ overflow: "auto" }}>
            <Box
              sx={{ display: "flex" }}
              onSubmit={(event) => {
                doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);

                event.preventDefault();
                setQuery("");
              }}
              component="form"
            >
              <Box
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                sx={{
                  flexGrow: 1,
                  fontSize: "16px",
                  borderRadius: "50px",
                  padding: "15px",
                }}
                component="input"
              />

              <Button
                type="submit"
                sx={{ fontSize: "16px", borderRadius: "50px", padding: "15px" }}
              >
                <SearchIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Container>
          <Box sx={{ marginTop: "50px", marginBottom: "50px" }}>
            {data.hits.map((item) => (
              
                
                <Box sx={{margin: "10px", padding: "10px", overflow: "auto"}} key={item.objectID}>
                  <Box
                    sx={{ textDecoration: "none", minWidth: "500px" }}
                    component="a"
                    target="_blank"
                    rel="noreferrer"
                    href={item.url}
                  >
                      <Box sx={{color: "black", marginBottom:"5px", whiteSpace:"nowrap"}}>{item.url}</Box>
                      <Box sx={{color: "blue", typography:"h5"}}>{item.title}</Box>

                     

                    
                  </Box>
                  <Box sx={{typography: "body1"}}>Author: {item.author}</Box>
                  <Box sx={{typography: "body2"}}> {item.created_at}</Box>
                  
                </Box>
              
            ))}
          </Box>
        </Container>
      )}
    </>
  );
};

export default App;
