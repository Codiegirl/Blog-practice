import React from 'react';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ArticlePage from './Pages/ArticlePage';
import ArticlesList from './Pages/ArticlesList';
import NavBar from './NavBar';
import './App.css';

function App() {
   return (
     <Router> 
   
    <div id="page-body">
      <NavBar />
      <Route path="/" component={HomePage} exact/>
      <Route path="/about" component={AboutPage}/>
      <Route path="/articles-list" component={ArticlesList}/>
      <Route path="/article/:name" component={ArticlePage}/>
    </div>
    
    </Router>
  );
}

export default App;
