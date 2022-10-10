import React, { useState } from "react";
import useHackerNewsApi from "./useHackerNewsApi";
import { Box, Button, Container, CssBaseline, List, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
const App = () => {
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi();
  return (
    <>
    <CssBaseline/>
      <Container>
        <Typography sx={{textAlign: "center", fontWeight: 1000}} variant="h2">Tech News</Typography>
          
        <Box sx={{mt: "50px", display: "flex", justifyContent: "center" }}>
          <Box sx={{overflow: 'auto'}}>
            <Box 
            sx={{display: 'flex'}}
            onSubmit={(event) => {
            doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);

            event.preventDefault();
            setQuery("");
          }} component="form">
              
              <Box
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                sx={{flexGrow: 1,fontSize: "16px", borderRadius: "50px", padding: '15px' }}
                component="input"
              />

<Button type="submit" sx={{ fontSize: "16px", borderRadius: "50px", padding: '15px' }}><SearchIcon/></Button>
            </Box>
          </Box>
        </Box>
       
        {isError && <div>Something went wrong ...</div>}

        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <Box sx={{mt: "50px"}}>
            {data.hits.map((item) => (
              <List key={item.objectID}>
                <Box sx={{textDecoration: "none"}} component="a" target='_blank' rel="noreferrer" href={item.url}>{item.title}</Box>
              </List>
            ))}
          </Box>
        )}
      </Container>
    </>
  );
};

export default App;
