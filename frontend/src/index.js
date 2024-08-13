import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:8000/api/graphql",
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("app"));

root.render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloProvider>
);
