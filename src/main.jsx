import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import client from './ApolloClient'
import { ApolloProvider } from '@apollo/client'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'

// components
import { Header } from './components/Header'


import { AuthProvider } from './context/auth'


import AppRoutes from './util/AppRoutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ApolloProvider client={client}>
 
 <AuthProvider>
 <Router>
  <Header/>
 <AppRoutes/>   
</Router>
 </AuthProvider>

  </ApolloProvider>
  </React.StrictMode>,
)

