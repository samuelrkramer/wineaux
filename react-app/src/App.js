import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import DetailedReview from './components/DetailedReview';
import NewReview from './components/NewReview';
import FeedReview from './components/FeedReview';
import UserProfile from './components/UserProfile';
import PageNotFound from './components/PageNotFound';
import WineForm from './components/WineForm';
import WinePage from './components/WinePage';
import HomeFeed from './components/HomeFeed';
import AboutPage from './components/AboutPage'



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div id="app-hero">
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <UserProfile />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
            <HomeFeed />
          </ProtectedRoute>
          <ProtectedRoute path='/reviews/:reviewId(\d+)' exact={true} >
            <DetailedReview />
          </ProtectedRoute>
          <ProtectedRoute path='/wines/new'>
            <WineForm mode='Create' />
          </ProtectedRoute>
          <ProtectedRoute path='/wines/:wineId(\d+)/edit'>
            <WineForm mode='Edit' />
          </ProtectedRoute>
          <ProtectedRoute path='/reviews/new/:wineId' exact={true} >
            <NewReview />
          </ProtectedRoute>
          <ProtectedRoute path='/wines/:wineId(\d+)' exact={true} >
            <WinePage />
          </ProtectedRoute>
          <Route path='/about' exact={true}>
            <AboutPage />
          </Route>
          <ProtectedRoute path="*" exact={true} >
            <PageNotFound />
          </ProtectedRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
