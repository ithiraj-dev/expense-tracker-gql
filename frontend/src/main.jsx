import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

import GridBackground from './components/ui/GridBackground.jsx'

import App from './App.jsx'
import './index.css'

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql/',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<GridBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
			</GridBackground>
		</BrowserRouter>
	</React.StrictMode>
);
