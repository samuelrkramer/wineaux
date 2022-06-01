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
import FeedReview from './components/FeedReview';
import UserProfile from './components/UserProfile';
import PageNotFound from './components/PageNotFound';
import WinePage from './components/WinePage';


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
            <h1>My Home Page</h1>
          </ProtectedRoute>
          <ProtectedRoute path='/reviews/:reviewId(\d+)' exact={true} >
            <DetailedReview />
          </ProtectedRoute>
          <ProtectedRoute path='/wines/:wineId(\d+)' exact={true} >
            <WinePage />
          </ProtectedRoute>
          <ProtectedRoute path="*" exact={true} >
            <PageNotFound />
          </ProtectedRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
